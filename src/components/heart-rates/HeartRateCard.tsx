"use client";

import { motion, useAnimate, useInView } from "framer-motion";
import { heartRateConfig } from "./heartRateConfig";
import { getHeartRateCondition, HeartRateLevel } from "./heartRateUtils";
import ShareButton from "../ShareButton";
import { RefObject, useEffect, useState } from "react";

interface HeartRateCardProps {
  level: HeartRateLevel;
  containerRef: RefObject<HTMLElement | null>;
  onShare?: () => void;
  pageName?: string;
  isReady?: boolean;
}

export default function HeartRateCard({
  level,
  containerRef,
  pageName,
  onShare,
  isReady = true,
}: HeartRateCardProps) {
  const condition = getHeartRateCondition(level);
  const config = heartRateConfig[condition];

  const [isAllowShare, setIsAllowShare] = useState(false)
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, {
    root: containerRef,
    initial: false,
    amount: 0.75,
    once: true,
  });

  useEffect(() => {
    const animationKeyframes = {
      type: "keyframes",
      duration: 0.4,
    } as const;

    const animationSpring = {
      type: "spring" as const,
      stiffness: 100,
      damping: 5,
      mass: 0.4,
    } as const;

    const enter = async () => {
      animate(
        '[data-animate="content"]',
        {
          y: "0%",
        },
        animationKeyframes,
      );

      await animate(
        '[data-animate="bg-heart"]',
        {
          x: 0,
          y: 0,
          opacity: 0.5,
          scale: 1,
        },
        animationKeyframes,
      );

      await Promise.all([
        animate(
          '[data-animate="label"',
          {
            y: "0%",
            opacity: 1,
          },
          animationKeyframes,
        ),
        animate(
          '[data-animate="red-heart"',
          {
            opacity: 1,
          },
          animationKeyframes,
        ),
      ]);

      await animate(
        '[data-animate="top-image"]',
        {
          scale: 1,
          opacity: 1,
        },
        animationSpring,
      );

      await animate(
        '[data-animate="message"',
        {
          y: "0%",
          opacity: 1,
        },
        animationKeyframes,
      );

      await animate(
        '[data-animate="motivation"',
        {
          y: "0%",
          opacity: 1,
        },
        animationKeyframes,
      );
    };

    const exit = () => {
      animate(
        '[data-animate="content"]',
        {
          y: "100%",
        },
        animationKeyframes,
      );

      animate(
        '[data-animate="bg-heart"]',
        {
          x: -120,
          y: 120,
          opacity: 0.5,
          scale: 0.1,
          rotate: -15,
        },
        animationKeyframes,
      );

      animate(
        '[data-animate="label"',
        {
          y: "-100%",
          opacity: 0,
        },
        animationKeyframes,
      );

      animate(
        '[data-animate="red-heart"',
        {
          opacity: 0,
        },
        animationKeyframes,
      );

      animate(
        '[data-animate="top-image"]',
        {
          scale: 0,
          opacity: 0,
        },
        animationSpring,
      );

      animate(
        '[data-animate="message"',
        {
          y: "-100%",
          opacity: 0,
        },
        animationKeyframes,
      );

      animate(
        '[data-animate="motivation"',
        {
          y: "100%",
          opacity: 0,
        },
        animationKeyframes,
      );
    };

    if (inView) enter();
    else exit();
  }, [inView, animate]);

  const [background, bgContent] = config.backgrounds;
  return (
    <div
      ref={scope}
      className="@container w-full relative overflow-hidden max-w-[430px] mx-auto min-h-dvh bg-gray-100 font-sans flex flex-col"
      style={{ background }}
    >
      {onShare && (
        <ShareButton
          pageName={pageName}
          onClick={onShare}
          isBrightBg={true}
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
      )}
      <div
        data-animate="content"
        className="absolute inset-x-0 bottom-0 h-[70%]"
        style={{ background: bgContent }}
      />
      <img
        data-animate="bg-heart"
        src="/heart-rate/bg-heart.png"
        className="absolute w-[150%] max-w-none h-full object-contain overflow-visible opacity-50 z-0"
        style={{
          filter: "brightness(0.5)",
        }}
      />
      <div data-animate="red-heart">
        <motion.img
          src="/heart-rate/red-heart.svg"
          alt="Red Heart"
          className="absolute bottom-10 right-10 w-31 z-10"
          animate={{ scale: [0.4, 0.7, 0.4] }}
          transition={{
            duration: {
              "low-heat": 1.5,
              "on-fire": 1,
              "cardio-junkie": 0.75,
            }[condition],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="relative z-10 px-7 mt-[87px]">
        <p
          data-animate="label"
          className="text-white font-semibold text-[4.8cqi] mb-2"
        >
          Your Exercise Vibe:
        </p>
        <img
          data-animate="top-image"
          src={config.topImage}
          className="block w-full mb-7"
          alt=""
        />
        <div data-animate="message">
          <p className="text-[5.7cqi] font-everest font-light">
            You&apos;re mostly doing
          </p>
          <p className="text-[5.7cqi] font-bold leading-tight">
            {config.description}
          </p>
          {config.showExerciseText && (
            <p className="text-[5.7cqi] font-light leading-tight">exercise</p>
          )}
        </div>
        <div data-animate="motivation" className="mt-10 mr-[50px]">
          <p className="text-[3.8cqi] font-medium leading-tight whitespace-pre-line">
            {config.motivation}
          </p>
        </div>
      </div>
    </div>
  );
}
