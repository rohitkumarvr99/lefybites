import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "@/lib/db";
import { signToken } from "@/lib/crypto";
import { getProduct } from "@/config/products";
import { buildOrderEmail, buildOrderEmailText } from "@/lib/emailTemplate";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { orderId: sessionId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found in database" }, { status: 404 });
    }

    const isMock = sessionId.startsWith("stripe_sess_mock_");
    let isPaid = false;
    let paymentId = order.paymentId || "";

    if (isMock) {
      isPaid = true;
      paymentId = `py_mock_${Math.random().toString(36).substring(2, 11)}`;
      console.log(`[MOCK STRIPE] Session verified: ${sessionId}`);
    } else {
      // Query Stripe API to verify session status
      const Stripe = require("stripe");
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2023-10-16",
      });

      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        isPaid = true;
        paymentId = session.payment_intent as string;
      }
    }

    if (!isPaid) {
      return NextResponse.json({ error: "Payment not completed yet" }, { status: 400 });
    }

    const prodConfig = getProduct(order.product);
    const amountInRupees = order.amount / 100;

    // Atomically mark the order PAID only if it isn't already — prevents duplicate emails
    // when the verify endpoint is called more than once (React StrictMode, retries, races).
    const updateResult = await prisma.order.updateMany({
      where: { orderId: sessionId, status: { not: "PAID" } },
      data: {
        status: "PAID",
        paymentId: paymentId,
      },
    });
    const justPaid = updateResult.count > 0;

    if (justPaid) {
      // Send email via Resend
      const resendApiKey = process.env.RESEND_API_KEY;
      const emailFrom = process.env.EMAIL_FROM || "Leafy Bites <onboarding@resend.dev>";
      const token = signToken({ email: order.email, orderId: order.orderId });
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const downloadUrl = `${appUrl}/api/download?token=${token}`;

      if (resendApiKey && resendApiKey !== "re_placeholder_key") {
        try {
          const deliveryUrl = prodConfig.driveUrl
            ? `${appUrl}/go/${prodConfig.id}`
            : downloadUrl;

          await fetch("https://api.resend.com/emails", {
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
        } catch (emailErr) {
          console.error("Resend error in Stripe verification:", emailErr);
        }
      }
    }

    // Generate secure download token
    const token = signToken({
      email: order.email,
      orderId: order.orderId,
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const downloadUrl = `${appUrl}/api/download?token=${token}`;

    return NextResponse.json({
      success: true,
      token,
      orderId: order.orderId,
      downloadUrl,
      productName: prodConfig.name,
      amountPaid: amountInRupees,
    });
  } catch (error: any) {
    console.error("Stripe verification endpoint error:", error);
    return NextResponse.json({ error: error?.message || "Verification failed" }, { status: 500 });
  }
}
