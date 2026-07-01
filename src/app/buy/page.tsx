"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getProduct } from "@/config/products";
import {
  Mail,
  Phone,
  User,
  Lock,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Zap,
  Star,
} from "lucide-react";

function BuyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Resolve product
  const productId = searchParams.get("product") || "dadi-sutra";
  const prodConfig = getProduct(productId);
  const isGodReels = prodConfig.id === "god-reels";

  // Test price: set to 10 for live testing. Change to prodConfig.price in production.
  const productPrice = 10;

  // Form states
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [activeGateway, setActiveGateway] = useState<"razorpay" | "stripe">("razorpay");

  const backHref = isGodReels ? "/600-ai-animated-god-reels-bundle" : "/";

  // Accent theming
  const accentText = isGodReels ? "text-orange-600" : "text-primary-800";
  const accentRing = isGodReels ? "focus:ring-orange-500" : "focus:ring-primary-800";
  const payBtn = isGodReels
    ? "bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
    : "bg-primary-800 hover:bg-primary-900";
  const selectedTab = isGodReels
    ? "border-orange-500 bg-orange-50 text-orange-700"
    : "border-primary-800 bg-primary-50 text-primary-800";

  const checklist = isGodReels
    ? [
        "600+ Full HD ready-to-post reels",
        "100% copyright-free, no watermarks",
        "Instant Google Drive access",
        "Lifetime access — pay once, use forever",
      ]
    : [
        "100+ page detailed e-book",
        "Remedies across 14 categories",
        "Clear safety instructions",
        "Lifetime free updates",
      ];

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutEmail || !checkoutPhone) {
      setCheckoutError("Please fill in all fields.");
      return;
    }
    setCheckoutLoading(true);
    setCheckoutError("");

    try {
      if (activeGateway === "razorpay") {
        const res = await fetch("/api/checkout/razorpay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: checkoutName,
            email: checkoutEmail,
            phone: checkoutPhone,
            amount: productPrice,
            product: prodConfig.id,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Razorpay Order Creation Failed");
        }

        if (data.mock) {
          setTimeout(() => {
            router.push(
              `/thank-you?razorpay_payment_id=pay_mock_${Math.random()
                .toString(36)
                .substring(2, 9)}&razorpay_order_id=${data.orderId}&razorpay_signature=mock_signature_approved`
            );
          }, 1500);
          return;
        }

        const options = {
          key: data.keyId,
          amount: data.amount,
          currency: data.currency,
          name: prodConfig.name,
          description: isGodReels ? "AI Animated God Reels Bundle — Secure Download" : "E-book — Secure Download",
          image: prodConfig.coverImage,
          order_id: data.orderId,
          handler: function (response: any) {
            router.push(
              `/thank-you?razorpay_payment_id=${response.razorpay_payment_id}&razorpay_order_id=${response.razorpay_order_id}&razorpay_signature=${response.razorpay_signature}`
            );
          },
          prefill: {
            name: checkoutName,
            email: checkoutEmail,
            contact: checkoutPhone,
          },
          theme: {
            color: prodConfig.themeColor,
          },
          modal: {
            ondismiss: function () {
              setCheckoutLoading(false);
            },
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        const res = await fetch("/api/checkout/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: checkoutName,
            email: checkoutEmail,
            phone: checkoutPhone,
            amount: productPrice,
            product: prodConfig.id,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Stripe Checkout Session Failed");
        }

        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error(err);
      setCheckoutError(err.message || "Something went wrong during checkout.");
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href={backHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <span className="font-extrabold text-gray-900">{isGodReels ? "Leafy Bites" : siteConfig.name}</span>
          <div className="inline-flex items-center gap-1.5 text-sm font-bold text-green-600">
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Secure</span>
          </div>
        </div>
      </header>

      {/* TRUST STRIP */}
      <div className="w-full bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-center gap-x-5 gap-y-1 flex-wrap text-xs sm:text-sm font-semibold">
          <span className="inline-flex items-center gap-1.5"><Zap className="w-4 h-4 text-orange-400" /> Instant Access</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-400" /> Safe &amp; Secure</span>
          <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Lifetime Access</span>
        </div>
      </div>

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Order summary — compact card on top (mobile) */}
        <div className="lg:hidden bg-white border border-gray-200 rounded-2xl p-4 shadow-sm mb-5">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
              <Image src={prodConfig.coverImage} alt={prodConfig.name} fill className="object-cover" priority />
            </div>
            <div className="min-w-0 flex-grow">
              <h1 className="text-base font-extrabold leading-tight line-clamp-2">{prodConfig.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xl font-black ${accentText}`}>₹{productPrice}</span>
                <span className="text-sm text-gray-400 line-through">₹{prodConfig.originalPrice}</span>
                <span className="text-[11px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                  {prodConfig.discountBadge}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Checkout form */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-7">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-1">Complete Your Order</h2>
            <p className="text-sm text-gray-500 mb-5">
              Enter your details to get instant access right after payment.
            </p>

            {checkoutError && (
              <p className="text-sm text-red-600 font-semibold mb-4 text-center bg-red-50 p-2.5 rounded-lg border border-red-200">
                {checkoutError}
              </p>
            )}

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5 text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Rahul Sharma"
                    value={checkoutName}
                    onChange={(e) => setCheckoutName(e.target.value)}
                    className={`w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 ${accentRing} bg-white text-base`}
                    required
                    disabled={checkoutLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5 text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="e.g. rahul@gmail.com"
                    value={checkoutEmail}
                    onChange={(e) => setCheckoutEmail(e.target.value)}
                    className={`w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 ${accentRing} bg-white text-base`}
                    required
                    disabled={checkoutLoading}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Your download link will be sent here.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5 text-gray-700">WhatsApp Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    placeholder="e.g. 9876543210"
                    value={checkoutPhone}
                    onChange={(e) => setCheckoutPhone(e.target.value)}
                    className={`w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 ${accentRing} bg-white text-base`}
                    required
                    disabled={checkoutLoading}
                  />
                </div>
              </div>

              {siteConfig.enableStripe && (
                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer text-sm font-bold transition-all ${
                        activeGateway === "razorpay" ? selectedTab : "border-gray-300 text-gray-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name="gateway"
                        value="razorpay"
                        checked={activeGateway === "razorpay"}
                        onChange={() => setActiveGateway("razorpay")}
                        className="sr-only"
                        disabled={checkoutLoading}
                      />
                      <span>UPI / Cards (Razorpay)</span>
                    </label>
                    <label
                      className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer text-sm font-bold transition-all ${
                        activeGateway === "stripe" ? selectedTab : "border-gray-300 text-gray-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name="gateway"
                        value="stripe"
                        checked={activeGateway === "stripe"}
                        onChange={() => setActiveGateway("stripe")}
                        className="sr-only"
                        disabled={checkoutLoading}
                      />
                      <span>International</span>
                    </label>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={checkoutLoading}
                className={`w-full ${payBtn} text-white font-extrabold text-lg py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-70`}
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Opening payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Proceed to Secure Payment</span>
                  </>
                )}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-semibold text-gray-400 pt-1">
                <span className="inline-flex items-center gap-1">🔒 256-bit SSL</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Instant Delivery</span>
                <span>•</span>
                <span>100% Secure</span>
              </div>

              {/* Payment trust — Razorpay */}
              <div className="flex flex-col items-center gap-1.5 pt-3 border-t border-gray-100">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Payments secured by
                </span>
                <Image
                  src="/images/razorpay logo.webp"
                  alt="Secured by Razorpay"
                  width={360}
                  height={80}
                  className="h-9 w-auto max-w-full object-contain"
                />
              </div>
            </form>
          </div>

          {/* RIGHT: Order summary (desktop) */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-20 space-y-5">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image src={prodConfig.coverImage} alt={prodConfig.name} fill className="object-cover" priority />
                </div>
                <div>
                  <h1 className="text-lg font-extrabold leading-tight">{prodConfig.title}</h1>
                  <div className="flex items-center gap-1 mt-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">4.9</span>
                  </div>
                </div>
              </div>

              <div className="py-4 space-y-2 text-sm border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Original Price</span>
                  <span className="line-through text-gray-400">₹{prodConfig.originalPrice}</span>
                </div>
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount ({prodConfig.discountBadge})</span>
                  <span>-₹{prodConfig.originalPrice - productPrice}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="font-bold text-gray-900">Total</span>
                <span className={`text-2xl font-black ${accentText}`}>₹{productPrice}</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h4 className="font-bold text-sm text-gray-900 mb-3">What you&apos;ll get</h4>
              <ul className="space-y-2.5 text-sm text-gray-700">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${accentText}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantee note */}
            <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl p-4">
              <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
              <p className="text-xs text-green-800 leading-relaxed">
                <b>Safe &amp; secure checkout.</b> Your payment is processed through encrypted, PCI-compliant
                gateways. Files are delivered instantly after payment.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile "what you'll get" */}
        <div className="lg:hidden bg-white border border-gray-200 rounded-2xl shadow-sm p-5 mt-5">
          <h4 className="font-bold text-sm text-gray-900 mb-3">What you&apos;ll get</h4>
          <ul className="space-y-2.5 text-sm text-gray-700">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${accentText}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-sm text-center mt-auto">
        <div className="max-w-5xl mx-auto px-4 space-y-2">
          <p className="text-xs">© {new Date().getFullYear()} Leafy Bites. All rights reserved.</p>
          <div className="text-xs space-x-3">
            <Link href="/privacy-policy" className="hover:text-white hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms-of-service" className="hover:text-white hover:underline">Terms of Service</Link>
            <span>•</span>
            <Link href="/refund-policy" className="hover:text-white hover:underline">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function BuyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-3" />
          <h2 className="text-lg font-bold text-gray-700">Loading checkout...</h2>
        </div>
      }
    >
      <BuyContent />
    </Suspense>
  );
}
