import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import prisma from "@/lib/db";
import { getProduct } from "@/config/products";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, phone, amount, product } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const prodConfig = getProduct(product);
    const price = amount !== undefined ? amount : prodConfig.price;
    const amountInCents = price * 100; // e.g. ₹199 = 19900 paise/cents

    // Detect if we are in mock mode (using placeholder keys)
    const isMockMode =
      !process.env.STRIPE_SECRET_KEY ||
      process.env.STRIPE_SECRET_KEY === "sk_test_placeholder";

    let sessionUrl = "";
    let sessionId = "";

    if (isMockMode) {
      sessionId = `stripe_sess_mock_${Math.random().toString(36).substring(2, 11)}`;
      // For testing, mock session url points to thank-you page with a query param
      sessionUrl = `${appUrl}/thank-you?gateway=stripe&session_id=${sessionId}`;
      console.log("Stripe mock mode: generated mock session URL:", sessionUrl);
    } else {
      const Stripe = require("stripe");
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2023-10-16",
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: prodConfig.name,
                description: prodConfig.subtitle,
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        customer_email: email,
        success_url: `${appUrl}/thank-you?gateway=stripe&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}?payment=cancelled`,
        metadata: {
          name,
          phone: phone || "",
          product: product || "dadi-sutra",
        },
      });

      sessionId = session.id;
      sessionUrl = session.url;
    }

    // Save order in SQLite DB as PENDING
    await prisma.order.create({
      data: {
        email: email,
        name: name,
        phone: phone || "",
        product: product || "dadi-sutra",
        orderId: sessionId,
        amount: amountInCents,
        status: "PENDING",
      },
    });

    return NextResponse.json({ url: sessionUrl, sessionId });
  } catch (error: any) {
    console.error("Stripe order creation error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create Stripe session" },
      { status: 500 }
    );
  }
}
