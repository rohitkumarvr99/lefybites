import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <Link href="/600-ai-animated-god-reels-bundle" className="text-orange-600 hover:underline font-bold mb-8 inline-block">
        ← Back
      </Link>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: July 1, 2026</p>

      <div className="space-y-6 leading-relaxed">
        <p>
          Welcome to Leafy Bites (leafybites.shop). By using this website or purchasing any of our digital
          products, you agree to be bound by the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">1. Intellectual Property &amp; License</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            When you purchase our reels bundle, you receive a license to use the included videos for your
            own content, pages, and channels (including monetised social media accounts).
          </li>
          <li>
            You may <b>not</b> resell, redistribute, or re-license the raw bundle files themselves as a
            product, or share the download link publicly. Doing so may result in loss of access and legal action.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">2. Access &amp; Delivery</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access is delivered digitally via a download / Google Drive link immediately after successful payment.</li>
          <li>The same link is also sent to the email address you provide at checkout.</li>
          <li>If you do not receive access, contact support and we will resolve it promptly.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">3. Acceptable Use</h2>
        <p>
          You are responsible for how you use the content on social platforms. You agree to comply with the
          terms and community guidelines of any platform (Instagram, YouTube, Facebook, etc.) where you post
          the reels.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">4. Limitation of Liability</h2>
        <p>
          We make every effort to provide high-quality products. However, we are not responsible for any
          results, earnings, reach, or account decisions made by third-party platforms arising from the use
          of our content. Use is at your own discretion.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">5. Changes to These Terms</h2>
        <p>
          We reserve the right to update or change these terms at any time without prior notice. Continued
          use of the website means you accept the updated terms.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8">6. Contact</h2>
        <p>
          If you have any questions about these terms, contact us at{" "}
          <a href="mailto:support@leafybites.shop" className="text-orange-600 underline">
            support@leafybites.shop
          </a>.
        </p>
      </div>
    </div>
  );
}
