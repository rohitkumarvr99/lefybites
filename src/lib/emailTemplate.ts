interface OrderEmailParams {
  customerName: string;
  productName: string;
  orderId: string;
  amount: number; // in rupees
  downloadUrl: string;
  isDriveLink?: boolean; // true when downloadUrl is a permanent Drive/cloud link
  brandName?: string;
  supportEmail?: string;
}

/**
 * Plain-text version of the order email. Including a text alternative alongside
 * the HTML significantly improves inbox placement (fewer spam flags).
 */
export function buildOrderEmailText({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  brandName = "Leafy Bites",
  supportEmail = "support@leafybites.shop",
}: OrderEmailParams): string {
  return `Payment Successful!

Hi ${customerName || "there"},

Thank you for purchasing ${productName}. Your payment was successful and your files are ready.

Download / Access your bundle here:
${downloadUrl}

Order Details:
- Order ID: ${orderId}
- Amount Paid: Rs.${amount}
- Product: ${productName}

Tip: Save the files to your own Google Drive or device so you can access them anytime.

Need help? Contact us at ${supportEmail}.

Thank you,
${brandName} Team`;
}

/**
 * Returns a modern, responsive HTML email for a successful order.
 * Works across common email clients (inline styles, table-based buttons).
 */
export function buildOrderEmail({
  customerName,
  productName,
  orderId,
  amount,
  downloadUrl,
  isDriveLink = false,
  brandName = "Leafy Bites",
  supportEmail = "support@leafybites.shop",
}: OrderEmailParams): string {
  const accent = "#f97316"; // orange-500
  const accentDark = "#ea580c"; // orange-600
  const noteText = isDriveLink
    ? "Bookmark this email — your access link stays active. Save the files to your own Drive or device to keep them forever."
    : "For security, this download link is valid for the next 24 hours and can be used up to 5 times.";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${productName}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1f2937;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your order is confirmed — download your ${productName} now.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,${accent},${accentDark});padding:32px 24px;text-align:center;">
              <div style="font-size:40px;line-height:1;">🎉</div>
              <h1 style="margin:12px 0 4px 0;color:#ffffff;font-size:24px;font-weight:800;">Payment Successful!</h1>
              <p style="margin:0;color:#fff7ed;font-size:14px;">Your order is confirmed and ready to download</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 28px 8px 28px;">
              <p style="margin:0 0 12px 0;font-size:16px;">Hi <strong>${customerName || "there"}</strong>,</p>
              <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;color:#4b5563;">
                Thank you for purchasing <strong>${productName}</strong>. Your payment was successful and your files are ready. Tap the button below to access everything instantly.
              </p>

              <!-- Order box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff7ed;border:1px solid #fed7aa;border-radius:12px;margin:0 0 24px 0;">
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:${accentDark};text-transform:uppercase;letter-spacing:.4px;">Order Details</p>
                    <p style="margin:0;font-size:14px;color:#374151;">Order ID: <strong>${orderId}</strong></p>
                    <p style="margin:4px 0 0 0;font-size:14px;color:#374151;">Amount Paid: <strong>₹${amount}</strong></p>
                    <p style="margin:4px 0 0 0;font-size:14px;color:#374151;">Product: <strong>${productName}</strong></p>
                  </td>
                </tr>
              </table>

              <!-- CTA button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:4px 0 8px 0;">
                    <a href="${downloadUrl}" target="_blank"
                       style="background:linear-gradient(135deg,${accent},${accentDark});color:#ffffff;font-size:17px;font-weight:800;text-decoration:none;padding:16px 40px;border-radius:9999px;display:inline-block;box-shadow:0 6px 16px rgba(249,115,22,0.35);">
                      ⬇️ Download Your Bundle
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:16px 0 0 0;font-size:13px;color:#6b7280;text-align:center;">
                Button not working? Copy &amp; paste this link:<br />
                <a href="${downloadUrl}" style="color:${accentDark};word-break:break-all;">${downloadUrl}</a>
              </p>

              <p style="margin:20px 0 0 0;font-size:12px;color:#9ca3af;background-color:#f9fafb;border-radius:8px;padding:12px 14px;line-height:1.5;">
                ${noteText}
              </p>
            </td>
          </tr>

          <!-- Support -->
          <tr>
            <td style="padding:20px 28px 28px 28px;">
              <hr style="border:0;border-top:1px solid #eee;margin:0 0 16px 0;" />
              <p style="margin:0;font-size:14px;color:#4b5563;">
                Need help? Just reply to this email or contact us at
                <a href="mailto:${supportEmail}" style="color:${accentDark};">${supportEmail}</a>.
              </p>
              <p style="margin:12px 0 0 0;font-size:14px;color:#4b5563;">Enjoy creating! 🙏<br /><strong>${brandName} Team</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#111827;padding:18px 24px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
