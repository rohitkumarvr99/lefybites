"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Sliders, CalendarRange, Utensils, Bike } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose Your Frequency",
      description: "Select from our 3, 5, or 7-day subscription plans that fit your lifestyle and nutritional goals.",
      icon: CalendarRange,
      color: "text-primary-600 dark:text-primary-400 bg-primary-100/60 dark:bg-primary-900/30",
    },
    {
      number: "02",
      title: "Customize & Select Meals",
      description: "Pick your salad bowls and warm grains. Substitute proteins, exclude allergens, or request extra dressing.",
      icon: Sliders,
      color: "text-accent-600 dark:text-accent-400 bg-accent-100/60 dark:bg-accent-950/40",
    },
    {
      number: "03",
      title: "Handcrafted by Chefs",
      description: "Our culinary experts chop, roast, and assemble your meals daily using 100% organic, locally sourced produce.",
      icon: Utensils,
      color: "text-primary-600 dark:text-primary-400 bg-primary-100/60 dark:bg-primary-900/30",
    },
    {
      number: "04",
      title: "Cold-Chain Fresh Delivery",
      description: "Delivered straight to your doorstep in 100% biodegradable insulated cooler bags. Keep fresh, eat fresh.",
      icon: Bike,
      color: "text-accent-600 dark:text-accent-400 bg-accent-100/60 dark:bg-accent-950/40",
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="how-it-works" className="py-20 bg-primary-50/20 dark:bg-primary-950/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] rounded-full bg-accent-200/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-accent-500 font-sans">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-serif">
            Freshness in four simple steps
          </h2>
          <p className="text-foreground/60 font-sans">
            We handle everything from local sourcing to zero-emission delivery, bringing delicious nutrition directly to you.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.number} variants={cardVariants}>
                <Card hoverEffect className="h-full flex flex-col relative border-border/60">
                  <CardContent className="p-8 flex flex-col items-start gap-4">
                    {/* Top line with number and icon */}
                    <div className="flex items-center justify-between w-full">
                      <div className={`p-3 rounded-2xl ${step.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-4xl font-extrabold font-serif text-foreground/10 select-none">
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-4 space-y-2">
                      <h3 className="text-xl font-bold font-serif text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-foreground/65 leading-relaxed font-sans">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
