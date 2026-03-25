"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useState } from "react";

export interface NativeHoverCardProps {
  imageSrc: string;
  imageAlt?: string;
  name: string;
  username?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonContent?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  variant?: "default" | "glass" | "bordered";
}

const imageSizeVariants = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-full max-w-[320px] aspect-square object-cover",
};

const cardWidthVariants = {
  sm: "w-56",
  md: "w-72",
  lg: "w-80",
  xl: "w-full max-w-[400px]",
};

const getInitials = (name: string) => {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
};

export function Component({
  imageSrc,
  imageAlt,
  name,
  username,
  description,
  buttonText = "View Profile",
  onButtonClick,
  buttonContent,
  size = "md",
  className,
  variant = "default",
}: NativeHoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case "glass":
        return "bg-[rgba(3,3,8,0.6)] backdrop-blur-2xl border border-[var(--border-accent)]";
      case "bordered":
        return "bg-card border-2 border-primary/20";
      default:
        return "bg-card border border-border";
    }
  };

  const avatarElement = (
    <Avatar className="w-full h-full object-cover">
      <AvatarImage src={imageSrc || "/placeholder.svg"} alt={imageAlt || name} className="object-cover" />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );

  return (
    <motion.div
      className={cn("relative inline-block w-full flex justify-center", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        width: isHovered ? "auto" : "fit-content",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <motion.div
        className={cn("relative rounded-[24px] overflow-hidden shadow-2xl shadow-black", imageSizeVariants[size])}
        layout
        animate={{
          padding: isHovered ? "8px" : "0px",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {avatarElement}
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-0 left-1/2 -translate-x-1/2 rounded-2xl shadow-2xl overflow-hidden z-20",
              cardWidthVariants[size],
              getVariantStyles()
            )}
            style={{ pointerEvents: "auto" }}
          >
            <div className="relative">
              <motion.div className={cn("relative p-2 w-full", imageSizeVariants[size])}>
                {avatarElement}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="p-6 space-y-4"
              >
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-2xl font-bold font-display text-white tracking-widest uppercase shadow-black drop-shadow-lg"
                  >
                    {name}
                  </motion.h3>
                  {username && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 }}
                      className="text-[10px] uppercase tracking-[0.3em] font-mono text-[var(--accent-bright)]"
                    >
                      @{username}
                    </motion.p>
                  )}
                </div>

                {description && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[13px] text-[var(--text-secondary)] leading-relaxed"
                  >
                    {description}
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="pt-2"
                >
                  {buttonContent ? (
                    buttonContent
                  ) : (
                    <Button onClick={onButtonClick} className="w-full min-h-[44px] bg-[var(--accent)] hover:bg-[var(--accent-bright)] text-white font-mono text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300">
                      {buttonText}
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
