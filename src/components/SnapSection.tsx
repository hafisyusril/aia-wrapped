"use client";

import { motion } from "framer-motion";
import { ReactNode, Ref, useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down";

interface SnapSectionProps {
  children: ReactNode;
  innerRef?: Ref<HTMLDivElement>;
  showScrollUp?: boolean;
  onScrollUp?: () => void;
  enableAnimation?: boolean;
  onVisible?: () => void;
  scrollDirection?: ScrollDirection;
  persistScrollHint?: boolean;
}

export default function SnapSection({
  children,
  innerRef,
  showScrollUp = false,
  onScrollUp,
  enableAnimation = true,
  onVisible,
  scrollDirection = "up",
  persistScrollHint,
}: SnapSectionProps) {
  const [showHint, setShowHint] = useState(false);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const loopTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleViewportEnter = () => {
    onVisible?.();

    if (!showScrollUp) return;

    // clear interval lama (kalau masuk lagi)
    if (loopTimerRef.current) {
      clearInterval(loopTimerRef.current);
    }

    setShowHint(true);

    if (!persistScrollHint) {
      loopTimerRef.current = setInterval(() => {
        setShowHint(true);

        setTimeout(() => {
          setShowHint(false);
        }, 2000); // durasi tampil
      }, 4000); // total 1 cycle (show + hide)
    }
  };

  useEffect(() => {
    return () => {
      if (loopTimerRef.current) {
        clearInterval(loopTimerRef.current);
      }
    };
  }, []);

  return (
    <motion.section
      onViewportEnter={handleViewportEnter}
      ref={innerRef}
      className="min-h-dvh snap-start snap-always w-full relative"
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
        <motion.div
          onClick={onScrollUp}
          initial={{ opacity: 0, y: 8 }}
          animate={showHint ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pointer-events-auto absolute bottom-[3%] left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 cursor-pointer"
        >
          <img
            src="/steps/scroll.svg"
            alt="Scroll"
            className={`w-4 h-4 transition-transform ${
              scrollDirection === "down" ? "rotate-180" : ""
            }`}
          />
          <p className="text-xl text-black font-normal tracking-wide">
            {" "}
            {scrollDirection === "down" ? "Back to Top" : "scroll"}
          </p>
        </motion.div>
      )}
    </motion.section>
  );
}
