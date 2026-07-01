"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-semibold rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variants = {
      primary:
        "bg-primary-700 hover:bg-primary-800 text-white shadow-md shadow-primary-700/10 dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-forest",
      secondary:
        "bg-accent-400 hover:bg-accent-500 text-charcoal shadow-md shadow-accent-400/10 dark:bg-accent-400 dark:hover:bg-accent-300",
      outline:
        "border border-primary-700 text-primary-700 hover:bg-primary-50 dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary-950",
      ghost:
        "hover:bg-primary-50/50 text-foreground dark:hover:bg-primary-950/50",
      link: "text-primary-700 underline-offset-4 hover:underline dark:text-primary-300",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-13 px-8 text-lg",
      icon: "h-11 w-11 rounded-full",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
