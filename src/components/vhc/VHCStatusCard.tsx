"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useAnimate, animationControls } from "framer-motion";
import { VHCStatus } from "./VHCStatusConfig";
import { getVHCStatusContent } from "./VHCStatusUtils";
import ShareButton from "../ShareButton";
import VhcIllustration from "./VhcIllustration";
import VhcIllustrationNotCompleted from "./VhcIllustrationNotCompleted";

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

const curtainAnim = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // smooth premium
    },
  },
};

interface VHCStatusCardProps {
  status: VHCStatus;
  onShare?: () => void;
  isReady?: boolean;
}

const STAR_COUNT = 14;

interface StarConfig {
  size: number;
  top: number;
  left: number;
  delay: number;
}

export default function VHCStatusCard({ status, onShare, isReady = true }: VHCStatusCardProps) {
  const {
    title,
    background,
    headerBackground,
    illustrationSrc,
    textColor,
    message,
  } = getVHCStatusContent(status);

  const [isAllowShare, setIsAllowShare] = useState(false)
  const [stars, setStars] = useState<StarConfig[]>([]);

  useEffect(() => {
    const generatedStars: StarConfig[] = Array.from(
      { length: STAR_COUNT },
      () => ({
        size: Math.random() * 12 + 10,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 2,
      }),
    );

    setStars(generatedStars);
  }, []);

  const [titleLine1, titleLine2] = title.split("\n");

  return (
    <section
      className={`
    relative grid min-h-dvh grid-rows-[35%_65%]
    w-full max-w-[430px] mx-auto
    overflow-hidden font-sans
    @container
    ${background}
  `}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        {stars.map((star, i) => (
          <SparkleStar key={i} {...star} />
        ))}
      </div>
      <ShareButton
        onClick={onShare}
        className="z-20"
        isReady={isReady}
        viewport={{
          amount: 'all',
          once: true,
        }}
        style={{
          pointerEvents: isAllowShare ? 'auto' : 'none',
          cursor: isAllowShare ? 'pointer' : 'default'
        }}
        onViewportEnter={() => {
          setTimeout(() => setIsAllowShare(true), 2000)
        }}
      />

      {/* HEADER BACKGROUND — Tirai */}
      <motion.div
        className={`${headerBackground} absolute top-0 left-0 w-full origin-bottom`}
        initial={{ height: "100%" }}
        whileInView={{ height: "35%" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* TOP CONTENT */}
      <div className="relative z-20 h-full overflow-hidden">
        {/* HEADER CONTENT */}
        <div className="relative flex h-full flex-col justify-end px-7.5 pb-5">
          <h1 className="text-white font-bold text-3xl pt-15 leading-tight">
            <motion.p
              className="font-medium text-[4.7cqi]"
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {titleLine1}
            </motion.p>

            <motion.p
              className="font-extrabold text-[9.5cqi]"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {titleLine2}
            </motion.p>
          </h1>
        </div>
      </div>

      {/* BOTTOM CONTENT */}

      <div className="relative px-7.5 pt-15 z-20 flex flex-col gap-[50px]">
        <div className="ml-10 w-[220px]">
          {/* LOGIKA KONDISIONAL */}
          {status === "checked" ? (
            <VhcIllustration />
          ) : (
            <VhcIllustrationNotCompleted />
          )}
        </div>

        {/* MESSAGE */}
        <div
          className={`${textColor} text-[4.7cqi] font-medium flex flex-col gap-2`}
        >
          {message.split("\n").map((line, index) => (
            <motion.span
              key={index}
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 1.5, // stagger tiap baris
                ease: "easeOut",
              }}
            >
              {line}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
