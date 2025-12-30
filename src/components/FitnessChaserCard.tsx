"use client";

import MobileCardFrame from "./MobileCardFrame";

export default function WeeklyChallengeCard() {
  return (
    <MobileCardFrame
      background="linear-gradient(to bottom, #f9572b 35%, #bcf7c6 35%)"
      ornaments={
        <div className="absolute -top-[90px] left-0 flex flex-col">
          {[...Array(4)].map((_, i) => (
            <img
              key={i}
              src="/fitness-chaser/oval.svg"
              className={`w-full h-[350px] ${i !== 0 ? "-mt-[176px]" : ""}`}
            />
          ))}
        </div>
      }
      illustration={
        <img
          src="/fitness-chaser/woman-red.svg"
          className="absolute bottom-[40px] right-[-15px] w-[300px] h-[220px] z-10"
        />
      }
      topContent={
        <h1 className="text-white text-[50px] font-bold leading-tight">
          Fitness <br /> Chaser
        </h1>
      }
      bottomContent={
        <>
          <p className="text-[20px] text-black">You finished</p>
          <h2 className="text-[50px] text-black font-bold leading-none">27</h2>
          <p className="text-[20px] text-black font-semibold">Weekly Challenges!</p>
          <p className="mt-2 text-[18px] text-black font-light">
            Your superpower = consistency!
          </p>
        </>
      }
    />
  );
}
