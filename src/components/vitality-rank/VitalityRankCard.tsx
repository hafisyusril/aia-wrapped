"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
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

  // Kontrol dipisah agar manajemen animasi lebih granular
  const [hasAnimated, setHasAnimated] = useState(false);
  const bgControls = useAnimation();
  const textTopControls = useAnimation();
  const trophyControls = useAnimation();
  const bottomContentControls = useAnimation();

  useEffect(() => {
    const runAnimations = async () => {
      // Syarat: masuk viewport DAN belum pernah animasi sebelumnya
      if (isInView && !hasAnimated) {
        setHasAnimated(true); // Kunci agar tidak jalan lagi

        // 1. Animasi Tirai (Background #AE002F naik)
        await bgControls.start({
          height: "35%",
          transition: { duration: 0.8, ease: [0.45, 0, 0.55, 1] },
        });

        // 2. Teks dari Kiri & Trophy dari Kanan (Berjalan barengan)
        await Promise.all([
          textTopControls.start({
            x: 0,
            opacity: 1,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }),
          trophyControls.start({
            x: 0,
            opacity: 1,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }),
        ]);

        // 3. Bottom Content muncul staggered
        await bottomContentControls.start((i: number) => ({
          y: 0,
          opacity: 1,
          transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
        }));
      }
    };

    runAnimations();
  }, [
    isInView,
    bgControls,
    textTopControls,
    trophyControls,
    bottomContentControls,
  ]);

  return (
    <section
      ref={ref}
      className="@container relative w-full max-w-[430px] mx-auto min-h-screen overflow-hidden font-sans bg-[#EA0F4A]"
    >
      {/* Background Layer Tirai */}
      <motion.div
        initial={{ height: "100%" }}
        animate={bgControls}
        className="absolute top-0 left-0 w-full bg-[#AE002F] z-0"
      />

      <div className="relative z-10 grid grid-rows-[35vh_65vh] h-screen w-full">
        {/* TOP CONTENT (35%) */}
        <div className="flex items-end justify-between px-6">
          {/* TEKS: Masuk dari Kiri ke Posisi Asli */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={textTopControls}
          >
            <h1 className="text-[7.5cqi] font-bold leading-tight pb-[18px] text-white font-source">
              AIA Vitality
              <br />
              Member Rank
            </h1>
          </motion.div>

          {/* TROPHY: Masuk dari Kanan ke Posisi Asli */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ x: 100, opacity: 0 }}
            animate={trophyControls}
          >
            {/* Aura Glowing (Pulsing) */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-[100px] h-[100px] bg-yellow-300 rounded-full blur-[35px] z-0"
            />

            <motion.img
              src={theme.trophySrc}
              alt="Trophy"
              className="w-[160px] h-auto relative z-10"
              animate={{
                filter: [
                  "drop-shadow(0 0 8px rgba(255, 223, 0, 0.4))",
                  "drop-shadow(0 0 20px rgba(255, 223, 0, 0.7))",
                  "drop-shadow(0 0 8px rgba(255, 223, 0, 0.4))",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        {/* BOTTOM CONTENT (65%) */}
        <div className="flex flex-col gap-10 px-6 pt-12">
          {[
            { label: "General Rank", val: generalRank },
            { label: "Gender Rank", val: genderRank },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              initial={{ y: -30, opacity: 0 }}
              animate={bottomContentControls}
            >
              <p className="text-[4.8cqi] font-medium text-white/90">
                {item.label}
              </p>
              <div className="flex items-center text-white text-[18.7cqi]">
                <span className="leading-none font-thin">#</span>
                <span className="leading-none font-black">
                  {isInView ? <RankCounter target={item.val} /> : "0"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ShareButton onClick={onShare} />
    </section>
  );
}
