import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <Link href="/600-ai-animated-god-reels-bundle" className="text-orange-600 hover:underline font-bold mb-8 inline-block">
        ← Back
      </Link>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: July 1, 2026</p>

      <div className="space-y-6 leading-relaxed">
        <p>
          At Leafy Bites (leafybites.shop) we respect your privacy. This Privacy Policy explains how we
          collect, use, and protect your information when you purchase our digital products or fill out
          any form on our website.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Information We Collect</h2>
        <p>When you make a purchase or contact us, we may collect the following details:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Name</b> – to personalise your order and communication.</li>
          <li><b>Email address</b> – to deliver your download link and payment receipt.</li>
          <li><b>Phone number</b> – for payment verification and important order updates (optional).</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To fulfil your order and deliver the download link.</li>
          <li>To confirm and verify your payment.</li>
          <li>To provide customer support for your questions or technical issues.</li>
          <li>To share relevant offers and updates (you can unsubscribe any time).</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">3. Payment Security</h2>
        <p>
          We do <b>not</b> store your card or banking details on our servers. All payments are processed
          securely through encrypted payment gateways (such as Razorpay/Stripe).
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">4. Sharing of Information</h2>
        <p>
          We never sell or rent your personal information. We only share it with trusted service providers
          (such as payment gateways and email delivery services) that help us operate our website, and they
          are obligated to keep your data secure.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">5. Cookies</h2>
        <p>
          We may use basic cookies to improve your experience and analyse website traffic. You can disable
          cookies in your browser settings.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">6. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, email us at{" "}
          <a href="mailto:support@leafybites.shop" className="text-orange-600 underline">
            support@leafybites.shop
          </a>.
        </p>
      </div>
    </div>
  );
}
