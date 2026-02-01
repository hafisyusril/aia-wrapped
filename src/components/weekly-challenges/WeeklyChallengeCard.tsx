"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "@/src/app/hooks/useInView";
import AnimatedCounter from "../steps/StepsCounter";
import { getWeeklyChallengeByVariant } from "./WeeklyChallengeConfig";
import { formatCurrency } from "./WeeklyChallengeUtils";
import ShareButton from "../ShareButton";

interface WeeklyChallengeCardProps {
  totalReward: number;
  onShare?: () => void;
}

// Varian untuk teks Slide Down
const textVariant = {
  hidden: { y: -100, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: delay,
      ease: "easeOut" as const,
    },
  }),
};

const coinVariants = {
  initial: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1 + i * 0.1, // Delay 1 detik + stagger antar koin
      duration: 0.5,
    },
  }),
  floating: (i: number) => ({
    y: [0, -70, 0],
    rotate: [0, 40, -40, 0],
    transition: {
      duration: 2 + Math.random() * 2,
      ease: "easeInOut" as const,
      repeat: Infinity,
      delay: i * 0.2,
    },
  }),
};

export default function WeeklyChallengeCard({
  totalReward,
  onShare,
}: WeeklyChallengeCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.6 });
  const [mounted, setMounted] = useState(false);

  // STATE KUNCI: Untuk memastikan animasi hanya jalan sekali
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update hasAnimated saat elemen masuk ke viewport pertama kali
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const {
    background,
    headerBackground,
    illustrationSrc,
    coinSrc,
    currency,
    title,
    message,
  } = getWeeklyChallengeByVariant("default");

  // Gunakan variabel ini untuk memicu animasi agar tidak bergantung langsung pada isInView lagi
  const shouldAnimate = hasAnimated;

  return (
    <section
      ref={ref}
      // Kita gunakan grid atau min-h agar strukturnya stabil saat tirai bergerak
      className={`@container relative w-full max-w-[430px] mx-auto min-h-screen flex flex-col overflow-hidden font-sans ${background}`}
    >
      {/* 1. HEADER BACKGROUND (TIRAI) */}
      <motion.div
        className={`absolute top-0 left-0 w-full z-10 origin-bottom ${headerBackground}`}
        initial={{ height: "100%" }}
        // Gunakan shouldAnimate, jangan isInView
        animate={{ height: shouldAnimate ? "44%" : "100%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* 2. ANIMASI COIN */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.img
              key={i}
              src={coinSrc}
              alt="Coin"
              className="absolute w-[60px] h-auto"
              custom={i}
              variants={coinVariants}
              initial="initial"
              // Coin tetap floating selamanya setelah muncul pertama kali
              animate={shouldAnimate ? ["visible", "floating"] : "initial"}
              style={{
                left: `${15 + i * 30}%`, // Posisi statis biar tidak random tiap render
                top: `${60 + (i % 2) * 5}%`,
              }}
            />
          ))}
        </div>
      )}
      {/* 3. CONTENT TOP */}
      <div className="relative z-30 px-6 pt-30 pb-8 h-[38%] flex flex-col justify-end">
        <div className="text-white">
          <div className="flex items-center justify-between mb-4">
            <motion.p
              variants={textVariant}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              custom={0.5}
              className="text-[3.8cqi] font-everest font-medium"
            >
              Total rewards earned:
            </motion.p>
            <ShareButton onClick={onShare} />
          </div>

          <div className="flex items-end space-x-2 mt-6">
            <div className="flex items-end space-x-1">
              <span className="text-[10.3cqi] font-extrabold leading-none font-source">
                {currency}
              </span>
              {mounted && shouldAnimate ? (
                <AnimatedCounter
                  key={totalReward}
                  target={totalReward}
                  duration={900}
                  className="text-[10.3cqi] font-extrabold leading-none font-source"
                />
              ) : (
                <span className="text-[10.3cqi] font-extrabold leading-none">
                  0
                </span>
              )}
            </div>
          </div>

          <motion.p
            variants={textVariant}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            custom={1.5}
            className="text-[4.8cqi] font-medium whitespace-pre-line mt-2"
          >
            {title}
          </motion.p>
        </div>
      </div>
      {/* 4. CONTENT BOTTOM */}
      <div className="relative z-30 flex-1 flex flex-col justify-between px-6 pb-4">
        <div className="text-black text-[4.8cqi] font-medium leading-relaxed whitespace-pre-line">
          {message.map((line, index) => (
            <motion.p
              key={index}
              variants={textVariant}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              custom={1.7 + index * 0.2}
              dangerouslySetInnerHTML={{
                __html: line ? `${line}<br />` : "<br />",
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative flex justify-center items-end mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            delay: 1,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <img
            src={illustrationSrc}
            alt="Weekly Challenge Reward"
            className="w-[300px] h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
