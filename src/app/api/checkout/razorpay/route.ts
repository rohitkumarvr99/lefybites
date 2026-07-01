import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, phone, amount, product } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const price = amount !== undefined ? amount : siteConfig.price;
    const amountInPaise = price * 100; // e.g., ₹199 = 19900 paise
    const receipt = `rcpt_${Date.now()}`;

    // Detect if we are in mock mode (using placeholder keys)
    const isMockMode =
      !process.env.RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_KEY_ID === "rzp_test_placeholder_key" ||
      !process.env.RAZORPAY_KEY_SECRET ||
      process.env.RAZORPAY_KEY_SECRET === "placeholder_secret";

    let orderId = "";
    let mock = false;

    if (isMockMode) {
      // Return a simulated Razorpay Order ID for sandbox demo
      orderId = `order_mock_${Math.random().toString(36).substring(2, 11)}`;
      mock = true;
      console.log("Razorpay mock mode: generated mock order id:", orderId);
    } else {
      // Call Razorpay API to create order
      const Razorpay = require("razorpay");
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      });

      const order = await instance.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: receipt,
      });
      orderId = order.id;
    }

    // Save order in SQLite DB as PENDING
    await prisma.order.create({
      data: {
        email: email,
        name: name,
        phone: phone,
        product: product || "dadi-sutra",
        orderId: orderId,
        amount: amountInPaise,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      orderId,
      amount: amountInPaise,
      currency: "INR",
      keyId: isMockMode ? "rzp_test_mock_key" : process.env.RAZORPAY_KEY_ID,
      mock,
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
