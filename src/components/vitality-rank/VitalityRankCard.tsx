"use client";

import { motion } from "framer-motion";
import { useInView } from "@/src/app/hooks/useInView";
import { getVitalityRankTheme } from "./VitalityRankConfig";
import RankCounter from "./RankCounter";
import ShareButton from "../ShareButton";

interface VitalityRankCardProps {
  generalRank: number;
  genderRank: number;
  onShare?: () => void;
}

export default function VitalityRankCard({
  generalRank,
  genderRank,
  onShare,
}: VitalityRankCardProps) {
  const theme = getVitalityRankTheme("default");
  const { ref, isInView } = useInView({ threshold: 0.6 });

  return (
    <section
      className={`w-full max-w-[430px] mx-auto min-h-screen font-sans relative overflow-hidden ${theme.backgroundColor}`}
    >
      <motion.img
        src={theme.ornamentSrc}
        alt="Vitality Ornament"
        className="absolute inset-0 h-full object-cover opacity-80 pointer-events-none z-0"
        initial={{
          x: -120,
          y: 120,
          scale: 0.1,
          rotate: -15,
          opacity: 0.5,
        }}
        whileInView={{
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 0.8,
        }}
        transition={{
          duration: 2,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true }}
      />

      <div
        className={`
          absolute inset-y-0 right-0 w-[120px]
          opacity-60 pointer-events-none z-0
          ${theme.sideAccentColor}
        `}
      />

      <ShareButton onClick={onShare} />

      <div
        ref={ref}
        className="relative z-10 flex min-h-screen items-center px-6"
      >
        <div className="flex w-full flex-col py-12">
          <div className="mb- flex items-start justify-between">
            <div className="pt-20">
              <h1
                className="text-[32px] font-extrabold font-source leading-tight text-white"
                style={{ fontFamily: "var(--font-source-sans)" }}
              >
                AIA Vitality
                <br />
                Member Rank
              </h1>
            </div>

            <img
              src={theme.trophySrc}
              alt="Trophy"
              width={180}
              height={200}
              className="mt-2 "
            />
          </div>

          <div className="mb-16 h-[2px] w-24 bg-white/70" />

          <div className="flex flex-col gap-10">
            <div>
              <p className="text-[20px] font-medium text-white">General Rank</p>
              <div className="flex items-start  text-white font-extrabold">
                <span className="text-[32px] mt-1">#</span>
                <span className="text-[100px] leading-none font-source" style={{ fontFamily: "var(--font-source-sans)" }}>
                  {isInView ? (
                    <RankCounter key="general-rank" target={generalRank}  />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[20px] font-medium text-white">Gender Rank</p>
              <div className="flex items-start text-white font-extrabold">
                <span className="text-[32px] mt-1">#</span>
                <span className="text-[100px] leading-none font-source" style={{ fontFamily: "var(--font-source-sans)" }}>
                  {isInView ? (
                    <RankCounter key="gender-rank" target={genderRank} />
                  ) : (
                    "0"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
