"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, Download, ArrowRight, Loader2 } from "lucide-react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    email?: string;
    productName?: string;
    amountPaid?: number;
  } | null>(null);

  useEffect(() => {
    const trackPurchase = (value?: number) => {
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Purchase", { value: value ?? 0, currency: "INR" });
      }
    };

    const verifyPayment = async () => {
      try {
        const tokenParam = searchParams.get("token");
        const orderIdParam = searchParams.get("orderId");

        if (tokenParam) {
          setDownloadUrl(`/api/download?token=${tokenParam}`);
          setOrderDetails({
            orderId: orderIdParam || "N/A",
            productName: orderIdParam?.includes("god-reels")
              ? "600+ AI Animated God Reels Bundle"
              : "Your Order",
          });
          trackPurchase();
          setLoading(false);
          return;
        }

        const gateway = searchParams.get("gateway");

        if (gateway === "stripe" || searchParams.has("session_id")) {
          const sessionId = searchParams.get("session_id");
          if (!sessionId) {
            setError("Stripe Session ID is missing.");
            setLoading(false);
            return;
          }

          const res = await fetch(`/api/checkout/stripe/verify?session_id=${sessionId}`);
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Stripe verification failed");

          setDownloadUrl(data.downloadUrl);
          setOrderDetails({ orderId: data.orderId, productName: data.productName, amountPaid: data.amountPaid });
          trackPurchase(data.amountPaid);
          setLoading(false);
          return;
        }

        const rpPaymentId = searchParams.get("razorpay_payment_id");
        const rpOrderId = searchParams.get("razorpay_order_id");
        const rpSignature = searchParams.get("razorpay_signature");

        if (rpPaymentId && rpOrderId && rpSignature) {
          const res = await fetch("/api/checkout/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: rpPaymentId,
              razorpay_order_id: rpOrderId,
              razorpay_signature: rpSignature,
            }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.error || "Razorpay verification failed");

          setDownloadUrl(data.downloadUrl);
          setOrderDetails({ orderId: data.orderId, productName: data.productName, amountPaid: data.amountPaid });
          trackPurchase(data.amountPaid);
          setLoading(false);
          return;
        }

        setError("No payment parameters found.");
        setLoading(false);
      } catch (err: any) {
        console.error("Verification error:", err);
        setError(err.message || "Something went wrong while verifying your payment.");
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-gray-800">Verifying your payment...</h2>
        <p className="text-gray-500 mt-2">Please don&apos;t close or refresh this window.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 bg-white border border-red-200 rounded-2xl shadow-sm text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-red-700 mb-2">Verification Failed</h2>
          <p className="text-red-600/90 text-sm mb-6">{error}</p>
          <p className="text-gray-600 text-sm mb-6">
            If money was deducted from your account, please contact us with your order details at{" "}
            <b>support@leafybites.shop</b>.
          </p>
          <Link
            href="/600-ai-animated-god-reels-bundle"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isGodReels = orderDetails?.productName?.toLowerCase().includes("reels");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-gray-200 p-8 md:p-12 rounded-3xl shadow-sm text-center">
          <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="font-bold mb-6 text-lg text-orange-600">
            {orderDetails?.productName || "Your order"} is ready for you
          </p>

          <p className="text-gray-600 text-base mb-8 max-w-lg mx-auto leading-relaxed">
            Your order was received successfully. Your download link is below, and a copy has also been sent to
            your registered email address.
          </p>

          {downloadUrl && (
            <div className="mb-8">
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white font-extrabold px-8 py-4 rounded-xl text-lg transition-transform hover:scale-[1.02] shadow-md cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>{isGodReels ? "Access Your Bundle" : "Download File"}</span>
              </a>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-left max-w-md mx-auto space-y-2 mb-8 text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Order ID</span>
              <span className="font-mono font-bold text-gray-900">{orderDetails?.orderId}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Product</span>
              <span className="font-bold text-gray-900">{orderDetails?.productName || "Your order"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-bold text-green-700">
                ₹{orderDetails?.amountPaid !== undefined ? orderDetails.amountPaid : "—"}
              </span>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded text-left text-xs text-gray-700 leading-relaxed mb-6">
            <p className="font-bold text-orange-700 mb-1">Good to know:</p>
            <ul className="list-disc pl-4 space-y-1">
              {isGodReels ? (
                <>
                  <li>Your access link opens the full bundle on Google Drive.</li>
                  <li>Save the files to your own Drive or device to keep them forever.</li>
                  <li>The same link has been emailed to you for future access.</li>
                </>
              ) : (
                <>
                  <li>For security, this link is valid for the next <b>24 hours</b>.</li>
                  <li>You can download this file up to <b>5 times</b>.</li>
                  <li>Please save the file to your phone or computer after downloading.</li>
                </>
              )}
            </ul>
          </div>

          <hr className="border-gray-200 my-6" />

          <Link
            href={isGodReels ? "/600-ai-animated-god-reels-bundle" : "/"}
            className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-bold text-sm hover:underline"
          >
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
          <h2 className="text-xl font-bold text-gray-700">Loading...</h2>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
