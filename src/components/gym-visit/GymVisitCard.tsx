"use client";

import { useEffect, useState } from "react";
import { motion, easeInOut } from "framer-motion";
import MobileCardFrame from "../MobileCardFrame";
import GymDeadliftSvg from "./GymDeadliftSvg";
import AnimatedCounter from "../steps/StepsCounter";
import { useInView } from "@/src/app/hooks/useInView";
import Weightlifter from "./Weightlifter";

interface GymVisitCardProps {
  counter: number;
  onShare: () => void;
}

export default function GymVisitCard({ counter, onShare }: GymVisitCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.6 });
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [background, setBackground] = useState("");
  useEffect(() => {
    if (counter <= 50) {
      setTitle("Energy-Saving <br /> Mode");
      setMessage(
        "Sometimes leg day, sometimes abs day. <br /> Most times, rest days."
      );
      setBackground("linear-gradient(to bottom, #9393f9 35%, #d7f5ff 35%)");
    } else if (counter <= 150) {
      setTitle("Serious <br /> Bodybuilder");
      setMessage(
        "Solid habit. You clearly not just hit <br /> the gym for mirror selfies."
      );
      setBackground(
        "linear-gradient(to bottom, #7171E2 35%, #B2E8F7 35%)"
      );
    } else if (counter <= 250) {
      setTitle("Gym <br /> Bunny");
      setMessage(
        "Admit it, you train hard <br /> so you can have pizza after."
      );
      setBackground(
        "linear-gradient(to bottom, #B2E8F7 35%, #8CEAF4 35%)"
      );
    } else {
      setTitle("Hustle <br /> for Muscle");
      setMessage(
        "You give ‘No Days Off’ Energy. <br /> Be honest, the PT is your bestie!"
      );
      setBackground(
        "linear-gradient(to bottom, #29299B 35%, #4ADEE5 35%)"
      );
    }
  }, [counter]);

  // Ambil warna HEX pertama yang ditemukan dalam string background
const curtainColor = background.match(/#[0-9A-Fa-f]{6}/)?.[0] ?? "#000";

  return (
    <div ref={ref}>
      <MobileCardFrame
        background={background}
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
              animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
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
              animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
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
            <Weightlifter width={154} height={185} />
          </div>
          // <div className="absolute bottom-12 right-0 w-50 h-auto z-10 pointer-events-none">
          //   <img
          //     src="/gym-visit/deadlift.gif"
          //     alt=""
          //     className="w-full h-auto"
          //   />
          // </div>
        }
        topContent={
          <h1
            className="text-white text-[45px] font-bold leading-none"
            style={{ fontFamily: "var(--font-source-sans)" }}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        }
        bottomContent={
          <>
            <p className="text-[20px] text-black">You went to gym partner</p>

            {isInView ? (
              <AnimatedCounter
                target={counter}
                duration={700}
                className="text-[50px] text-black font-bold leading-none"
              />
            ) : (
              <h2 className="text-[50px] text-black font-bold leading-none">
                0
              </h2>
            )}

            <p className="text-[20px] font-medium text-black">times</p>

            <p
              className="mt-4 text-[15px] text-black"
              dangerouslySetInnerHTML={{ __html: message }}
            />
          </>
        }
      />
    </div>
  );
}
