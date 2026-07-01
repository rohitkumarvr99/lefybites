"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Menu", href: "#menu" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Quiz", href: "#quiz" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQs", href: "#faqs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-md shadow-primary-950/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="h-10 w-10 rounded-xl bg-primary-700 dark:bg-primary-500 flex items-center justify-center text-white dark:text-forest transition-transform duration-300 group-hover:rotate-12">
            <Leaf className="h-5 w-5" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Leafy<span className="text-primary-700 dark:text-primary-400">Bites</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-foreground/80 hover:text-primary-700 dark:hover:text-primary-400 transition-colors relative group py-2"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-700 dark:bg-primary-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Items */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-primary-100/50 dark:hover:bg-primary-900/30 text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <a href="#menu">
            <Button variant="primary" size="sm">
              Subscribe Now
            </Button>
          </a>
        </div>

        {/* Mobile Action buttons */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-foreground/80 hover:text-foreground cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground/80 hover:text-foreground cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-b border-border/40 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-foreground/80 hover:text-primary-700 dark:hover:text-primary-400 py-2 border-b border-border/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 flex items-center justify-between">
                <a href="#menu" onClick={() => setIsOpen(false)} className="w-full">
                  <Button variant="primary" className="w-full">
                    Subscribe Now
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
