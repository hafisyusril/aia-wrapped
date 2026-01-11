"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { VHCStatus } from "./VHCStatusConfig";
import { getVHCStatusContent } from "./VHCStatusUtils";
import ShareButton from "../ShareButton";
import { useShare } from "@/src/app/hooks/useShare";

interface SparkleStarProps {
  size: number;
  top: number;
  left: number;
  delay: number;
}

const SparkleStar = ({ size, top, left, delay }: SparkleStarProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className="absolute"
    style={{
      top: `${top}%`,
      left: `${left}%`,
    }}
    initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
      rotate: [0, 20, 0],
    }}
    transition={{
      duration: 2.8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
      fill="white"
      filter="url(#glow)"
      opacity="0.9"
    />
  </motion.svg>
);

interface VHCStatusCardProps {
  status: VHCStatus;
}

const STAR_COUNT = 14;

interface StarConfig {
  size: number;
  top: number;
  left: number;
  delay: number;
}

export default function VHCStatusCard({ status }: VHCStatusCardProps) {
  const {
    title,
    background,
    headerBackground,
    illustrationSrc,
    textColor,
    message,
  } = getVHCStatusContent(status);

  const [stars, setStars] = useState<StarConfig[]>([]);
  const share = useShare();

  useEffect(() => {
    const generatedStars: StarConfig[] = Array.from(
      { length: STAR_COUNT },
      () => ({
        size: Math.random() * 12 + 10,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 2,
      })
    );

    setStars(generatedStars);
  }, []);

  const [titleLine1, titleLine2] = title.split("\n");

  return (
    <section
      className={`relative w-full min-h-screen flex flex-col font-sans overflow-hidden ${background}`}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        {stars.map((star, i) => (
          <SparkleStar key={i} {...star} />
        ))}
      </div>

      <ShareButton
        onClick={() => {
          share({
            title: "My VHC status",
            text: "Check out my VHC status",
          });
        }}
        className="z-20"
      />

      <div className={`relative z-10 px-6 py-12 ${headerBackground}`}>
        <h1 className="text-white text-4xl font-extrabold leading-tight">
          {titleLine1}
          <br />
          {titleLine2}
        </h1>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <Image
          src={illustrationSrc}
          alt="VHC Illustration"
          width={220}
          height={220}
          priority
        />

        <p className={`${textColor} text-lg font-medium text-center`}>
          {message.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
