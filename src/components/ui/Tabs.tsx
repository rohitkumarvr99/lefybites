"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "pill" | "underline";
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  variant = "pill",
}: TabsProps) {
  return (
    <div
      className={cn(
        "relative z-0 flex space-x-1 p-1 rounded-full",
        variant === "pill" ? "bg-primary-100/50 dark:bg-primary-950/20 border border-border/30" : "border-b border-border/50",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-5 py-2.5 text-sm font-semibold rounded-full font-sans cursor-pointer focus:outline-none transition-colors",
              isActive
                ? variant === "pill"
                  ? "text-white dark:text-primary-950"
                  : "text-primary-700 dark:text-primary-400"
                : "text-foreground/60 hover:text-foreground",
              variant === "underline" && "rounded-none pb-3 pt-2 px-6"
            )}
          >
            {isActive && variant === "pill" && (
              <motion.span
                layoutId="active-pill"
                className="absolute inset-0 bg-primary-700 dark:bg-primary-400 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            {isActive && variant === "underline" && (
              <motion.span
                layoutId="active-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-700 dark:bg-primary-400"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
