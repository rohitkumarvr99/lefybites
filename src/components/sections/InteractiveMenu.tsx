"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs } from "@/components/ui/Tabs";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Minus, Check, Flame, X, ShoppingBag } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  category: "salad" | "bowl" | "blend";
  price: number;
  calories: number;
  description: string;
  image: string;
  tags: string[];
}

export default function InteractiveMenu() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  // Customization state
  const [customProtein, setCustomProtein] = useState<string>("none");
  const [customDressing, setCustomDressing] = useState<string>("house");
  const [quantity, setQuantity] = useState<number>(1);
  const [successMsg, setSuccessMsg] = useState<boolean>(false);

  const menuItems: MenuItem[] = [
    {
      id: "green-garden",
      name: "Green Garden Harvest",
      category: "salad",
      price: 14.50,
      calories: 320,
      description: "Organic baby spinach, crisp arugula, shredded cucumber, edamame, and broccoli florets with a toasted pumpkin seed garnish.",
      image: "/images/hero-salad.png",
      tags: ["Vegan", "Gluten-Free", "Low Carb"],
    },
    {
      id: "warm-autumn",
      name: "Golden Autumn Grain Bowl",
      category: "bowl",
      price: 16.00,
      calories: 480,
      description: "Warm tri-color quinoa and wild rice, roasted sweet potato chunks, steamed dinosaur kale, crunchy pecans, and sweet dried cranberries.",
      image: "/images/warm-grain.png",
      tags: ["High Fiber", "Vegetarian", "Hearty"],
    },
    {
      id: "smoothie-bowl",
      name: "Superfood Matcha Smoothie Bowl",
      category: "blend",
      price: 12.00,
      calories: 280,
      description: "Creamy organic avocado & matcha blend topped with organic sliced strawberries, superfood chia seeds, raw hemp seeds, and a warm almond butter drizzle.",
      image: "/images/smoothie-bowl.png",
      tags: ["Superfoods", "Anti-Oxidant", "No Sugar Added"],
    },
  ];

  const proteins = [
    { id: "none", name: "No Additional Protein", price: 0, calories: 0 },
    { id: "tofu", name: "Crispy Organic Tofu", price: 2.50, calories: 120 },
    { id: "chicken", name: "Grilled Free-Range Chicken", price: 3.50, calories: 160 },
    { id: "salmon", name: "Roasted Wild Salmon", price: 4.95, calories: 200 },
  ];

  const dressings = [
    { id: "house", name: "House Herb Vinaigrette", price: 0, calories: 70 },
    { id: "ginger", name: "Zesty Ginger Sesame", price: 0, calories: 85 },
    { id: "tahini", name: "Creamy Lemon Tahini", price: 0.50, calories: 110 },
    { id: "truffle", name: "White Truffle Vinaigrette", price: 1.50, calories: 130 },
  ];

  const tabsConfig = [
    { id: "all", label: "Browse All" },
    { id: "salad", label: "Signature Salads" },
    { id: "bowl", label: "Warm Grain Bowls" },
    { id: "blend", label: "Superfood Blends" },
  ];

  const filteredItems = activeCategory === "all"
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  // Math for customized item
  const selectedProteinObj = proteins.find(p => p.id === customProtein) || proteins[0];
  const selectedDressingObj = dressings.find(d => d.id === customDressing) || dressings[0];

  const customItemPrice = selectedItem 
    ? (selectedItem.price + selectedProteinObj.price + selectedDressingObj.price) * quantity 
    : 0;

  const customItemCalories = selectedItem 
    ? (selectedItem.calories + selectedProteinObj.calories + selectedDressingObj.calories) 
    : 0;

  const handleOpenCustomizer = (item: MenuItem) => {
    setSelectedItem(item);
    setCustomProtein("none");
    setCustomDressing("house");
    setQuantity(1);
    setSuccessMsg(false);
  };

  const handleAddToCart = () => {
    setSuccessMsg(true);
    setTimeout(() => {
      setSelectedItem(null);
      setSuccessMsg(false);
    }, 1500);
  };

  return (
    <section id="menu" className="py-20 max-w-7xl mx-auto px-6 md:px-12 relative">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-4 text-left">
          <span className="text-xs font-extrabold uppercase tracking-widest text-accent-500 font-sans">
            Our Culinary Menu
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-serif">
            Chef-crafted, nutrients-packed
          </h2>
        </div>

        {/* Tab filters */}
        <div className="flex">
          <Tabs
            tabs={tabsConfig}
            activeTab={activeCategory}
            onChange={(id) => setActiveCategory(id)}
            variant="pill"
          />
        </div>
      </div>

      {/* Grid of items */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card hoverEffect className="h-full flex flex-col border-border/70">
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-primary-100/30 dark:bg-primary-950/20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-primary-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-sm font-bold text-primary-900 dark:text-primary-300 border border-border/30 flex items-center gap-1 shadow-sm">
                    <Flame className="h-4 w-4 text-accent-400" />
                    <span>{item.calories} kcal</span>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col flex-grow gap-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 border border-primary-100/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Name and desc */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-serif text-foreground group-hover:text-primary-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-foreground/60 leading-relaxed font-sans line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer Price & Customize CTA */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30 w-full">
                    <span className="text-2xl font-black font-serif text-foreground">
                      ${item.price.toFixed(2)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenCustomizer(item)}
                      className="cursor-pointer"
                    >
                      Customize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Slide-out Customizer Panel / Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Customizer Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-lg bg-card text-card-foreground rounded-2xl shadow-2xl border border-border overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-border/80 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent-500">
                    Customize Box
                  </span>
                  <h3 className="text-xl font-bold font-serif text-foreground">
                    {selectedItem.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 text-foreground/50 hover:text-foreground hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-full transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable contents */}
              <div className="p-6 overflow-y-auto space-y-6 flex-grow">
                {/* Visual Banner */}
                <div className="flex items-center gap-4 bg-primary-50/50 dark:bg-primary-950/20 p-4 rounded-xl border border-border/40">
                  <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-sans text-foreground/75 leading-relaxed line-clamp-2">
                      {selectedItem.description}
                    </p>
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-foreground/50">
                      <span className="flex items-center gap-1 font-bold">
                        <Flame className="h-3 w-3 text-accent-400" />
                        {customItemCalories} Calories
                      </span>
                    </div>
                  </div>
                </div>

                {/* Option 1: Proteins */}
                <div className="space-y-3">
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-foreground/80">
                    1. Choose Protein Addition
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {proteins.map((p) => (
                      <label
                        key={p.id}
                        onClick={() => setCustomProtein(p.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                          customProtein === p.id
                            ? "border-primary-700 bg-primary-50/30 dark:border-primary-400 dark:bg-primary-900/20 font-bold"
                            : "border-border hover:bg-primary-50/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                            customProtein === p.id ? "bg-primary-700 dark:bg-primary-400 text-white dark:text-forest border-primary-700" : "border-border"
                          }`}>
                            {customProtein === p.id && <Check className="h-3.5 w-3.5" />}
                          </div>
                          <span className="text-sm text-foreground">{p.name}</span>
                        </div>
                        <span className="text-xs text-foreground/60">
                          {p.price > 0 ? `+$${p.price.toFixed(2)} (+${p.calories} cal)` : "Free"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Option 2: Dressings */}
                <div className="space-y-3">
                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-foreground/80">
                    2. Dressing Selection
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {dressings.map((d) => (
                      <label
                        key={d.id}
                        onClick={() => setCustomDressing(d.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                          customDressing === d.id
                            ? "border-primary-700 bg-primary-50/30 dark:border-primary-400 dark:bg-primary-900/20 font-bold"
                            : "border-border hover:bg-primary-50/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                            customDressing === d.id ? "bg-primary-700 dark:bg-primary-400 text-white dark:text-forest border-primary-700" : "border-border"
                          }`}>
                            {customDressing === d.id && <Check className="h-3.5 w-3.5" />}
                          </div>
                          <span className="text-sm text-foreground">{d.name}</span>
                        </div>
                        <span className="text-xs text-foreground/60">
                          {d.price > 0 ? `+$${d.price.toFixed(2)} (+${d.calories} cal)` : "Free"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Option 3: Quantity */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-bold text-foreground">Quantity</span>
                  <div className="flex items-center gap-4 bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-full border border-border/50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 rounded-full text-foreground/60 hover:text-foreground cursor-pointer hover:bg-border/30"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-base font-bold w-6 text-center select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 rounded-full text-foreground/60 hover:text-foreground cursor-pointer hover:bg-border/30"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="p-6 border-t border-border/80 bg-primary-50/30 dark:bg-primary-950/20 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-foreground/50">Estimated Total</span>
                  <span className="text-3xl font-black font-serif text-foreground">
                    ${customItemPrice.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={successMsg}
                  className="gap-2 px-8"
                >
                  {successMsg ? (
                    <>
                      <Check className="h-4 w-4" /> Added to Box
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" /> Add to Box
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
