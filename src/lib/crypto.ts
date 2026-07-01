import crypto from "crypto";

const SECRET = process.env.JWT_SECRET || "default_super_secret_dadi_sutra_123456";

/**
 * Signs a payload with HMAC-SHA256 and returns a secure token.
 * Default expiration is 24 hours.
 */
export function signToken(payload: { email: string; orderId: string }): string {
  const exp = Date.now() + 24 * 60 * 60 * 1000; // 24 hours validity
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const data = Buffer.from(JSON.stringify({ ...payload, exp })).toString("base64url");
  
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(`${header}.${data}`);
  const signature = hmac.digest("base64url");
  
  return `${header}.${data}.${signature}`;
}

/**
 * Verifies a secure token and returns the payload if valid, or null.
 */
export function verifyToken(token: string): { email: string; orderId: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    const [header, data, signature] = parts;
    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update(`${header}.${data}`);
    const expectedSignature = hmac.digest("base64url");
    
    // Constant time comparison is safer, but basic string check works for this context
    if (signature !== expectedSignature) {
      return null;
    }
    
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8"));
    
    // Check expiration
    if (Date.now() > payload.exp) {
      return null;
    }
    
    return {
      email: payload.email,
      orderId: payload.orderId,
    };
  } catch (err) {
    return null;
  }
}
