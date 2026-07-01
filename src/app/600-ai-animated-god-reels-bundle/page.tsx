import Image from "next/image";
import Link from "next/link";
import { Check, Star, Flame, ArrowRight, PenTool, Video, Users, Briefcase, Camera, Laptop, ChevronDown, Zap, ShieldCheck, Infinity as InfinityIcon } from "lucide-react";

export const metadata = {
  title: "600+ AI Animated God Reels Bundle – Only ₹148 | Leafy Bites",
  description:
    "Get 600+ copyright-free, ready-to-post AI animated God reels in HD. Instant download, no watermarks, lifetime access. Perfect for devotional pages & creators.",
  openGraph: {
    title: "600+ AI Animated God Reels Bundle – Only ₹148",
    description:
      "Copyright-free, ready-to-post AI animated God reels in HD. Instant download & lifetime access.",
    images: ["/god-reels-cover.png"],
  },
};

export default function GodReelsBundlePage() {
  const BuyButton = () => (
    <Link
      href="/buy?product=god-reels"
      className="group relative inline-flex max-w-full items-center justify-center gap-2 sm:gap-3 overflow-hidden px-6 sm:px-14 py-4 sm:py-5 rounded-full bg-gradient-to-b from-orange-500 to-orange-700 shadow-xl shadow-orange-600/40 ring-1 ring-orange-300 animate-cta-pulse hover:animate-none hover:scale-105 transition-transform cursor-pointer"
    >
      <span className="pointer-events-none absolute top-0 left-0 h-full w-1/4 bg-white/25 blur-md animate-shine"></span>
      <span className="relative flex items-center gap-2 sm:gap-3 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] whitespace-nowrap">
        <span className="text-lg sm:text-2xl font-extrabold tracking-wide">🛒 BUY NOW ₹148</span>
        <span className="line-through opacity-80 text-sm sm:text-lg font-bold">₹1499</span>
      </span>
    </Link>
  );

  const checklistItems = [
    { text: "100% Copyright-Free", sub: "Post anywhere without restrictions" },
    { text: "No editing needed", sub: "just download & upload" },
    { text: "No Watermarks", sub: "Clean, professional-quality videos" },
    { text: "HD quality", sub: "scroll-stopping reel visuals" },
    { text: "Perfect for", sub: "devotional pages, faceless creators, spiritual content, theme pages" },
    { text: "Instant download", sub: "No need to wait" },
    { text: "Lifetime Access", sub: "Use forever, no extra costs" },
  ];

  const audience = [
    { icon: PenTool, title: "Content Creators", desc: "Running out of ideas? Post & go viral easily." },
    { icon: Video, title: "YouTubers", desc: "Start your channel with ready viral content." },
    { icon: Users, title: "Influencers", desc: "Grow followers & monetize fast." },
    { icon: Briefcase, title: "Managers", desc: "Boost engagement & viral reach." },
    { icon: Camera, title: "Instagramers", desc: "Gain daily followers easily." },
    { icon: Laptop, title: "Freelancers", desc: "Attract clients & showcase work." },
  ];

  const reviews = [
    { name: "Aman Sharma", handle: "@sanatan_reels", img: "/images/aman-sharma.avif", text: "Best ₹148 I ever spent! Earlier I spent hours editing. Now I just download 4K reels and post. My engagement doubled." },
    { name: "Preeti Singh", handle: "@shrikrishna_bhakti", img: "/images/preeti-singh.avif", text: "The AI animations of Krishna are so pure and beautiful. People always ask where I get these. Highly recommended!" },
    { name: "Vikram Dev", handle: "YouTube Shorts", img: "/images/reviews/r3.jpg", text: "Excellent quality bundle. All files neatly categorized in Drive. Instant download link came on email. Perfect." },
    { name: "Neha Verma", handle: "@devotional_daily", img: "/images/neha-verma.avif", text: "My page crossed 50k followers in 2 months just by posting these reels daily. Worth every rupee." },
    { name: "Rahul Mehta", handle: "@bhakti_world", img: "/images/rahul-mehta.avif", text: "Copyright-free and no watermarks. I monetized my page without any strikes. Great value for money." },
    { name: "Anjali Rao", handle: "Instagram Creator", img: "/images/anjali-rao.avif", text: "Superb HD quality reels. Ready to post, no editing needed. Saved me so much time and effort. Thank you!" },
  ];

  const faqs = [
    {
      q: "What will I get in this bundle?",
      a: "You get 600+ high-quality, AI-animated devotional God reels (Shiva, Krishna, Rama, Hanuman, Durga & more), formatted in 9:16 for Instagram Reels, YouTube Shorts and Facebook.",
    },
    {
      q: "How will I receive the files?",
      a: "Right after payment you get instant access. A secure Google Drive link is shown on screen and also emailed to you, where all reels are neatly organized.",
    },
    {
      q: "Do I need any editing skills?",
      a: "Not at all. The reels are 100% ready-to-post. Just download and upload. If you want, you can add your own logo or text, but it's optional.",
    },
    {
      q: "Are these reels copyright-free?",
      a: "Yes. All visuals are copyright-free and watermark-free. You can post and monetize on any platform without restrictions or strikes.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      {/* 1. TOP ANNOUNCEMENT BAR (yellow) */}
      <div className="w-full bg-yellow-400 py-2.5 text-center text-sm sm:text-lg font-bold text-black px-4">
        <span className="inline-flex items-center gap-2">
          <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 fill-orange-500" />
          Limited Time Offer – Save Flat 75% Today!
          <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 fill-orange-500" />
        </span>
      </div>

      {/* 2. TOP ANNOUNCEMENT BAR (black) */}
      <div className="w-full bg-black py-2.5 text-center text-sm sm:text-lg font-bold text-white px-4">
        * Ready to Post • Instant Access • Limited Time Price ₹148
      </div>

      {/* 3. HERO SPLIT SECTION */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Product Image */}
            <div className="flex justify-center">
              <Image
                src="/god-reels-cover.png"
                alt="600+ AI Animated God Reels Bundle"
                width={520}
                height={520}
                className="rounded-xl object-contain w-full max-w-lg h-auto shadow-lg"
                priority
              />
            </div>

            {/* Right: Product Details */}
            <div className="space-y-5">
              {/* Stars review */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                ))}
                <span className="text-base font-semibold text-gray-700 ml-2">
                  Excellent 4.9 | 9570+ Reviews
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug">
                Get The Ultimate 600+ AI Animated <br />
                God Reels Bundle Now!! 🎬
              </h1>

              {/* Red launch offer box */}
              <div className="bg-red-600 text-white text-center font-bold text-lg sm:text-xl py-3 px-4 rounded-md">
                This is a launch offer and it will expire in the next 24 Hours
              </div>

              {/* Sub heading */}
              <p className="text-lg font-bold text-gray-900">
                600+ AI Animated God Reels (Ready-to-Post)
              </p>

              {/* Checklist */}
              <ul className="space-y-2.5">
                {checklistItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-base text-gray-800">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded bg-green-600 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </span>
                    <span>
                      <strong className="font-bold">{item.text}</strong> – {item.sub}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing Callout */}
          <div className="text-center mt-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
              ONLY ₹148/- TODAY Delivered Instantly. Start Using Right Now!
            </h2>
          </div>

          {/* Main Buy Button */}
          <div className="flex justify-center mt-6">
            <BuyButton />
          </div>

          {/* Urgency + payment trust */}
          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="text-base sm:text-lg font-extrabold uppercase tracking-wide text-orange-600">
              For First 100 People Only
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-gray-700">
              <span className="inline-flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-orange-500" /> Instant Download
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-600" /> 100% Secure Payment
              </span>
              <span className="inline-flex items-center gap-1.5">
                <InfinityIcon className="w-4 h-4 text-indigo-600" /> Lifetime Access
              </span>
            </div>

            <Image
              src="/images/razorpay logo.webp"
              alt="Secured by Razorpay"
              width={640}
              height={148}
              className="h-auto w-auto max-h-24 sm:max-h-[148px] max-w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { num: "600+", label: "HD God Reels" },
            { num: "9,570+", label: "Happy Customers" },
            { num: "4.9★", label: "Average Rating" },
            { num: "50k+", label: "Downloads" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl sm:text-3xl font-extrabold [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">{s.num}</div>
              <div className="text-xs sm:text-sm font-medium text-white/90 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SAMPLE VIDEOS SECTION */}
      <section className="py-10 sm:py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-orange-500 mb-2">
            SAMPLE VIDEOS 👀
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-500 mb-8">
            A quick preview of the HD, ready-to-post reels inside the bundle
          </p>

          <div className="rounded-2xl border-2 border-rose-200 bg-white p-4 sm:p-6 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {[1, 2, 3, 4].map((n) => (
                <video
                  key={n}
                  src={`/videos/sample-${n}.mp4`}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full aspect-[9/16] rounded-lg bg-black object-cover shadow-md"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHO SHOULD USE THESE REELS */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
            Who Should Use These Reels?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {audience.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-black rounded-xl p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-green-400" strokeWidth={1.75} />
                  </div>
                  <div className="text-left min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-green-400 leading-tight">{item.title}</h3>
                    <p className="text-sm text-gray-300 leading-snug mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. WHERE CAN I POST THESE REELS */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8">
            Where Can I Post These Reels?
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-5 sm:gap-6 justify-items-center">
            {[
              { name: "Instagram", file: "instagram.svg", bg: "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)", pad: "p-4" },
              { name: "YouTube", file: "youtube.svg", bg: "#FF0000", pad: "p-4" },
              { name: "Facebook", file: "facebook.svg", bg: "#1877F2", pad: "p-4" },
              { name: "Pinterest", file: "pinterest.svg", bg: "#E60023", pad: "p-4" },
              { name: "X", file: "x.svg", bg: "#000000", pad: "p-5" },
              { name: "Snapchat", file: "snapchat.svg", bg: "#FFFC00", pad: "p-4" },
            ].map((item) => (
              <div
                key={item.name}
                className={`w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-2xl flex items-center justify-center shadow-sm ${item.pad}`}
                style={{ background: item.bg }}
              >
                <Image
                  src={`/images/logos/${item.file}`}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HOW TO MAKE MONEY */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-8">
            How Can I Make Money By Posting These Reels?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Left list */}
            <ul className="space-y-3 order-2 md:order-1">
              {["Sponsored Posts", "Sell Your Own Products", "Promote Your Services"].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-base sm:text-lg text-gray-800">
                  <span className="flex-shrink-0 w-5 h-5 rounded bg-green-600 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            {/* Center GIF */}
            <div className="flex justify-center order-1 md:order-2">
              <Image
                src="/images/giphy.webp"
                alt="Earn money by posting reels"
                width={340}
                height={230}
                unoptimized
                className="rounded-xl shadow-md w-full max-w-[300px] h-auto object-cover"
              />
            </div>

            {/* Right list */}
            <ul className="space-y-3 order-3 md:order-3">
              {["Exclusive Content", "Offer Consulting or Coaching", "Merchandise/Shoutouts"].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-base sm:text-lg text-gray-800">
                  <span className="flex-shrink-0 w-5 h-5 rounded bg-green-600 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Simple steps */}
          <div className="text-center mt-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-5">
              Create Your Theme Page in Simple Steps!
            </h3>
            <div className="space-y-2.5 text-lg sm:text-xl font-bold text-indigo-900/90">
              <p><span className="text-orange-600">1</span> Get Our Viral God Reels Bundle Today!</p>
              <p><span className="text-orange-600">2</span> Download &amp; Start Uploading These Reels</p>
              <p><span className="text-orange-600">3</span> Grow Your Theme Page And Start Earning $$$</p>
            </div>
          </div>

          {/* Buy button */}
          <div className="flex justify-center mt-8">
            <BuyButton />
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS */}
      <section className="py-10 sm:py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            Loved by 5000+ Creators
          </h2>
          <div className="flex items-center justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
            ))}
            <span className="text-sm font-semibold text-gray-600 ml-2">4.9 / 5 · 9570+ Reviews</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={r.img}
                    alt={r.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm leading-tight">{r.name}</h4>
                    <p className="text-xs text-gray-500">{r.handle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-gray-50 border border-gray-200 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-4 sm:p-5 font-bold text-gray-900 text-base sm:text-lg">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-orange-600 flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          {/* Product image */}
          <div className="relative mb-8">
            <div className="absolute -inset-3 bg-orange-400/25 blur-2xl rounded-full" />
            <Image
              src="/images/god-reeel.webp"
              alt="600+ AI Animated God Reels Bundle"
              width={420}
              height={420}
              className="relative rounded-2xl shadow-xl w-full max-w-sm h-auto object-contain"
            />
          </div>

          {/* Buy button */}
          <BuyButton />

          {/* Sub text */}
          <p className="mt-6 text-sm sm:text-base font-bold uppercase tracking-wide text-gray-500">
            &ldquo;For First 100 People Only&rdquo;
          </p>
          <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug">
            Take Action Now, Don&apos;t Regret Again.{" "}
            <span className="text-green-600">BUY IT NOW!</span>
          </h2>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-7 h-7 text-amber-500 fill-amber-500" />
            ))}
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-white font-bold text-lg">Leafy Bites</p>

          <p className="text-xs leading-relaxed text-gray-500">
            This site is not a part of the Facebook website or Meta Platforms Inc.
            Additionally, this site is NOT endorsed by Facebook in any way.
            FACEBOOK is a trademark of Meta Platforms, Inc.
          </p>

          <p className="text-sm">
            Support:{" "}
            <a href="mailto:support@leafybites.shop" className="text-orange-400 hover:underline">
              support@leafybites.shop
            </a>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            <Link href="/privacy-policy" className="hover:text-white hover:underline">Privacy Policy</Link>
            <span className="text-gray-600">•</span>
            <Link href="/refund-policy" className="hover:text-white hover:underline">Refund Policy</Link>
            <span className="text-gray-600">•</span>
            <Link href="/terms-of-service" className="hover:text-white hover:underline">Terms of Service</Link>
          </div>

          <p className="text-xs text-gray-600">© {new Date().getFullYear()} Leafy Bites. All rights reserved.</p>
        </div>
      </footer>

      {/* (spacer to clear sticky bottom banner) */}
      <div aria-hidden className="h-24" />

      {/* STICKY BOTTOM BANNER */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-2 px-3 sm:px-4">
        <div className="max-w-5xl mx-auto flex flex-row items-center justify-between gap-2 sm:gap-3">
          {/* Urgency message */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600"></span>
            </span>
            <div className="leading-tight text-left min-w-0">
              <div className="text-xs sm:text-base font-extrabold text-red-600 uppercase truncate">
                Hurry Up! Only 4 Left
              </div>
              <div className="text-[11px] sm:text-sm font-semibold text-gray-600">
                Offer ends <span className="text-orange-600 font-bold">Today</span>
              </div>
            </div>
          </div>

          {/* Buy button */}
          <Link
            href="/buy?product=god-reels"
            className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 flex-shrink-0 px-4 sm:px-8 py-2.5 sm:py-3 rounded-full text-white bg-gradient-to-b from-orange-500 to-orange-700 shadow-lg shadow-orange-600/40 ring-1 ring-orange-300 hover:scale-[1.03] transition-transform cursor-pointer whitespace-nowrap"
          >
            <span className="text-sm sm:text-lg font-extrabold [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
              🛒 Buy ₹148/-
            </span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
