"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "@/src/app/hooks/useInView";
import AnimatedCounter from "../steps/StepsCounter";

import {
  getWeeklyChallengeByVariant,
} from "./WeeklyChallengeConfig";
import { formatCurrency } from "./WeeklyChallengeUtils";

interface WeeklyChallengeCardProps {
  totalReward: number;
}

export default function WeeklyChallengeCard({
  totalReward,
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
      className={`w-full min-h-screen flex flex-col font-sans ${background}`}
    >
      {/* HEADER */}
      <div className={`px-6 py-12 ${headerBackground}`}>
        <div className="text-white">
          <p className="text-lg font-medium mb-2">
            Your rewards radar:
          </p>

          {/* ALWAYS ON */}
          <motion.div
            className="inline-block bg-white text-red-600 font-extrabold px-4 py-1 mb-4 text-5xl"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={
              isInView && mounted
                ? { scale: 1, rotate: -4, opacity: 1 }
                : { scale: 0, rotate: -180, opacity: 0 }
            }
            transition={{
              duration: 0.9,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            ALWAYS ON
          </motion.div>

          {/* TOTAL REWARD */}
          <div className="flex items-end space-x-2 mt-4">
            <p className="text-lg font-medium">{currency}</p>

            <h1 className="text-5xl font-extrabold leading-tight">
              {mounted && isInView ? (
                <AnimatedCounter
                  target={totalReward}
                  duration={900}
                />
              ) : (
                formatCurrency(0)
              )}
            </h1>
          </div>

          <p className="mt-2 text-xl font-medium">
            {title}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between px-6 py-8">
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
          <img
            src={coinSrc}
            alt="Floating Coin"
            className="absolute -right-0 top-0 w-[90px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
