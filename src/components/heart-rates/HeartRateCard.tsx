"use client";

import { motion } from "framer-motion";
import MobileCardFrame from "../MobileCardFrame";
import { heartRateConfig } from "./heartRateConfig";
import { getHeartRateCondition, HeartRateLevel } from "./heartRateUtils";

interface HeartRateCardProps {
  level: HeartRateLevel;
  onShare?: () => void
}

export default function HeartRateCard({ level, onShare }: HeartRateCardProps) {
  const condition = getHeartRateCondition(level);
  const config = heartRateConfig[condition];

  const fadeScale = {
    hidden: { opacity: 0, scale: 0.85, y: 30 },
    show: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <MobileCardFrame
      className="grid-rows-[35%_60%]"
      topClassName="translate-y-10"
      bottomClassName="translate-y-5"
      background={config.background}
      onShare={onShare}
      fileName="heart-rate.png"
      ornaments={
        <motion.img
          src="/heart-rate/abstract-background.svg"
          className="absolute w-full h-full object-fill overflow-visible opacity-50 z-0"
          alt="ornament"
          initial={{
            x: -120,
            y: 120,
            opacity: 0.5,
            scale: 0.1,
            rotate: -15,
          }}
          whileInView={{
            x: 0,
            y: 0,
            opacity: 0.5,
            scale: 1,
            rotate: 0,
          }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        />
      }
      topContent={
        <motion.div
          variants={fadeScale}
          initial="hidden"
          whileInView="show"
          transition={{
            duration: 1.2,
            delay: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="h-full flex flex-col pt-5"
        >
          <p className="text-white font-semibold text-lg mb-2">
            Your exercise vibe:
          </p>
          <img src={config.topImage} className="w-full" alt="" />
        </motion.div>
      }
      illustration={
        <motion.img
          src="/heart-rate/red-heart.svg"
          alt="Red Heart"
          className="absolute bottom-15 right-10 w-37.5 z-10"
          animate={{ scale: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      }
      bottomContent={
        <motion.div
          variants={fadeScale}
          initial="hidden"
          whileInView="show"
          transition={{
            duration: 1.2,
            delay: 2.6, // SAMA DENGAN illustration
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="relative text-black mt-10"
        >
          <p className="text-2xl font-light">You're mostly doing</p>
          <p className="text-2xl font-medium leading-tight">
            {config.description}
          </p>
          {config.showExerciseText && (
            <p className="text-2xl font-light leading-tight">exercise</p>
          )}
          <div className="mt-5">
            <p className="text-md font-medium leading-tight whitespace-pre-line">
              {config.motivation}
            </p>
          </div>
        </motion.div>
      }
    />
  );
}
