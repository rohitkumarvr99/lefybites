"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Leaf, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const newsletterSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Please provide a valid email address."),
});

type NewsletterInput = z.infer<typeof newsletterSchema>;

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async () => {
    // Mock API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer className="bg-primary-950 text-white dark:bg-black/90 pt-16 pb-12 border-t border-primary-900/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-primary-900/60">
        {/* Brand Information */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary-500 flex items-center justify-center text-forest">
              <Leaf className="h-4.5 w-4.5" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-white">
              Leafy<span className="text-primary-400">Bites</span>
            </span>
          </div>
          <p className="text-sm text-primary-200/60 leading-relaxed font-sans max-w-sm">
            Handcrafted chef salads and organic warm bowls designed for active, health-focused lives. Delivering daily freshness straight to your doorstep.
          </p>
        </div>

        {/* Directory Links */}
        <div className="md:col-span-4 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-primary-400 font-sans">
              Discover
            </h4>
            <ul className="space-y-2 text-sm text-primary-200/60 font-sans">
              <li><a href="#menu" className="hover:text-white transition-colors">Our Menu</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Process</a></li>
              <li><a href="#quiz" className="hover:text-white transition-colors">Taste Matcher</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-primary-400 font-sans">
              Sourcing
            </h4>
            <ul className="space-y-2 text-sm text-primary-200/60 font-sans">
              <li><a href="#" className="hover:text-white transition-colors">Partner Farms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Biodegradable Bags</a></li>
              <li><a href="#faqs" className="hover:text-white transition-colors">Allergy Isolations</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup (Hook Form + Zod) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs uppercase font-extrabold tracking-widest text-primary-400 font-sans">
            Join the Green Life
          </h4>
          <p className="text-xs text-primary-200/65 font-sans leading-relaxed">
            Subscribe for free wellness recipes, health hacks, and $15 off your first delivery cycle.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 relative">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter email address"
                disabled={isSubmitting || submitted}
                {...register("email")}
                className={`w-full h-11 px-4 text-sm bg-primary-900/40 border rounded-full text-white placeholder-primary-300/40 focus:outline-none focus:ring-1 focus:ring-primary-400 disabled:opacity-50 font-sans ${
                  errors.email ? "border-red-400/50" : "border-primary-800"
                }`}
              />
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                disabled={isSubmitting || submitted}
                className="h-11 w-11 rounded-full p-0 flex items-center justify-center flex-shrink-0"
              >
                {submitted ? <Check className="h-4 w-4 text-forest" /> : <Send className="h-4 w-4 text-forest" />}
              </Button>
            </div>
            
            {errors.email && (
              <p className="text-[11px] text-red-400 font-medium font-sans pl-3">
                {errors.email.message}
              </p>
            )}

            {submitted && (
              <p className="text-[11px] text-primary-400 font-semibold font-sans pl-3">
                Successfully subscribed! Check your inbox for $15 discount.
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-primary-200/40 font-sans gap-4">
        <span>© {new Date().getFullYear()} Leafy Bites Inc. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
