"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  value: string;
  trigger: string;
  content: React.ReactNode;
}

export function AccordionItem({
  trigger,
  content,
  isOpen,
  onToggle,
}: AccordionItemProps & { isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border/80 py-2">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left font-serif text-lg font-semibold text-foreground hover:text-primary-700 dark:hover:text-primary-400 transition-colors focus:outline-none cursor-pointer"
      >
        <span>{trigger}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ChevronDown className="h-5 w-5 text-foreground/45" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 pt-1 text-base text-foreground/75 leading-relaxed font-sans">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({
  items,
  className,
}: {
  items: Omit<AccordionItemProps, "isOpen" | "onToggle">[];
  className?: string;
}) {
  const [openValue, setOpenValue] = useState<string | null>(null);

  const handleToggle = (value: string) => {
    setOpenValue(openValue === value ? null : value);
  };

  return (
    <div className={cn("w-full space-y-1", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          trigger={item.trigger}
          content={item.content}
          isOpen={openValue === item.value}
          onToggle={() => handleToggle(item.value)}
        />
      ))}
    </div>
  );
}
