"use client";

import { motion } from "framer-motion";
import { ReactNode, Ref } from "react";

interface SnapSectionProps {
  children: ReactNode;
  innerRef?: Ref<HTMLDivElement>;
  showScrollUp?: boolean;
  onScrollUp?: () => void;
  enableAnimation?: boolean;
}

export default function SnapSection({
  children,
  innerRef,
  showScrollUp = false,
  onScrollUp,
  enableAnimation = true,
}: SnapSectionProps) {
  return (
    <motion.section
      ref={innerRef}
      className="min-h-svh snap-start snap-always w-full relative"
      {...(enableAnimation
        ? {
            initial: { opacity: 1, y: 0 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: false, amount: 0.7 },
            transition: { duration: 0.6, ease: "easeOut" },
          }
        : {
            initial: false,
            animate: false,
          })}
    >
      {children}

      {enableAnimation && showScrollUp && onScrollUp && (
        <div
          onClick={onScrollUp}
          className="absolute bottom-[3%] left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 opacity-80 cursor-pointer"
        >
          <img src="/steps/scroll.svg" alt="Scroll" className="w-4 h-4" />
          <p className="text-xl text-black font-normal tracking-wide">scroll</p>
        </div>
      )}
    </motion.section>
  );
}
