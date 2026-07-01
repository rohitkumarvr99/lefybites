import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/" className="text-primary-800 hover:text-accent-500 font-bold mb-8 inline-block">
        ← मुख्य पृष्ठ पर वापस जाएँ (Back to Home)
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary-800 mb-6">संपर्क करें (Contact Us)</h1>
          <p className="text-foreground/80 mb-8">
            यदि आपको ई-बुक खरीदने, डाउनलोड करने, पेमेंट करने या किसी नुस्खे के संबंध में कोई भी सवाल या संदेह है, तो कृपया बेझिझक हमसे संपर्क करें। हमारी टीम आपकी सहायता के लिए तैयार है।
          </p>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 dark:bg-primary-950 p-3 rounded-lg text-primary-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary-800">ईमेल सपोर्ट (Email Support)</h3>
                <a href={`mailto:${siteConfig.supportEmail}`} className="text-foreground hover:underline text-base">
                  {siteConfig.supportEmail}
                </a>
                <p className="text-xs text-gray-500">24 घंटे के भीतर जवाब मिलेगा</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 dark:bg-primary-950 p-3 rounded-lg text-primary-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary-800">हेल्पलाइन (Helpline)</h3>
                <a href={`tel:${siteConfig.supportPhone}`} className="text-foreground hover:underline text-base">
                  {siteConfig.supportPhone}
                </a>
                <p className="text-xs text-gray-500">सुबह 9:00 बजे से शाम 6:00 बजे तक (सोमवार - शनिवार)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary-100 dark:bg-primary-950 p-3 rounded-lg text-primary-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary-800">कार्यालय का पता (Office Address)</h3>
                <p className="text-foreground text-sm leading-relaxed">
                  {siteConfig.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">हमें संदेश भेजें</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">आपका नाम</label>
              <input type="text" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-800 bg-background" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">आपका ईमेल</label>
              <input type="email" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-800 bg-background" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">विषय</label>
              <input type="text" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-800 bg-background" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">आपका संदेश</label>
              <textarea rows={4} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-800 bg-background" required></textarea>
            </div>
            <button type="submit" className="w-full bg-primary-800 hover:bg-primary-900 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer">
              संदेश भेजें (Send Message)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
