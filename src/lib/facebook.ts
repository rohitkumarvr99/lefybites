import crypto from "crypto";

/** SHA-256 hash (lowercased, trimmed) as required by Meta for PII fields. */
function hash(value?: string | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

interface CapiUserData {
  email?: string | null;
  phone?: string | null;
  clientIp?: string | null;
  userAgent?: string | null;
  fbp?: string | null; // _fbp cookie
  fbc?: string | null; // _fbc cookie
}

interface CapiEventParams {
  eventName: string; // e.g. "Purchase"
  eventId: string; // same id used by the browser pixel → deduplication
  eventSourceUrl?: string;
  value?: number;
  currency?: string;
  user: CapiUserData;
}

/**
 * Sends a server-side event to the Meta Conversions API.
 * No-ops silently if the pixel id or access token isn't configured.
 * Uses the same eventId as the browser pixel so Meta deduplicates them.
 */
export async function sendCapiEvent(params: CapiEventParams): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const accessToken = process.env.FB_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) return;

  const phoneDigits = params.user.phone ? params.user.phone.replace(/[^0-9]/g, "") : undefined;

  const userData: Record<string, unknown> = {
    em: hash(params.user.email) ? [hash(params.user.email)] : undefined,
    ph: hash(phoneDigits) ? [hash(phoneDigits)] : undefined,
    client_ip_address: params.user.clientIp || undefined,
    client_user_agent: params.user.userAgent || undefined,
    fbp: params.user.fbp || undefined,
    fbc: params.user.fbc || undefined,
  };

  const body = {
    data: [
      {
        event_name: params.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: params.eventId,
        action_source: "website",
        event_source_url: params.eventSourceUrl,
        user_data: userData,
        custom_data:
          params.value !== undefined
            ? { currency: params.currency || "INR", value: params.value }
            : undefined,
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      const errText = await res.text();
      console.error("Meta CAPI event failed:", errText);
    } else {
      console.log(`Meta CAPI '${params.eventName}' sent (event_id: ${params.eventId})`);
    }
  } catch (err) {
    console.error("Meta CAPI request error:", err);
  }
}

/** Extracts user matching data from an incoming request (IP, UA, fb cookies). */
export function getCapiUserFromRequest(req: Request): CapiUserData {
  const headers = req.headers;
  const clientIp =
    headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    headers.get("x-real-ip") ||
    undefined;
  const userAgent = headers.get("user-agent") || undefined;

  const cookieHeader = headers.get("cookie") || "";
  const getCookie = (name: string) => {
    const match = cookieHeader.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : undefined;
  };

  return {
    clientIp,
    userAgent,
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
  };
}
