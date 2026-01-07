"use client";

import MobileCardFrame from "../MobileCardFrame";
import WomanRedSvg from "./WomanRedSvg";

interface FitnessChaserCardProps {
  totalChallenges: number;
}

export default function FitnessChaserCard({ totalChallenges }: FitnessChaserCardProps) {
  return (
    <MobileCardFrame
      background="linear-gradient(to bottom, #f9572b 35%, #bcf7c6 35%)"
      ornaments={
        <div className="absolute inset-0 flex flex-col">
          {[...Array(4)].map((_, i) => (
            <img
              key={i}
              src="/fitness-chaser/oval.svg"
              className="flex-1 w-full object-cover"
              alt=""
            />
          ))}
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
          <h2 className="text-[50px] text-black font-bold leading-none">{totalChallenges}</h2>
          <p className="text-[20px] text-black font-semibold">
            Weekly Challenges!
          </p>
          <p className="mt-2 text-[18px] text-black font-light">
            Your superpower = consistency!
          </p>
        </>
      }
    />
  );
}
