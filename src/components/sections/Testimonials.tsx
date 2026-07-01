"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarLetter: string;
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Certified Fitness Trainer",
      text: "Leafy Bites has completely transformed my lunch routine. As a trainer, I need high-protein, clean ingredients. The customizer lets me load up on free-range chicken and tofu, and it arrives cold and crisp every time.",
      rating: 5,
      avatarLetter: "S",
    },
    {
      id: 2,
      name: "David Chen",
      role: "Tech Lead at Stripe",
      text: "Skipping healthy meals during tight product sprints was my default. Now I have a 5-day subscription to Leafy Bites. The Warm Autumn Grain bowl is incredibly filling, and the zero-emission delivery aligns with my lifestyle.",
      rating: 5,
      avatarLetter: "D",
    },
    {
      id: 3,
      name: "Elena Rostova",
      role: "Creative Director",
      text: "The gourmet taste sets this service apart. These aren't generic salads—the dressings, especially the white truffle oil and lime tahini, are chef-level. It's beautiful, nutritious, and absolutely delicious.",
      rating: 5,
      avatarLetter: "E",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-20 bg-primary-50/20 dark:bg-primary-950/5 relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-1/2 left-[-10%] w-[350px] h-[350px] rounded-full bg-primary-200/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-accent-500 font-sans">
            Subscriber Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-serif">
            What our community says
          </h2>
        </div>

        {/* Carousel Box */}
        <div className="relative bg-card text-card-foreground border border-border/70 rounded-2xl p-8 md:p-14 shadow-xl dark:shadow-black/20">
          {/* Quote icon decoration */}
          <div className="absolute top-6 right-8 text-primary-100 dark:text-primary-900/30">
            <Quote className="h-16 w-16 stroke-[4px]" />
          </div>

          <div className="relative min-h-[220px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-accent-400 text-accent-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-lg md:text-xl font-medium leading-relaxed font-sans text-foreground/90 italic">
                  &ldquo;{reviews[activeIndex].text}&rdquo;
                </p>

                {/* User Bio */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="h-12 w-12 rounded-full bg-primary-700 dark:bg-primary-500 text-white dark:text-forest flex items-center justify-center font-bold text-lg select-none">
                    {reviews[activeIndex].avatarLetter}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-serif text-base font-bold text-foreground">
                      {reviews[activeIndex].name}
                    </span>
                    <span className="text-xs text-foreground/50 font-sans">
                      {reviews[activeIndex].role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation */}
            <div className="flex items-center gap-3 mt-8 justify-end">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-border/80 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-foreground cursor-pointer transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border border-border/80 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-foreground cursor-pointer transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
