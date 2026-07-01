"use client";

import React, { useState } from "react";
import * as z from "zod";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChevronRight, ChevronLeft, Check, Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import Image from "next/image";

// Zod validation schemas for each step
const stepOneSchema = z.object({
  dietary: z.enum(["vegan", "vegetarian", "keto", "anything"], {
    message: "Please select a dietary preference.",
  }),
});

const stepTwoSchema = z.object({
  goal: z.enum(["weight", "muscle", "clean", "time"], {
    message: "Please select a wellness goal.",
  }),
});

const stepThreeSchema = z.object({
  spice: z.enum(["mild", "medium", "hot"], {
    message: "Please select a spice tolerance level.",
  }),
  allergies: z.array(z.string()).default([]),
});

interface RecommendedMeal {
  name: string;
  price: number;
  calories: number;
  desc: string;
  image: string;
  tagLine: string;
}

export default function TasteQuiz() {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<RecommendedMeal | null>(null);

  // Form states for each step
  const [dietary, setDietary] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [spice, setSpice] = useState<string>("");
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const dietOptions = [
    { id: "vegan", label: "Strictly Vegan", desc: "No meat, poultry, dairy, eggs, or honey." },
    { id: "vegetarian", label: "Vegetarian", desc: "Plant-focused diet containing dairy/eggs." },
    { id: "keto", label: "Keto/Low Carb", desc: "High healthy fat, ultra-low sugar, moderate protein." },
    { id: "anything", label: "Anything Goes!", desc: "Open to chef combinations of all clean organic meats & plants." },
  ];

  const goalOptions = [
    { id: "weight", label: "Calorie Balance & Deficit", desc: "Light, filling meals tailored for lean maintenance." },
    { id: "muscle", label: "Protein Packing", desc: "Denser bowls packed with lean meat/plant-based proteins." },
    { id: "clean", label: "Vitamins & Detox", desc: "Dense raw greens, superfoods, and micro-nutrients." },
    { id: "time", label: "Time Saving", desc: "Ready-to-eat nutritious meals for busy professionals." },
  ];

  const spiceOptions = [
    { id: "mild", label: "Mild & Herby", desc: "Zero heat, focusing on savory fresh herbs & vinaigrettes." },
    { id: "medium", label: "Medium Kicker", desc: "Mild peppers, zesty ginger, and garlic enhancements." },
    { id: "hot", label: "Hot & Flaming!", desc: "Habenero, chili flakes, and fiery sriracha glazes." },
  ];

  const allergyOptions = [
    { id: "nuts", label: "Tree Nuts" },
    { id: "gluten", label: "Gluten/Wheat" },
    { id: "dairy", label: "Lactose/Dairy" },
    { id: "soy", label: "Soy/Tempeh" },
  ];

  const handleNextStep = () => {
    setErrorMsg("");
    if (step === 1) {
      const result = stepOneSchema.safeParse({ dietary });
      if (!result.success) {
        setErrorMsg(result.error.issues[0].message);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const result = stepTwoSchema.safeParse({ goal });
      if (!result.success) {
        setErrorMsg(result.error.issues[0].message);
        return;
      }
      setStep(3);
    } else if (step === 3) {
      const result = stepThreeSchema.safeParse({ spice, allergies: selectedAllergies });
      if (!result.success) {
        setErrorMsg(result.error.issues[0].message);
        return;
      }
      // Calculate output and trigger loading
      setLoading(true);
      setStep(4);
      setTimeout(() => {
        setLoading(false);
        generateResult();
      }, 2000);
    }
  };

  const handlePrevStep = () => {
    setErrorMsg("");
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleAllergyToggle = (id: string) => {
    if (selectedAllergies.includes(id)) {
      setSelectedAllergies(selectedAllergies.filter(item => item !== id));
    } else {
      setSelectedAllergies([...selectedAllergies, id]);
    }
  };

  const generateResult = () => {
    // Decision logic based on quiz entries
    if (dietary === "vegan" || dietary === "vegetarian") {
      if (goal === "weight" || goal === "clean") {
        setRecommendation({
          name: "Green Garden Harvest Salad",
          price: 14.50,
          calories: 320,
          desc: "A rich mix of baby spinach, cucumbers, and edamame tossed in our House Herb Vinaigrette. Safe for vegans and optimized for low-calorie nourishment.",
          image: "/images/hero-salad.png",
          tagLine: "Pure Plant Synergy",
        });
      } else {
        setRecommendation({
          name: "Superfood Matcha Smoothie Bowl",
          price: 12.00,
          calories: 280,
          desc: "Matcha-avocado base loaded with strawberries, pumpkin seeds, hemp, and almond butter. Packed with micro-nutrients to power up active lifestyles.",
          image: "/images/smoothie-bowl.png",
          tagLine: "High-Performance Vegan Energy",
        });
      }
    } else {
      // Keto or Anything
      if (goal === "muscle" || goal === "time") {
        setRecommendation({
          name: "Golden Autumn Grain Bowl (with Protein Add)",
          price: 19.50,
          calories: 640,
          desc: "Tri-color quinoa, warm wild rice, sweet potato cubes, and roasted walnuts. We recommend adding Grilled Free-Range Chicken or Tofu for a double protein load.",
          image: "/images/warm-grain.png",
          tagLine: "High Protein Muscle Support",
        });
      } else {
        setRecommendation({
          name: "Green Garden Harvest (with Salmon Add)",
          price: 19.45,
          calories: 520,
          desc: "Our premium spinach and broccoli harvest salad, topped with a warm fillet of wild-caught salmon to satisfy low-carb keto parameters.",
          image: "/images/hero-salad.png",
          tagLine: "Lean Keto Fuel",
        });
      }
    }
  };

  const resetQuiz = () => {
    setDietary("");
    setGoal("");
    setSpice("");
    setSelectedAllergies([]);
    setRecommendation(null);
    setStep(1);
    setErrorMsg("");
  };

  // Animation directions
  const slideVariants: Variants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.25 } },
    exit: { x: -50, opacity: 0, transition: { type: "tween", duration: 0.25 } },
  };

  return (
    <section id="quiz" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative grids */}
      <div className="absolute top-10 right-[5%] w-80 h-80 bg-primary-100/30 dark:bg-primary-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-accent-500 font-sans">
            AI Taste Matcher
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-serif">
            Find your perfect salad match
          </h2>
          <p className="text-foreground/60 font-sans">
            Take our quick 45-second quiz to discover custom meal plans crafted for your fitness targets and taste cravings.
          </p>
        </div>

        {/* Wizard Card */}
        <Card className="shadow-xl dark:shadow-black/30 border-border/80 relative">
          {/* Progress bar */}
          {step <= 3 && (
            <div className="w-full h-1 bg-border/40 absolute top-0 left-0 overflow-hidden">
              <motion.div
                initial={{ width: "33%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-primary-700 dark:bg-primary-500"
              />
            </div>
          )}

          <CardContent className="p-8 md:p-12 min-h-[420px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-primary-700 dark:text-primary-400">Step 1 of 3</span>
                    <h3 className="text-2xl font-bold font-serif text-foreground">
                      What are your dietary preferences?
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dietOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setDietary(opt.id)}
                        className={`p-5 rounded-2xl border text-left flex flex-col gap-1.5 transition-all duration-200 cursor-pointer ${
                          dietary === opt.id
                            ? "border-primary-700 bg-primary-50/40 dark:border-primary-400 dark:bg-primary-950/20 shadow-md"
                            : "border-border/80 hover:bg-primary-50/10"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-bold font-sans text-foreground">{opt.label}</span>
                          {dietary === opt.id && (
                            <span className="h-5 w-5 rounded-full bg-primary-700 dark:bg-primary-400 text-white dark:text-forest flex items-center justify-center">
                              <Check className="h-3 w-3" />
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-foreground/50 leading-relaxed font-sans">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-primary-700 dark:text-primary-400">Step 2 of 3</span>
                    <h3 className="text-2xl font-bold font-serif text-foreground">
                      What is your primary wellness goal?
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {goalOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setGoal(opt.id)}
                        className={`p-5 rounded-2xl border text-left flex flex-col gap-1.5 transition-all duration-200 cursor-pointer ${
                          goal === opt.id
                            ? "border-primary-700 bg-primary-50/40 dark:border-primary-400 dark:bg-primary-950/20 shadow-md"
                            : "border-border/80 hover:bg-primary-50/10"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-bold font-sans text-foreground">{opt.label}</span>
                          {goal === opt.id && (
                            <span className="h-5 w-5 rounded-full bg-primary-700 dark:bg-primary-400 text-white dark:text-forest flex items-center justify-center">
                              <Check className="h-3 w-3" />
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-foreground/50 leading-relaxed font-sans">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-primary-700 dark:text-primary-400">Step 3 of 3</span>
                    <h3 className="text-2xl font-bold font-serif text-foreground">
                      Customize spice & specify allergies
                    </h3>
                  </div>

                  {/* Spice selection */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-foreground/80 font-sans">
                      Spicy Heat Level
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {spiceOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setSpice(opt.id)}
                          className={`p-4 rounded-xl border text-center flex flex-col gap-1 cursor-pointer transition-all duration-200 ${
                            spice === opt.id
                              ? "border-primary-700 bg-primary-50/40 dark:border-primary-400 dark:bg-primary-950/20 font-bold"
                              : "border-border/80 hover:bg-primary-50/10"
                          }`}
                        >
                          <span className="text-sm text-foreground">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Allergy checklist */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-sm font-extrabold uppercase tracking-wider text-foreground/80 font-sans">
                      Exclude Allergens (Optional)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {allergyOptions.map((opt) => {
                        const isChecked = selectedAllergies.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleAllergyToggle(opt.id)}
                            className={`p-3.5 rounded-xl border text-center font-sans text-sm font-semibold transition-all duration-200 cursor-pointer ${
                              isChecked
                                ? "border-accent-500 bg-accent-50/40 dark:border-accent-400 dark:bg-accent-950/20 text-accent-600 dark:text-accent-400"
                                : "border-border/80 hover:bg-primary-50/10 text-foreground"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center space-y-4 py-12 flex-grow"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="text-primary-700 dark:text-primary-400"
                  >
                    <RefreshCw className="h-10 w-10" />
                  </motion.div>
                  <p className="font-serif text-lg font-bold text-foreground">
                    Calculating nutrient profiles...
                  </p>
                  <p className="text-sm text-foreground/50">
                    Aligning selections with chef kitchen schedules
                  </p>
                </motion.div>
              )}

              {step === 4 && !loading && recommendation && (
                <motion.div
                  key="recommendation"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-accent-100 dark:bg-accent-950/40 rounded-full text-accent-600 dark:text-accent-400 text-xs font-bold font-sans">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Perfect Match Found</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold font-serif text-foreground">
                      Meet your ideal bowl
                    </h3>
                  </div>

                  {/* Recommendation Card */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 bg-primary-50/40 dark:bg-primary-950/15 rounded-2xl border border-border/60">
                    <div className="md:col-span-4 relative aspect-square w-full max-w-[180px] mx-auto rounded-xl overflow-hidden border-2 border-white dark:border-primary-900 shadow-md">
                      <Image
                        src={recommendation.image}
                        alt={recommendation.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:col-span-8 space-y-3 text-left">
                      <span className="text-[10px] font-extrabold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
                        {recommendation.tagLine}
                      </span>
                      <h4 className="text-xl font-bold font-serif text-foreground">
                        {recommendation.name}
                      </h4>
                      <p className="text-sm text-foreground/75 leading-relaxed font-sans">
                        {recommendation.desc}
                      </p>
                      <div className="flex items-center gap-6 pt-1 text-sm font-semibold">
                        <span className="text-foreground">Base Price: ${recommendation.price.toFixed(2)}</span>
                        <span className="text-foreground/50">|</span>
                        <span className="text-foreground/70">{recommendation.calories} kcal</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation actions */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                    <a href="#menu" onClick={resetQuiz}>
                      <Button variant="primary" className="w-full sm:w-auto gap-2">
                        Get It Custom Added <ChevronRight className="h-4 w-4" />
                      </Button>
                    </a>
                    <Button variant="ghost" onClick={resetQuiz} className="w-full sm:w-auto gap-2">
                      Retake Quiz <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error alerts */}
            {errorMsg && (
              <div className="mt-4 flex items-center gap-2 p-3.5 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-200/20 rounded-xl text-sm font-medium font-sans">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Footer Buttons */}
            {step <= 3 && (
              <div className="flex items-center justify-between border-t border-border/40 pt-6 mt-8">
                <Button
                  variant="ghost"
                  onClick={handlePrevStep}
                  disabled={step === 1}
                  className="gap-1 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>
                <Button variant="primary" onClick={handleNextStep} className="gap-1 cursor-pointer">
                  {step === 3 ? "Generate Recipe" : "Continue"}{" "}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
