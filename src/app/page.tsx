"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  BookOpen,
  Check,
  ChevronDown,
  Download,
  Heart,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Award,
  Lock,
  Loader2,
  Mail,
  Phone,
  User,
  ArrowRight,
  SunMoon,
  AlertTriangle,
  Leaf,
  Activity,
  Gift
} from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  // Book preview page tab state
  const [activeSamplePage, setActiveSamplePage] = useState(1);

  // Accordion active index
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setFaqOpenIndex(faqOpenIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. STICKY HEADER */}
      <header className="sticky top-0 z-40 w-full glass shadow-sm border-b border-border/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="#" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold text-primary-800 tracking-wider">
              {siteConfig.name}
            </span>
          </Link>

          {/* Navigation Anchors */}
          <nav className="hidden md:flex space-x-8 text-sm font-semibold text-foreground/80">
            <a href="#about" className="hover:text-primary-800 transition-colors">
              पुस्तक के बारे में
            </a>
            <a href="#inside" className="hover:text-primary-800 transition-colors">
              क्या है अंदर?
            </a>
            <a href="#preview" className="hover:text-primary-800 transition-colors">
              फ्री सैंपल
            </a>
            <a href="#testimonials" className="hover:text-primary-800 transition-colors">
              समीक्षाएं
            </a>
            <a href="#faq" className="hover:text-primary-800 transition-colors">
              पूछे जाने वाले सवाल
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title="Toggle Theme"
            >
              <SunMoon className="w-5 h-5 text-primary-800" />
            </button>
            <Link
              href="/buy"
              className="bg-primary-800 hover:bg-primary-900 text-white font-bold px-5 py-2 rounded-xl text-sm transition-transform hover:scale-[1.03] shadow-md cursor-pointer inline-flex items-center"
            >
              अभी खरीदें · {siteConfig.currencySymbol}
              {siteConfig.price}
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-primary-50/50 to-background dark:from-primary-950/20 dark:to-background border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy Column */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-100 to-accent-50 dark:from-accent-950/40 dark:to-accent-900/10 border border-accent-300/60 dark:border-accent-800/40 px-4 py-2 rounded-2xl text-sm sm:text-base shadow-xs select-none">
                <Sparkles className="w-4 h-4 text-accent-600 dark:text-accent-500 animate-pulse flex-shrink-0" />
                <span className="text-primary-900 dark:text-accent-400 font-bold">
                  दादी माँ के आज़माए हुए घरेलू नुस्खे
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-primary-800 leading-tight">
                बीमारियों का इलाज अब <br /> आपकी <span className="underline decoration-accent-500 decoration-wavy decoration-2">रसोई घर</span> में है!
              </h1>

              <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed font-sans max-w-2xl mx-auto lg:mx-0">
                क्या आप दवाओं के खर्च और साइड-इफेक्ट्स से परेशान हैं? अपनाएं सदियों पुराना आयुर्वेदिक घरेलू ज्ञान जो बेहद सरल, सुरक्षित और 100% प्राकृतिक है।
              </p>
              {/* Trust Indicators (Ultra-Compact Horizontal Row) */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 py-4 max-w-lg mx-auto lg:mx-0">
                {/* Indicator 1 */}
                <div className="bg-card border border-border/60 hover:border-accent-500/30 px-3 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 hover:shadow-xs group">
                  <BookOpen className="w-4 h-4 text-accent-600 dark:text-accent-500 flex-shrink-0" />
                  <div className="text-left leading-tight">
                    <div className="font-serif font-black text-sm sm:text-base text-primary-800 dark:text-primary-200">100+ पेज</div>
                    <div className="text-[10px] text-foreground/50 font-medium">विस्तृत पीडीएफ</div>
                  </div>
                </div>

                {/* Indicator 2 */}
                <div className="bg-card border border-border/60 hover:border-accent-500/30 px-3 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 hover:shadow-xs group">
                  <ShieldCheck className="w-4 h-4 text-accent-600 dark:text-accent-500 flex-shrink-0" />
                  <div className="text-left leading-tight">
                    <div className="font-serif font-black text-sm sm:text-base text-primary-800 dark:text-primary-200">अचूक नुस्खे</div>
                    <div className="text-[10px] text-foreground/50 font-medium">14 श्रेणियां</div>
                  </div>
                </div>

                {/* Indicator 3 */}
                <div className="bg-card border border-border/60 hover:border-accent-500/30 px-3 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 hover:shadow-xs group">
                  <Sparkles className="w-4 h-4 text-accent-600 dark:text-accent-500 flex-shrink-0" />
                  <div className="text-left leading-tight">
                    <div className="font-serif font-black text-sm sm:text-base text-primary-800 dark:text-primary-200">₹199 मात्र</div>
                    <div className="text-[10px] text-accent-700 dark:text-accent-400 font-bold">60% छूट</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/buy"
                  className="w-full sm:w-auto bg-primary-800 hover:bg-primary-900 text-white font-bold px-8 py-4 rounded-xl text-lg transition-transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Download className="w-5 h-5 text-accent-500" />
                  <span>ई-बुक अभी डाउनलोड करें</span>
                </Link>
                <a
                  href="#preview"
                  className="w-full sm:w-auto text-primary-800 dark:text-accent-500 font-bold border border-primary-800/20 dark:border-accent-500/20 px-8 py-4 rounded-xl text-base hover:bg-primary-800/5 transition-colors flex items-center justify-center space-x-1"
                >
                  <span>फ्री सैंपल चैप्टर पढ़ें</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <p className="text-sm text-foreground/60 font-medium">
                तुरंत डाउनलोड · सुरक्षित ऑनलाइन भुगतान · 100% सरल हिंदी
              </p>
            </div>

            {/* Right Book Mockup Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm w-full px-4">
                {/* Visual Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-500 to-primary-800 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-card border border-border p-3 rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-[1.02] flex flex-col items-center">
                  {/* Floating Corner Discount Badge */}
                  <div className="absolute -top-4 -right-4 z-10 bg-accent-500 text-primary-950 font-serif font-black text-sm px-4 py-2.5 rounded-2xl shadow-md border border-accent-400/30 rotate-12 select-none">
                    60% छूट
                  </div>
                  <Image
                    src="/cover.png"
                    alt="दादी सूत्र (Dadi Sutra) Book Cover"
                    width={320}
                    height={400}
                    className="rounded-xl object-cover shadow-md w-full h-auto"
                    priority
                  />
                  <div className="w-full mt-4 flex items-center justify-between px-2 text-sm font-semibold text-foreground/80">
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4 text-accent-500" />
                      <span>100% सुरक्षित PDF</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-accent-500" />
                      <span>5000+ प्रतियों की बिक्री</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM → SOLUTION */}
      <section id="about" className="py-20 bg-background border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-primary-800 md:whitespace-nowrap">
              आज हम हर छोटी बीमारी के लिए अंग्रेजी दवाओं पर निर्भर हैं...
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
            <p className="text-lg text-foreground/80 leading-relaxed">
              लेकिन क्या आप जानते हैं कि पेट दर्द, सर्दी-खांसी, माइग्रेन जैसी समस्याओं का असली और सुरक्षित इलाज हमारे किचन में ही छुपा हुआ है?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-card border border-border/60 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-500 rounded-xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary-800 mb-3">महँगी दवाइयाँ और साइड-इफेक्ट</h3>
              <p className="text-foreground/80 text-base leading-relaxed">
                छोटी-छोटी तकलीफों में ली जाने वाली अंग्रेजी दवाइयाँ शरीर के लिवर और किडनी को नुकसान पहुंचाती हैं और बजट बिगाड़ती हैं।
              </p>
            </div>

            <div className="bg-card border border-border/60 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-500 rounded-xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary-800 mb-3">गलत व अधूरे नुस्खे</h3>
              <p className="text-foreground/80 text-base leading-relaxed">
                इंटरनेट और सोशल मीडिया पर उपलब्ध जानकारी अक्सर अधूरी या भ्रामक होती है, जिससे फायदे के बजाय नुकसान हो सकता है।
              </p>
            </div>

            <div className="bg-card border border-border/60 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-500 rounded-xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary-800 mb-3">पारंपरिक ज्ञान का खो जाना</h3>
              <p className="text-foreground/80 text-base leading-relaxed">
                हमारी नई पीढ़ी दादी-नानी के उन चमत्कारी उपायों से दूर होती जा रही है जो बिना किसी खर्चे के रोगों को जड़ से ठीक करते थे।
              </p>
            </div>
          </div>

          <div className="bg-primary-800 text-white rounded-3xl p-8 md:p-12 mt-16 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full blur-3xl opacity-10 -mr-20 -mt-20"></div>
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-accent-500 font-bold uppercase tracking-widest text-xs sm:text-sm">हमारा समाधान</span>
                <h3 className="text-3xl font-serif font-bold">दादी सूत्र (Dadi Sutra) - सरल स्वास्थ्य की कुंजी</h3>
                <p className="text-white/80 text-base leading-relaxed">
                  इस ई-बुक में हमने दादी-नानी के पीढ़ियों पुराने ज्ञान को विज्ञान की कसौटी पर कसकर संकलित किया है। इसमें दिए गए सभी अचूक नुस्खे हमारे दैनिक जीवन में उपयोग होने वाली जड़ी-बूटियों और मसालों पर आधारित हैं, जिन्हें कोई भी आसानी से घर पर तैयार कर सकता है।
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <Link
                  href="/buy"
                  className="bg-accent-500 hover:bg-accent-600 text-primary-950 font-bold px-8 py-4 rounded-xl text-base transition-transform hover:scale-[1.03] shadow-md w-full lg:w-auto cursor-pointer text-center flex items-center justify-center"
                >
                  किताब प्राप्त करें · ₹199
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT'S INSIDE SECTION */}
      <section id="inside" className="py-20 bg-primary-50/30 dark:bg-primary-950/10 border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-accent-700 dark:text-accent-500 font-bold uppercase text-xs sm:text-sm tracking-wider">पुस्तक की झलक</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-800">दादी सूत्र ई-बुक के मुख्य 5 भाग</h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
            {siteConfig.book.sections.map((section, idx) => {
              const icons = [BookOpen, Activity, Leaf, Heart, Gift];
              const IconComponent = icons[idx] || BookOpen;

              // For the 5th item, we want it to span full width on large screens to keep it balanced
              const isLast = idx === 4;

              return (
                <div
                  key={section.id}
                  className={`bg-card border border-border/80 hover:border-accent-500/50 p-6 rounded-3xl flex items-start gap-5 hover:shadow-md transition-all duration-300 relative group overflow-hidden ${isLast ? "lg:col-span-2 max-w-3xl mx-auto w-full" : ""
                    }`}
                >
                  {/* Icon & Label */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary-800 dark:bg-primary-950 text-white flex items-center justify-center shadow-md relative group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 text-accent-400" />
                    </div>
                    <span className="font-serif font-bold text-xs text-accent-800 dark:text-accent-400 bg-accent-100 dark:bg-accent-950/60 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      भाग {idx + 1}
                    </span>
                  </div>

                  {/* Content details */}
                  <div className="space-y-1.5 flex-grow">
                    <h4 className="font-serif font-bold text-lg sm:text-xl text-primary-800 dark:text-primary-200 leading-snug">
                      {section.title.split(": ").slice(1).join(": ") || section.title}
                    </h4>
                    <p className="text-sm text-foreground/80 leading-relaxed font-normal">
                      {section.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>


        </div>
      </section>

      {/* 5. SAMPLE PREVIEW & INTERACTIVE READER */}
      <section id="preview" className="py-20 bg-background border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-accent-700 dark:text-accent-500 font-bold uppercase text-xs sm:text-sm tracking-wider">पुस्तक के कुछ पन्ने</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-800">दादी सूत्र ई-बुक की मुफ़्त झलक</h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
            <p className="text-base text-foreground/80 leading-relaxed max-w-2xl mx-auto">
              ई-बुक खरीदने से पहले आप यहाँ इसके कुछ वास्तविक पृष्ठों को पढ़ सकते हैं। देखिए कि नुस्खे कितने सरल और आसान शब्दों में समझाए गए हैं।
            </p>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={() => setActiveSamplePage(1)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer ${activeSamplePage === 1
                ? "bg-primary-800 text-white shadow-md"
                : "bg-card text-foreground/80 hover:bg-card/85 border border-border"
                }`}
            >
              पन्ना 1: रसोई औषधालय (हल्दी)
            </button>
            <button
              onClick={() => setActiveSamplePage(2)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer ${activeSamplePage === 2
                ? "bg-primary-800 text-white shadow-md"
                : "bg-card text-foreground/80 hover:bg-card/85 border border-border"
                }`}
            >
              पन्ना 2: घरेलू नुस्खा (अपच)
            </button>
          </div>

          <div className="mt-10 max-w-3xl mx-auto">
            <div className="bg-[#FAF7F2] dark:bg-stone-900 border-8 border-[#FAF7F2] dark:border-stone-900 shadow-2xl rounded-3xl overflow-hidden relative">
              {/* Decorative inner book line border */}
              <div className="border border-amber-900/10 p-8 sm:p-12 min-h-[450px] flex flex-col justify-between relative bg-[#FAF7F2] dark:bg-stone-900 text-stone-900 dark:text-stone-100">

                {/* Transparent WATERMARK across background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                  <span className="text-amber-900/[0.03] dark:text-white/[0.02] text-6xl sm:text-8xl font-serif font-bold uppercase rotate-12 tracking-widest whitespace-nowrap">
                    दादी सूत्र सैंपल
                  </span>
                </div>

                {/* Book Page Header */}
                <div className="flex justify-between items-center border-b border-amber-900/10 pb-4 mb-6 text-stone-500 dark:text-stone-400 text-xs sm:text-sm font-serif italic">
                  <span>दादी सूत्र (Dadi Sutra) - ई-बुक</span>
                  <span>अध्याय - सैंपल पृष्ठ</span>
                </div>

                {/* Page Content based on selected Page */}
                {activeSamplePage === 1 ? (
                  <div className="space-y-6 flex-grow">
                    <div className="space-y-1">
                      <span className="text-xs uppercase tracking-wider text-accent-700 dark:text-accent-500 font-bold">भाग 3: रसोई घर की फार्मेसी</span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary-905 text-primary-900 dark:text-primary-100">
                        अध्याय 15: हल्दी (Turmeric) — प्राकृतिक अमृत
                      </h3>
                    </div>

                    <p className="text-base sm:text-lg text-stone-850 text-stone-800 dark:text-stone-200 leading-relaxed font-serif">
                      हल्दी केवल भोजन का स्वाद और रंग बढ़ाने वाला मसाला नहीं है, बल्कि यह हमारे शरीर के लिए एक शक्तिशाली रक्षा कवच है। आयुर्वेद में हल्दी को <strong className="text-primary-900 dark:text-primary-100">'हरिद्रा'</strong> कहा गया है, जिसका अर्थ है जो त्वचा के रंग को निखारे और रोगों का हरण करे।
                    </p>

                    <div className="bg-amber-50/50 dark:bg-stone-950/40 border-l-4 border-accent-500 p-5 rounded-r-xl space-y-3">
                      <h4 className="font-serif font-bold text-lg text-primary-900 dark:text-primary-100">
                        चोट, मोच और सूजन का अचूक लेप:
                      </h4>
                      <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
                        यदि शरीर के किसी हिस्से में चोट लग गई हो, मोच आ गई हो या सूजन हो, तो <strong>दो चम्मच सरसों के तेल</strong> को हल्का गर्म करें। उसमें <strong>आधा चम्मच हल्दी पाउडर</strong> और <strong>एक चुटकी सेंधा नमक</strong> मिलाकर पेस्ट बना लें। इसे गुनगुना ही चोट वाली जगह पर लगाकर सूती कपड़े से बाँध लें। 2 से 3 घंटों में दर्द और सूजन में चमत्कारी आराम मिलेगा।
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 flex-grow">
                    <div className="space-y-1">
                      <span className="text-xs uppercase tracking-wider text-accent-700 dark:text-accent-500 font-bold">भाग 4: 14 श्रेणियों के चुनिंदा नुस्खे</span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary-905 text-primary-900 dark:text-primary-100">
                        अध्याय 24: अपच, गैस और पेट फूलना (Indigestion)
                      </h3>
                    </div>

                    <p className="text-base sm:text-lg text-stone-850 text-stone-800 dark:text-stone-200 leading-relaxed font-serif">
                      गलत खान-पान या असमय भोजन करने से पेट में गैस बनना और भारीपन होना एक आम समस्या है। अंग्रेजी एंटासिड दवाएं तुरंत तो आराम देती हैं, लेकिन वे पेट के एसिड को कमजोर कर पाचन तंत्र को स्थायी रूप से बीमार कर देती हैं।
                    </p>

                    <div className="bg-amber-50/50 dark:bg-stone-950/40 border-l-4 border-accent-500 p-5 rounded-r-xl space-y-3">
                      <h4 className="font-serif font-bold text-lg text-primary-900 dark:text-primary-100">
                        अजवाइन और काला नमक का अचूक नुस्खा:
                      </h4>
                      <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
                        भोजन के बाद यदि पेट भारी लगे या गैस परेशान करे, तो <strong>आधा चम्मच अजवाइन</strong> को तवे पर हल्का सा भून लें। इसमें <strong>एक चुटकी काला नमक</strong> मिलाएं। इसे मुँह में रखकर चबाएं और ऊपर से हल्का <strong>गुनगुना पानी</strong> पी लें। यह नुस्खा पेट में पाचक रसों को बढ़ाता है जिससे गैस 5 से 10 मिनट में दूर हो जाती है।
                      </p>
                    </div>
                  </div>
                )}

                {/* Book Page Footer */}
                <div className="flex justify-between items-center border-t border-amber-900/10 pt-4 mt-6 text-stone-400 dark:text-stone-500 text-xs sm:text-sm font-serif">
                  <span>* ये नुस्खे केवल सामान्य मार्गदर्शिका हैं।</span>
                  <span>पृष्ठ {activeSamplePage === 1 ? "15" : "24"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BENEFITS GRID */}
      <section className="py-20 bg-primary-50/20 dark:bg-primary-950/10 border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto space-y-4">
            <span className="text-accent-700 dark:text-accent-500 font-bold uppercase text-xs tracking-wider">पुस्तक के लाभ</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-primary-800 md:whitespace-nowrap">
              दादी सूत्र ई-बुक क्यों है हर भारतीय परिवार के लिए आवश्यक?
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-12 max-w-5xl mx-auto">
            {siteConfig.benefits.map((benefit, idx) => {
              const icons = [ShieldCheck, BookOpen, Award, Sparkles, Leaf, Users];
              const IconComponent = icons[idx] || Check;

              return (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950/60 text-primary-800 dark:text-accent-400 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-accent-600 dark:text-accent-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-lg text-primary-800 dark:text-primary-200">
                      {benefit.title}
                    </h4>
                    <p className="text-base text-foreground/80 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS (SOCIAL PROOF) */}
      <section id="testimonials" className="py-20 bg-background border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto space-y-4">
            <span className="text-accent-700 dark:text-accent-500 font-bold uppercase text-sm tracking-wider">समीक्षाएं (Reviews)</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-primary-800 md:whitespace-nowrap">
              5,000 से अधिक खुश परिवारों का भरोसा
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
            <p className="text-base text-foreground/80">
              पढ़िए उन लोगों के अनुभव जिन्होंने इस पुस्तक की मदद से अपने स्वास्थ्य में सुधार किया है।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
            {siteConfig.testimonials.slice(0, 3).map((test, idx) => (
              <div
                key={idx}
                className="bg-card border border-border/80 p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/30 relative overflow-hidden"
              >
                {/* Decorative Quote Mark */}
                <div className="absolute top-4 left-4 text-6xl font-serif font-bold text-accent-500/10 pointer-events-none select-none">
                  “
                </div>

                <div className="space-y-4 relative">
                  {/* Star rating */}
                  <div className="flex items-center space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < test.rating ? "text-accent-500 fill-accent-500" : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-base sm:text-lg text-foreground/90 italic leading-relaxed font-serif">
                    "{test.comment}"
                  </p>
                </div>

                <div className="border-t border-border/50 pt-5 mt-6 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-800 dark:bg-primary-950 text-white flex items-center justify-center font-bold text-lg border border-accent-400/20">
                    {test.name[0]}
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-base text-primary-800 dark:text-primary-200">{test.name}</h5>
                    <p className="text-xs text-gray-500">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PRICING CARD & MONEY BACK */}
      <section id="pricing" className="py-20 bg-primary-50/20 dark:bg-primary-950/10 border-b border-border/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-card border-2 border-primary-800/80 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Discount Badge */}
            <div className="absolute top-0 right-0 bg-accent-500 text-primary-950 font-bold px-6 py-2 rounded-bl-3xl text-sm shadow-sm">
              {siteConfig.discountBadge}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left description */}
              <div className="md:col-span-7 space-y-6">
                <h3 className="text-3xl font-serif font-black text-primary-800">
                  दादी सूत्र (Dadi Sutra)
                </h3>
                <p className="text-sm text-accent-700 dark:text-accent-500 font-bold uppercase tracking-wider">
                  Complete Family Health Guide PDF
                </p>

                <ul className="space-y-3.5 text-sm">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span><b>अचूक घरेलू नुस्खे:</b> सर्दी, पाचन, दर्द, इम्युनिटी आदि</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span><b>रसोई औषधालय:</b> 35 आम जड़ी-बूटियों के प्रयोग की विधि</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span><b>लाइफटाइम एक्सेस + मोबाइल फ्रेंडली</b> (कभी भी पढ़ें)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span><b>डॉक्टरी सुरक्षा नोट्स:</b> सावधानी बरतने के विशेष निर्देश</span>
                  </li>
                </ul>

                {/* Secure Badge */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 border-t border-border/80 pt-4">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>100% सुरक्षित पेमेंट (UPI, कार्ड, नेट बैंकिंग)</span>
                </div>
              </div>

              {/* Right price + button */}
              <div className="md:col-span-5 text-center bg-background border border-border p-8 rounded-2xl shadow-inner space-y-4">
                <span className="text-gray-400 line-through text-lg font-bold">
                  {siteConfig.currencySymbol}
                  {siteConfig.originalPrice}
                </span>
                <div className="text-4xl md:text-5xl font-serif font-black text-primary-800">
                  {siteConfig.currencySymbol}
                  {siteConfig.price}
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  कोई छुपा हुआ शुल्क नहीं · एक बार भुगतान
                </p>

                <Link
                  href="/buy"
                  className="w-full bg-primary-800 hover:bg-primary-900 text-white font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] shadow-md cursor-pointer text-center block"
                >
                  अभी ऑर्डर करें
                </Link>
                <p className="text-xs text-accent-700 dark:text-accent-500 font-bold">
                  पेमेंट के तुरंत बाद डाउनलोड लिंक
                </p>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* 10. FAQ ACCORDION (HINDI) */}
      <section id="faq" className="py-20 bg-background border-b border-border/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-accent-700 dark:text-accent-500 font-bold uppercase text-sm tracking-wider">एफएक्यू (FAQ)</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-800">
              अक्सर पूछे जाने वाले सवाल
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4">
            {siteConfig.faqs.map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div key={idx} className="bg-card border border-border rounded-xl overflow-hidden transition-all">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-primary-800 hover:bg-primary-50/20 transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-accent-500 transition-transform ${isOpen ? "transform rotate-180" : ""
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-sm sm:text-base text-foreground/80 border-t border-border/40 bg-background/30 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. ABOUT / EMOTIONAL STORY */}
      <section className="py-20 bg-primary-50/20 dark:bg-primary-950/10 border-b border-border/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="w-20 h-20 bg-primary-100 dark:bg-primary-950/60 rounded-full flex items-center justify-center mx-auto text-primary-800 border-2 border-accent-500">
            <Heart className="w-10 h-10 text-accent-500 fill-accent-500/20" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-800">
            दादी माँ के प्यार और ज्ञान की विरासत
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-3xl mx-auto italic font-serif">
            "जब मैं छोटी थी, मेरी दादी कभी हमें दवा की दुकान पर नहीं भेजती थीं। पेट खराब हो तो अजवाइन, बुखार हो तो गिलोय-तुलसी की चाय, और चोट लगे तो हल्दी का लेप। ये नुस्खे सिर्फ दवा नहीं थे, बल्कि स्वास्थ्य को बनाए रखने की एक जीवन शैली थी। आज के भागदौड़ भरे जीवन में हम इस अनमोल विरासत को भूलते जा रहे हैं। 'दादी सूत्र' उसी प्यार और पारंपरिक उपचारों को सहेजने का हमारा एक छोटा सा प्रयास है।"
          </p>
          <p className="text-sm font-bold text-accent-700">
            — दादी सूत्र आयुष रिसर्च टीम
          </p>
        </div>
      </section>

      {/* 12. FINAL CTA BANNER */}
      <section className="py-20 bg-primary-800 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 via-primary-800 to-primary-950"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-accent-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold leading-tight">
            अपने परिवार को दें प्राकृतिक स्वास्थ्य का उपहार!
          </h2>
          <p className="text-white/80 text-base max-w-xl mx-auto">
            दवाइयों पर होने वाले हजारों के खर्च से बचें। दादी सूत्र को आज ही डाउनलोड करें।
          </p>
          <div className="pt-4">
            <Link
              href="/buy"
              className="bg-accent-500 hover:bg-accent-600 text-primary-950 font-bold px-10 py-5 rounded-2xl text-lg transition-transform hover:scale-[1.03] shadow-lg flex items-center justify-center space-x-2 mx-auto cursor-pointer"
            >
              <Download className="w-5 h-5 text-primary-950" />
              <span>दादी सूत्र PDF तुरंत प्राप्त करें · ₹199</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <span className="font-serif text-lg font-bold text-white tracking-wider">
                दादी सूत्र
              </span>
              <p className="text-stone-300 leading-relaxed text-sm">
                भारतीय परिवारों के लिए एक संपूर्ण प्राकृतिक स्वास्थ्य मार्गदर्शिका। जड़ी-बूटियों, मसालों और सदियों पुराने ज्ञान का सरल संकलन।
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-base">उपयोगी लिंक्स</h5>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="hover:underline hover:text-white transition-colors">
                    पुस्तक के बारे में
                  </a>
                </li>
                <li>
                  <a href="#inside" className="hover:underline hover:text-white transition-colors">
                    क्या है अंदर?
                  </a>
                </li>
                <li>
                  <a href="#preview" className="hover:underline hover:text-white transition-colors">
                    मुफ़्त सैंपल
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-base">नीतियां (Policies)</h5>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="hover:underline hover:text-white transition-colors">
                    गोपनीयता नीति (Privacy Policy)
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:underline hover:text-white transition-colors">
                    सेवा की शर्तें (Terms of Service)
                  </Link>
                </li>
                <li>
                  <Link href="/refund-policy" className="hover:underline hover:text-white transition-colors">
                    रिफंड नीति (Refund Policy)
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-4 uppercase tracking-wider text-base">सहायता</h5>
              <ul className="space-y-2 text-stone-300">
                <li>
                  <Link href="/contact" className="hover:underline hover:text-white transition-colors">
                    संपर्क करें (Contact Support)
                  </Link>
                </li>
                <li>
                  <span className="text-stone-400">ईमेल:</span> {siteConfig.supportEmail}
                </li>
                <li>
                  <span className="text-stone-400">हेल्पलाइन:</span> {siteConfig.supportPhone}
                </li>
              </ul>
            </div>
          </div>

          {/* MEDICAL DISCLAIMER */}
          <div className="bg-stone-950 p-6 rounded-xl border border-stone-800 leading-relaxed text-stone-400 text-sm">
            <p className="font-bold text-stone-200 mb-2">महत्वपूर्ण चिकित्सा अस्वीकरण (Medical Disclaimer):</p>
            दादी सूत्र ई-बुक में संकलित जानकारी केवल शैक्षिक और सामान्य ज्ञान उद्देश्यों के लिए है। यह किसी भी प्रकार की चिकित्सीय सलाह, निदान या गंभीर बीमारी का इलाज नहीं है। इस ई-बुक में दिए गए नुस्खे या घरेलू उपचार हर व्यक्ति की शारीरिक प्रकृति पर अलग प्रभाव डाल सकते हैं। यदि आप किसी गंभीर लक्षण, पुरानी बीमारी से पीड़ित हैं, गर्भवती हैं, या नियमित रूप से किसी दवा का सेवन कर रहे हैं, तो कोई भी उपाय अपनाने से पहले किसी योग्य चिकित्सक या आयुर्वेद विशेषज्ञ से परामर्श अवश्य लें। किसी भी प्रतिकूल प्रभाव के लिए लेखक या प्रकाशक उत्तरदायी नहीं होंगे।
          </div>

          <div className="border-t border-stone-850 pt-8 flex flex-col sm:flex-row items-center justify-between text-stone-400 space-y-4 sm:space-y-0 text-sm">
            <p>© 2026 दादी सूत्र आयुष सॉल्यूशंस. सर्वाधिकार सुरक्षित।</p>
            <p>Made with ❤️ in India for healthy families.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
