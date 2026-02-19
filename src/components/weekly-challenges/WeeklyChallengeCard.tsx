"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "@/src/app/hooks/useInView";
import AnimatedCounter from "../steps/StepsCounter";
import { getWeeklyChallengeByVariant } from "./WeeklyChallengeConfig";
import ShareButton from "../ShareButton";

interface WeeklyChallengeCardProps {
  totalReward: number;
  vitalityId: string;
  pageName?: string;
  onShare?: () => void;
  isReady?: boolean;
}

type RewardStatus =
  | "Normal (Earn & Redeem)"
  | "Apple Watch Challenge"
  | "Never Redeem"
  | null;

interface WeeklyChallengeApiResponse {
  message: string;
  data: {
    favorite_rewards: string;
    [key: string]: any;
  };
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
      delay: 1 + i * 0.1,
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
  vitalityId,
  pageName,
  onShare,
  isReady = true,
}: WeeklyChallengeCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.6 });
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [favoriteReward, setFavoriteReward] = useState<string | null>(null);
  const [isAllowShare, setIsAllowShare] = useState(false);
  const [rewardStatus, setRewardStatus] = useState<RewardStatus>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // --- Fetch API berdasarkan vitalityId ---
  useEffect(() => {
    async function fetchWeeklyChallenge() {
      try {
        const res = await fetch(`/api/v1/vitality/${vitalityId}`);
        const data: WeeklyChallengeApiResponse = await res.json();
        setFavoriteReward(data.data.favorite_rewards);
        setRewardStatus(data.data.rewards_status);
      } catch (error) {
        console.error("Failed to fetch weekly challenge:", error);
      }
    }

    if (vitalityId) {
      fetchWeeklyChallenge();
    }
  }, [vitalityId]);

  const {
    background,
    headerBackground,
    illustrationSrc,
    coinSrc,
    currency,
    title,
    message,
  } = getWeeklyChallengeByVariant("default");

  // Ganti <strong>Tokopedia</strong> dengan data dari API
  const dynamicMessage = message.map((line) =>
    line.replace(
      "<strong>Tokopedia</strong>",
      favoriteReward
        ? `<strong>${favoriteReward.replace("Grand Lucky", "GrandLucky")}</strong>`
        : "<strong>Loading...</strong>",
    ),
  );

  const shouldAnimate = hasAnimated;

  return (
    <section
      ref={ref}
      className={`
    @container
    relative
    w-full
    max-w-[430px]
    mx-auto
    min-h-dvh
    grid
    grid-rows-[40%_65%]
    overflow-hidden
    font-sans
    ${headerBackground}
  `}
    >
      {/* 1. HEADER BACKGROUND */}

      {/* 2. ANIMASI COIN */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.img
              key={i}
              src={coinSrc}
              alt="Coin"
              className="absolute w-[60px] h-auto"
              custom={i}
              variants={coinVariants}
              initial="initial"
              animate={shouldAnimate ? ["visible", "floating"] : "initial"}
              style={{
                left: `${15 + i * 30}%`,
                top: `${64 + (i % 2) * 5}%`,
              }}
            />
          ))}
        </div>
      )}

      {/* 3. CONTENT TOP */}
      <div className="px-8 pb-6 flex flex-col  justify-end">
        <div className="text-white">
          <div className="flex items-center justify-between">
            <motion.p
              variants={textVariant}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              custom={0.5}
              className="text-[4.8cqi] font-everest font-medium"
            >
              Total Rewards Earned:
            </motion.p>
            <ShareButton
              pageName={pageName}
              onClick={onShare}
              isReady={isReady}
              viewport={{
                amount: "all",
                once: true,
              }}
              style={{
                pointerEvents: isAllowShare ? "auto" : "none",
                cursor: isAllowShare ? "pointer" : "default",
              }}
              onViewportEnter={() => {
                setTimeout(() => setIsAllowShare(true), 2000);
              }}
            />
          </div>

          <div className="flex items-end space-x-2 mt-2">
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
            className="text-[4.8cqi] font-medium whitespace-pre-line leading-tight mt-2"
          >
            {title}
          </motion.p>
        </div>
      </div>

      {/* 4. CONTENT BOTTOM */}
      <motion.div
        className={`px-8 flex flex-col justify-between ${background}`}
        initial={{
          y: "100%",
        }}
        animate={{
          y: shouldAnimate ? "0%" : "100%",
        }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative z-50 text-black text-[4.8cqi] font-medium leading-relaxed whitespace-pre-line">
          {rewardStatus === "Apple Watch Challenge" ||
          rewardStatus === "Never Redeem" ? (
            <motion.div
              variants={textVariant}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              className="mt-5"
              custom={2}
            >
              {rewardStatus === "Apple Watch Challenge" ? (
                <p className="text-sm">
                  Extra rewards from special campaigns aren&apos;t shown here,
                  but your Apple Watch Challenge rewards counts. Keep going!
                </p>
              ) : (
                <>
                  <p>No rewards redeemed just yet.</p>
                  <p>Let&apos;s go for it next time!</p>
                </>
              )}
            </motion.div>
          ) : (
            dynamicMessage.map((line, index) => (
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
            ))
          )}
        </div>

        <motion.div
          className="pb-16"
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
            className="w-[245px] h-[210px]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
