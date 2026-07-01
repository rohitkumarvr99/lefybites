"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Star, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: 0.3,
      },
    },
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-primary-50/30 to-transparent dark:from-primary-950/10">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-[-10%] w-[40rem] h-[40rem] rounded-full bg-primary-200/20 dark:bg-primary-900/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-[-10%] w-[30rem] h-[30rem] rounded-full bg-accent-200/10 dark:bg-accent-900/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
        >
          {/* Tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/60 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold border border-primary-200/20"
          >
            <Sparkles className="h-4 w-4 text-accent-400" />
            <span>Premium Meal Subscriptions</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground font-serif"
          >
            Savor the fresh taste of{" "}
            <span className="text-primary-700 dark:text-primary-400 relative inline-block">
              organic wellness.
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-accent-400/40 -z-10 rounded" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-foreground/70 font-sans max-w-xl leading-relaxed"
          >
            Indulge in vibrant, chef-crafted organic salads and warm grain bowls
            packed with flavor and clean nutrition. Tailored to your taste and
            delivered fresh daily.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a href="#menu">
              <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                Explore Menu <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#quiz">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                Find Your Match
              </Button>
            </a>
          </motion.div>

          {/* Social Proof Badges */}
          <motion.div
            variants={itemVariants}
            className="pt-6 grid grid-cols-2 sm:flex sm:items-center gap-6 border-t border-border/40 w-full"
          >
            {/* Reviews */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" />
                ))}
              </div>
              <span className="text-sm font-bold mt-1.5 text-foreground">
                4.9/5 Rating
              </span>
              <span className="text-xs text-foreground/50">
                From 2,000+ subscribers
              </span>
            </div>

            {/* Quality Standard */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent-100 dark:bg-accent-950/40 flex items-center justify-center text-accent-500">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground leading-none">
                  100% Organic
                </span>
                <span className="text-xs text-foreground/50 mt-1">
                  Locally sourced ingredients
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Salad Graphic */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          {/* Decorative rotating salad plate background glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-300/30 to-accent-300/20 dark:from-primary-700/10 dark:to-accent-900/10 rounded-full filter blur-2xl -z-10 transform scale-90 animate-pulse" />

          {/* Animated Float wrap */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            className="relative w-full aspect-square max-w-[420px] rounded-full overflow-hidden border-[6px] border-white dark:border-primary-900 shadow-2xl shadow-primary-900/10 dark:shadow-black/40"
          >
            <Image
              src="/images/hero-salad.png"
              alt="Gourmet Organic Salad Bowl"
              fill
              className="object-cover"
              priority
              sizes="(max-w-720px) 100vw, 420px"
            />
          </motion.div>

          {/* Floating badge 1: Chef Quality */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-10 left-[-20px] sm:left-[-10px] bg-white dark:bg-primary-900 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-border/40"
          >
            <span className="text-xl">👨‍🍳</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground">Chef Designed</span>
              <span className="text-[10px] text-foreground/50 leading-none mt-0.5">Original recipes</span>
            </div>
          </motion.div>

          {/* Floating badge 2: Delivery */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 right-[-10px] bg-white dark:bg-primary-900 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 border border-border/40"
          >
            <span className="text-xl">🚴</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground">Zero Emission</span>
              <span className="text-[10px] text-foreground/50 leading-none mt-0.5">Daily fresh drop</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
