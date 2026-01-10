"use client";

import { motion, easeInOut } from "framer-motion";
import { useInView } from "@/src/app/hooks/useInView";
import MobileCardFrame from "../MobileCardFrame";
import AnimatedCounter from "../steps/StepsCounter";
import WomanRedSvg from "./WomanRedSvg";

interface FitnessChaserCardProps {
  totalChallenges: number;
}

export default function FitnessChaserCard({
  totalChallenges,
}: FitnessChaserCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.6 });

  return (
    <div ref={ref}>
      <MobileCardFrame
        background="linear-gradient(to bottom, #f9572b 35%, #bcf7c6 35%)"
        ornaments={
          <div className="absolute inset-0 flex flex-col overflow-hidden">
            {[...Array(4)].map((_, i) => {
              const fromRight = i % 2 === 0;

              return (
                <motion.img
                  key={i}
                  src="/fitness-chaser/oval.svg"
                  alt=""
                  className={`flex-1 w-full object-cover transform-gpu ${fromRight ? "origin-right" : "origin-left"}`}
                  initial={{
                    scaleX: 0,
                    opacity: 0,
                  }}
                  animate={
                    isInView
                      ? { scaleX: 1, opacity: 1 }
                      : { scaleX: 0, opacity: 0 }
                  }
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
            <WomanRedSvg />
          </div>
        }
        topContent={
          <h1 className="text-white text-[50px] font-bold leading-none">
            Fitness <br /> Chaser
          </h1>
        }
        bottomContent={
          <>
            <p className="text-[20px] text-black">You finished</p>

            {isInView ? (
              <AnimatedCounter
                target={totalChallenges}
                duration={700}
                className="text-[50px] text-black font-bold leading-none"
              />
            ) : (
              <h2 className="text-[50px] text-black font-bold leading-none">
                0
              </h2>
            )}

            <p className="text-[20px] text-black font-semibold">
              Weekly Challenges!
            </p>

            <p className="mt-2 text-[18px] text-black font-light">
              Your superpower = consistency!
            </p>
          </>
        }
      />
    </div>
  );
}
