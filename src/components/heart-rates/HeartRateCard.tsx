"use client";

import MobileCardFrame from "../MobileCardFrame";
import { heartRateConfig } from "./heartRateConfig";
import { getHeartRateCondition } from "./heartRateUtils";

export default function HeartRateCard() {
  const bpm = 10; // dummy data
  const condition = getHeartRateCondition(bpm);
  const config = heartRateConfig[condition];

  return (
    <MobileCardFrame
      background={config.background}
      ornaments={
        <img
          src="/heart-rate/abstract-background.svg"
          className="absolute -top-7 w-175 h-200 opacity-50 z-0"
          alt=""
        />
      }
      illustration={
        <img
          src="/heart-rate/red-heart.svg"
          className="absolute bottom-15 right-10 w-37.5 z-10"
          alt="Red Heart"
        />
      }
      topContent={
        <div className="h-full flex flex-col justify-end pb-3">
          <p className="text-white font-semibold text-lg mb-2">
            Your exercise vibe:
          </p>

          <img src={config.topImage} className="w-full" alt="" />
        </div>
      }
      bottomContent={
        <div className="relative text-black mt-10">
          <p className="text-2xl font-light">You're mostly doing</p>

          <p className="text-2xl font-medium leading-tight">
            {config.description}
          </p>

          {config.showExerciseText && (
            <p className="text-2xl font-light leading-tight">exercise</p>
          )}
        </div>
      }
    />
  );
}
