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

const coinVariants = {
  initial: {
    y: "-100vh",
    opacity: 0,
    rotate: 0,
  },
  animate: {
    y: "100vh",
    opacity: [0, 1, 1, 0],
    rotate: 540,
  },
};

export default function WeeklyChallengeCard({
  totalReward,
  onShare,
}: WeeklyChallengeCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.6 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    background,
    headerBackground,
    illustrationSrc,
    coinSrc,
    currency,
    title,
    message,
  } = getWeeklyChallengeByVariant("default");

  return (
    <section
      ref={ref}
      className={`relative w-full max-w-[430px] mx-auto min-h-screen flex flex-col font-sans ${background}`}
    >
      {mounted && isInView && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.img
              key={i}
              src={coinSrc}
              alt="Coin"
              className="absolute w-[56px] h-auto"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-80px",
              }}
              variants={coinVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 3.2,
                ease: "linear",
                repeat: Infinity,
                delay: i * 0.25,
              }}
            />
          ))}
        </div>
      )}

      <div className={`px-6 py-12 ${headerBackground} relative z-30`}>
        <div className="text-white">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-medium">
              Total rewards redeemed:
            </p>
            <ShareButton onClick={onShare} />
          </div>

          <div className="flex items-end space-x-2 mt-6">
            <p className="text-lg font-medium">{currency}</p>
            <h1 className="text-5xl font-extrabold leading-tight">
              {mounted && isInView ? (
                <AnimatedCounter target={totalReward} duration={900} />
              ) : (
                formatCurrency(0)
              )}
            </h1>
          </div>

          <p className="mt-3 text-xl font-medium">
            {title}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between px-6 py-8 relative z-30">
        <p className="text-black text-lg font-medium leading-relaxed">
          {message.map((line, index) => (
            <span
              key={index}
              dangerouslySetInnerHTML={{
                __html: line ? `${line}<br />` : "<br />",
              }}
            />
          ))}
        </p>

        <div className="relative flex justify-center items-end mt-8">
          <img
            src={illustrationSrc}
            alt="Weekly Challenge Reward"
            className="w-[320px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
