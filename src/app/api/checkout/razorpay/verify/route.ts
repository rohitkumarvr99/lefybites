import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import prisma from "@/lib/db";
import { signToken } from "@/lib/crypto";
import { getProduct } from "@/config/products";
import { buildOrderEmail, buildOrderEmailText } from "@/lib/emailTemplate";
import { sendCapiEvent, getCapiUserFromRequest } from "@/lib/facebook";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Payment verification fields are required" },
        { status: 400 }
      );
    }

    // Find order in DB
    const order = await prisma.order.findUnique({
      where: { orderId: razorpay_order_id },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found in database" }, { status: 404 });
    }

    const isMock = razorpay_order_id.startsWith("order_mock_");
    let isValid = false;

    if (isMock) {
      // Allow simulation mode for sandbox
      isValid = true;
      console.log(`[MOCK MODE] Payment verified for order: ${razorpay_order_id}`);
    } else {
      // Perform standard cryptographic Razorpay signature check
      const secret = process.env.RAZORPAY_KEY_SECRET;
      if (!secret) {
        return NextResponse.json(
          { error: "Razorpay configuration secret is missing on server" },
          { status: 500 }
        );
      }

      const generatedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      isValid = generatedSignature === razorpay_signature;
    }

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Atomically mark the order PAID only if it isn't already.
    // updateMany returns the number of rows changed — this guarantees that
    // even if the verify endpoint is called twice (e.g. React StrictMode double
    // effect, retries, or a race), only ONE request flips the status and sends the email.
    const updateResult = await prisma.order.updateMany({
      where: { orderId: razorpay_order_id, status: { not: "PAID" } },
      data: {
        status: "PAID",
        paymentId: razorpay_payment_id,
      },
    });
    const justPaid = updateResult.count > 0;

    // Generate secure download token (expires in 24 hours)
    const token = signToken({
      email: order.email,
      orderId: order.orderId,
    });

    const prodConfig = getProduct(order.product);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const downloadUrl = `${appUrl}/api/download?token=${token}`;
    const amountInRupees = order.amount / 100;

    console.log(`[PAYMENT SUCCESS] Order ID: ${order.orderId}, Email: ${order.email}, Product: ${order.product}`);
    console.log(`[DOWNLOAD URL] Generated Link: ${downloadUrl}`);

    // Trigger Email sending in background via Resend API (does not block client response)
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || "Leafy Bites <onboarding@resend.dev>";

    if (!justPaid && resendApiKey && resendApiKey !== "re_placeholder_key") {
      console.log("[EMAIL SKIPPED] Order already processed — not sending a duplicate email.");
    }
    if (justPaid && resendApiKey && resendApiKey !== "re_placeholder_key") {
      try {
        // Deliver via a branded link on our own domain that redirects to the Drive folder.
        // Keeps the visible URL on leafybites.shop (better for spam filters) + permanent access.
        const deliveryUrl = prodConfig.driveUrl
          ? `${appUrl}/go/${prodConfig.id}`
          : downloadUrl;

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: emailFrom,
            to: [order.email],
            reply_to: "support@leafybites.shop",
            subject: prodConfig.emailSubject,
            html: buildOrderEmail({
              customerName: order.name,
              productName: prodConfig.name,
              orderId: order.orderId,
              amount: amountInRupees,
              downloadUrl: deliveryUrl,
              isDriveLink: Boolean(prodConfig.driveUrl),
            }),
            text: buildOrderEmailText({
              customerName: order.name,
              productName: prodConfig.name,
              orderId: order.orderId,
              amount: amountInRupees,
              downloadUrl: deliveryUrl,
              isDriveLink: Boolean(prodConfig.driveUrl),
            }),
          }),
        });

        if (!emailResponse.ok) {
          const errText = await emailResponse.text();
          console.error("Resend API failed:", errText);
        } else {
          console.log(`Email successfully sent to ${order.email}`);
        }
      } catch (emailErr) {
        console.error("Failed to send receipt email via Resend:", emailErr);
      }
    } else {
      console.log(
        "[RESEND NOT CONFIG] Resend API key is missing or placeholder. Bypassing email sending. Link was logged above."
      );
    }

    // Meta Conversions API — server-side Purchase (deduped with the browser pixel via event_id).
    if (justPaid) {
      const capiUser = getCapiUserFromRequest(req);
      await sendCapiEvent({
        eventName: "Purchase",
        eventId: order.orderId,
        eventSourceUrl: `${appUrl}/thank-you`,
        value: amountInRupees,
        currency: "INR",
        user: { ...capiUser, email: order.email, phone: order.phone },
      });
    }

    return NextResponse.json({
      success: true,
      token,
      orderId: order.orderId,
      downloadUrl,
      productName: prodConfig.name,
      amountPaid: amountInRupees,
    });
  } catch (error: any) {
    console.error("Razorpay verification error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal payment verification failed" },
      { status: 500 }
    );
  }
}
