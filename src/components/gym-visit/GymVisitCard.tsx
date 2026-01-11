"use client";

import { useEffect, useState } from "react";
import { motion, easeInOut } from "framer-motion";
import MobileCardFrame from "../MobileCardFrame";
import GymDeadliftSvg from "./GymDeadliftSvg";
import AnimatedCounter from "../steps/StepsCounter";
import { useInView } from "@/src/app/hooks/useInView";
import { useShare } from "@/src/app/hooks/useShare";

interface GymVisitCardProps {
  counter: number;
}

export default function GymVisitCard({ counter }: GymVisitCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.6 });
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [background, setBackground] = useState("");
  const share = useShare();
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
        "linear-gradient(to bottom, rgba(113,113,226,1) 35%, rgba(178,232,247,1) 35%)"
      );
    } else if (counter <= 250) {
      setTitle("Gym <br /> Bunny");
      setMessage(
        "Admit it, you train hard <br /> so you can have pizza after."
      );
      setBackground(
        "linear-gradient(to bottom, rgba(70,70,204,1) 35%, rgba(108,220,239,1) 35%)"
      );
    } else {
      setTitle("Hustle <br /> for Muscle");
      setMessage(
        "You give ‘No Days Off’ Energy. <br /> Be honest, the PT is your bestie!"
      );
      setBackground(
        "linear-gradient(to bottom, rgba(41,41,155,1) 35%, rgba(23,209,229,1) 35%)"
      );
    }
  }, [counter]);

  return (
    <div ref={ref}>
      <MobileCardFrame
        background={background}
        onShare={() =>
          share({
            title: "Gym Visit Result",
            text: `I went to the gym ${counter} times 💪`,
          })
        }
        ornaments={
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img
              src="/gym-visit/triangle.svg"
              alt=""
              className="absolute top-0 left-0 w-full h-[50%] object-cover"
              initial={{ y: 60, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
              transition={{
                duration: 0.7,
                ease: easeInOut,
              }}
            />

            <motion.img
              src="/gym-visit/triangle.svg"
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
          <div className="absolute bottom-10 right-0 w-50 h-90 z-10 overflow-visible">
            <GymDeadliftSvg />
          </div>
        }
        topContent={
          <h1
            className="text-white text-[45px] font-bold leading-none"
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
