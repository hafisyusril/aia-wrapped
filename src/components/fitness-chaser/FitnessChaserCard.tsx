"use client";

import { motion, easeInOut } from "framer-motion";
import { useInView } from "@/src/app/hooks/useInView";
import MobileCardFrame from "../MobileCardFrame";
import AnimatedCounter from "../steps/StepsCounter";
import WomanRedSvg from "./WomanRedSvg";
import { getFitnessChaserConfig } from "./getFitnessChaserConfig";

interface FitnessChaserCardProps {
  totalChallenges: number;
  onShare?: () => void;
}

export default function FitnessChaserCard({
  totalChallenges,
  onShare,
}: FitnessChaserCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.6 });
  const config = getFitnessChaserConfig(totalChallenges);

  return (
    <div ref={ref}>
      <MobileCardFrame
        background={config.background}
        fileName="fitness-chaser.png"
        pageName={"fitness"}
        curtainColor={config.background.match(/#[0-9A-Fa-f]{6}/)?.[0] ?? "#000"}
        onShare={onShare}
        ornaments={
          <div className="absolute inset-0 flex flex-col overflow-hidden">
            {[...Array(4)].map((_, i) => {
              return (
                <motion.img
                  key={i}
                  src="/fitness-chaser/oval.svg"
                  alt=""
                  className="flex-1 w-full object-cover transform-gpu"
                  style={{
                    filter: 'brightness(0)',
                  }}
                  initial={{
                    translateY: "100%",
                    opacity: 0,
                  }}
                  whileInView={{
                    translateY: "0%", opacity: 0.15
                  }}
                  viewport={{
                    once: true
                  }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              );
            })}
          </div>
        }
        illustration={
          <div className="absolute bottom-10 -right-3.75 w-75 h-65 z-10">
            <WomanRedSvg progress={config.progress}/>
          </div>
        }
        topContent={
          <h1
            className=" font-bold text-white text-[54px] font-source whitespace-pre-line leading-none"
            style={{ fontFamily: "var(--font-source-sans)" }}
          >
            {config.title}
          </h1>
        }
        bottomContent={
          <>
            <p className="text-[20px] text-black">You finished</p>

            {isInView ? (
              <AnimatedCounter
                target={totalChallenges}
                duration={700}
                className="text-[50px] text-black font-bold font-source leading-none"
                style={{ fontFamily: "var(--font-source-sans)" }}

              />
            ) : (
              <h2 className="text-[50px] text-black font-bold leading-none">
                0
              </h2>
            )}

            <p className="text-[25px] text-black font-everest font-semibold">
              Weekly Challenges!
            </p>

            {/* <p className="mt-2 text-[18px] text-black font-light">
              Your superpower = consistency!
            </p>  */}
            <p className="mt-2 text-[16px] text-black font-medium whitespace-pre-line leading-tight">
              {config.description}
            </p>
          </>
        }
      />
    </div>
  );
}
