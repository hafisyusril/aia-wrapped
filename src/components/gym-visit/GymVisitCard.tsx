"use client";

import { useInView } from "@/src/app/hooks/useInView";
import { easeInOut, motion } from "framer-motion";
import MobileCardFrame from "../MobileCardFrame";
import AnimatedCounter from "../steps/StepsCounter";
import Weightlifter from "./Weightlifter";
import { getGymVisitConfig } from "./gymVisitUtils";

interface GymVisitCardProps {
  counter: number;
  onShare: () => void;
}

export default function GymVisitCard({ counter, onShare }: GymVisitCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.6 });

  const config = getGymVisitConfig(counter);

  // Ambil warna HEX pertama yang ditemukan dalam string background
  const curtainColor = config.background.match(/#[0-9A-Fa-f]{6}/)?.[0] ?? "#000";


  return (
    <div ref={ref}>
      <MobileCardFrame
        background={config.background}
        onShare={onShare}
        pageName={"gym-visit"}
        curtainColor={curtainColor}
        fileName="gym-visit.png"
        ornaments={
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img
              src="/gym-visit/triangle-1.svg"
              alt=""
              className="absolute top-0 left-0 w-full  h-[50%] object-cover"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                ease: easeInOut,
              }}
            />

            <motion.img
              src="/gym-visit/triangle-1.svg"
              alt=""
              className="absolute bottom-0 left-0 w-full h-[50%] object-cover"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: easeInOut,
              }}
            />
          </div>
        }
        illustration={
          <div className="absolute bottom-17.5 right-8 z-10 pointer-events-none">
            <Weightlifter width={154} height={185} speed={config.speed} />
          </div>
        }
        topContent={
          <h1
            className="text-white text-[10.5cqi] font-bold leading-none"
            style={{ fontFamily: "var(--font-source-sans)" }}
            dangerouslySetInnerHTML={{ __html: config.title }}
          />
        }
        bottomContent={
          <>
            <p className="text-[4.8cqi] text-black">You went to gym partner</p>

            {isInView ? (
              <AnimatedCounter
                target={counter}
                duration={700}
                className="text-[11.8cqi] text-black font-bold leading-none"
              />
            ) : (
              <h2 className="text-[11.8cqi] text-black font-bold leading-none">
                0
              </h2>
            )}

            <p className="text-[4.8cqi] font-medium text-black">times</p>

            <p
              className="mt-4 text-[3.9cqi] font-medium text-black"
              dangerouslySetInnerHTML={{ __html: config.message }}
            />
          </>
        }
      />
    </div>
  );
}
