"use client";

import React from "react";
import { Accordion } from "@/components/ui/Accordion";

export default function FAQ() {
  const faqItems = [
    {
      value: "sourcing",
      trigger: "Where do you source your ingredients?",
      content:
        "All of our produce is 100% USDA certified organic, sourced directly from regional farms located within 100 miles of our clean culinary facility. We prioritize sustainable farming practices to support local growers and ensure peak nutrient density.",
    },
    {
      value: "subscription",
      trigger: "How does the subscription work? Can I cancel?",
      content:
        "You select a delivery cycle (3, 5, or 7 days per week) and build your custom menu. Your plan is billed weekly. You can skip weeks, edit meals, or cancel your subscription at any time before Friday at 5:00 PM UTC for the following week's schedule.",
    },
    {
      value: "packaging",
      trigger: "Is your packaging eco-friendly?",
      content:
        "Yes, 100%. Our bags are made from biodegradable plant starch insulation, and our containers are constructed from wheat straw fibers. The gel cold-packs contain organic, non-toxic plant food gel. You can leave your previous delivery bag outside, and our riders will collect it for recycling.",
    },
    {
      value: "allergies",
      trigger: "How do you handle dietary restrictions and food allergies?",
      content:
        "We take allergies very seriously. Our preparation spaces are divided into isolation zones to prevent cross-contamination. When you filter out ingredients (like nuts, gluten, or soy) via the Taste Quiz or your dashboard, your meals are coded, verified, and sealed in designated containers.",
    },
  ];

  return (
    <section id="faqs" className="py-20 max-w-4xl mx-auto px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-accent-500 font-sans">
          FAQ Helpdesk
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-serif">
          Frequently asked questions
        </h2>
        <p className="text-foreground/60 font-sans">
          Got questions about our gourmet meals, deliveries, or subscriptions? We&apos;ve got answers.
        </p>
      </div>

      {/* Accordion Component */}
      <div className="bg-card text-card-foreground border border-border/70 rounded-2xl p-6 md:p-10 shadow-lg dark:shadow-black/10">
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
