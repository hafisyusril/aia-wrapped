"use client";

import { useInView } from "@/src/app/hooks/useInView";
import MobileCardFrame from "../MobileCardFrame";
import AnimatedCounter from "./StepsCounter";
import { getStepsConfig } from "./stepsUtils";

interface StepsCardProps {
  steps: number;
}

export default function StepsCard({ steps }: StepsCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.6 });
  const config = getStepsConfig(steps);

  return (
    <div ref={ref}>
      <MobileCardFrame
        background={config.background}
        ornaments={
          <div className="absolute inset-0 z-0">
            <img
              src="/steps/center-line.svg"
              className="absolute top-[5%] left-0 w-full h-full object-cover opacity-50"
              alt=""
            />
          </div>
        }
        topContent={
          <h1
            className="text-white text-[50px] font-bold leading-tight"
            dangerouslySetInnerHTML={{ __html: config.title }}
          />
        }
        bottomContent={
          <>
            <p className="text-[20px] text-black">You walked</p>

            {isInView ? (
              <AnimatedCounter
                target={steps}
                duration={700}
                className="text-[50px] text-black font-bold leading-none"
              />
            ) : (
              <h2 className="text-[50px] text-black font-bold leading-none">0</h2>
            )}

            <p className="text-[20px] text-black font-semibold">Steps this year.</p>
            <p className="mt-3 text-[18px] text-black font-light">That’s an average of</p>
            <p className="text-[18px] text-black font-light">{config.averageText}</p>
            <p className="text-[18px] text-black font-light">{config.motivation}</p>
          </>
        }
        illustration={
          <>
            <div className="pointer-events-none absolute bottom-35 left-10 right-10 inset-0 z-30">
              <img
                src="/steps/left-shoe.svg"
                alt=""
                className="absolute bottom-0 left-0 w-[45%] max-w-55 h-auto object-contain"
              />
              <img
                src="/steps/left-line.svg"
                alt=""
                className="absolute bottom-0 left-15 w-[25%] max-w-55 h-auto object-contain"
              />
              <img
                src="/steps/right-shoe.svg"
                alt=""
                className="absolute bottom-0 right-0 w-[45%] max-w-55 h-auto object-contain"
              />
              <img
                src="/steps/right-line.svg"
                alt=""
                className="absolute bottom-0 right-0 w-[50%] max-w-55 h-auto object-contain"
              />
            </div>

            <div className="absolute bottom-[3%] left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 opacity-80">
              <img src="/steps/scroll.svg" alt="Scroll" className="w-4 h-4" />
              <p className="text-xl text-black font-normal tracking-wide">scroll</p>
            </div>
          </>
        }
      />
    </div>
  );
}
