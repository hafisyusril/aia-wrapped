"use client";

import { motion, easeInOut } from "framer-motion";
import { useInView } from "@/src/app/hooks/useInView";
import MobileCardFrame from "../MobileCardFrame";
import AnimatedCounter from "./StepsCounter";
import { getStepsConfig } from "./stepsUtils";

interface StepsCardProps {
  steps: number;
  onShare?: () => void;
}

export default function StepsCard({ steps, onShare }: StepsCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.6 });
  const config = getStepsConfig(steps);

  const leftShoe = {
    walk: {
      x: [0, 50, 80, 40, 0],
      y: [0, 10, 10, 10, 0],
      rotate: [-30, -30, 0, 0, -30],
    },
  };

  const rightShoe = {
    walk: {
      x: [0, -50, -80, -40, 0],
      y: [0, -10, -10, -10, 0],
      rotate: [0, 30, 30, 20, 0],
    },
  };

  const walkTransition = {
    duration: 1,
    repeat: Infinity,
    ease: "linear" as const,
  };

  return (
    <div ref={ref}>
      <MobileCardFrame
        background={config.background}
        onShare={onShare}
        pageName="steps"
        fileName="steps.png"
        ornaments={
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img
              src="/steps/center-line.svg"
              alt=""
              className="absolute top-[5%] left-0 w-full h-full object-cover"
              initial={{ x: -60, opacity: 0 }}
              animate={
                isInView ? { x: 0, opacity: 0.5 } : { x: -60, opacity: 0 }
              }
              transition={{
                duration: 0.6,
                ease: easeInOut,
              }}
            />
          </div>
        }
        topContent={
          <h1
            className="text-white text-[54px] font-source  font-bold leading-none"
            style={{ fontFamily: "var(--font-source-sans)" }}
            dangerouslySetInnerHTML={{ __html: config.title }}
          />
        }
        bottomContent={
          <>
            <p className="text-[20px] font-bold font-everest text-black">You walked</p>

            {isInView ? (
              <AnimatedCounter
                target={steps}
                duration={700}
                className="text-[54px] text-black font-black font-source leading-none"
                style={{ fontFamily: "var(--font-source-sans)" }}

                
              />
            ) : (
              <h2 className="text-[50px] text-black font-bold leading-none">
                0
              </h2>
            )}

            <p className="text-[24px] text-black mt-5 font-everest font-bold">
              Steps this year.
            </p>

            <p className="mt-3 text-[20px] text-black font-light leading-none">
              That’s an average of {config.averageText}
            </p>

            <p className="text-[20px] text-black font-light whitespace-pre-line leading-none">
              {config.motivation}
            </p>
          </>
        }
        illustration={
          <>
            <div className="pointer-events-none absolute bottom-20 left-10 right-10 inset-0 z-30">
              <motion.img
                src="/steps/left-shoe.svg"
                alt=""
                className="absolute bottom-2 left-12 w-[40%] h-auto object-contain"
                animate="walk"
                variants={leftShoe}
                transition={walkTransition}
              />

              <img
                src="/steps/left-line.svg"
                alt=""
                className="absolute bottom-0 left-15 w-[25%] max-w-55 h-auto object-contain"
              />

              <motion.img
                src="/steps/right-shoe.svg"
                alt=""
                className="absolute bottom-0 right-12 w-[45%] h-auto object-contain"
                animate="walk"
                variants={rightShoe}
                transition={{
                  ...walkTransition,
                }}
              />

              <img
                src="/steps/right-line.svg"
                alt=""
                className="absolute bottom-0 right-0 w-[50%] max-w-55 h-auto object-contain"
              />
            </div>
          </>
        }
      />
    </div>
  );
}
