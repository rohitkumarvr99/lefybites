import Link from "next/link";

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <Link href="/600-ai-animated-god-reels-bundle" className="text-orange-600 hover:underline font-bold mb-8 inline-block">
        ← Back
      </Link>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Refund Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: July 1, 2026</p>

      <div className="space-y-6 leading-relaxed">
        <p className="text-lg">
          At Leafy Bites (leafybites.shop) we aim to deliver the best quality digital products. Please read
          our refund policy carefully before purchasing.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Digital Product Policy</h2>
        <p>
          Our products (such as the God Reels Bundle) are <strong>digital products</strong> delivered
          instantly via a download / Google Drive link right after payment. Because of this:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>We do not offer refunds, returns, or exchanges on digital products.</strong></li>
          <li>Once payment is complete and the download link is provided, the transaction is considered final.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">2. Review Before You Buy</h2>
        <p>
          We encourage you to review the product details, sample previews, and FAQs on the product page
          before purchasing, so you fully understand what you are getting.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">3. Technical Issues</h2>
        <p>If you face any problem accessing or downloading your files after payment, don&apos;t worry:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Contact our support team at{" "}
            <a href="mailto:support@leafybites.shop" className="text-orange-600 underline">
              support@leafybites.shop
            </a>.
          </li>
          <li>Please include your <strong>Order ID</strong> and <strong>payment receipt</strong> in the email.</li>
          <li>Our team will send you a fresh access link within 24 hours.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">4. Support</h2>
        <p>
          For any other questions about this policy, feel free to reach us at{" "}
          <a href="mailto:support@leafybites.shop" className="text-orange-600 underline">
            support@leafybites.shop
          </a>.
        </p>
      </div>
    </div>
  );
}
