"use client";

import { motion } from "framer-motion";

export default function IntroCard() {
  return (
    <div className="w-full max-w-107.5 min-h-svh mx-auto relative overflow-hidden">
      <img
        src="/intro/trapesium-top.svg"
        className="absolute top-0 left-0 w-full h-80 object-cover"
        alt=""
      />
      <img
        src="/intro/trapesium-bot.svg"
        className="absolute bottom-0 left-0 w-full h-12 object-cover"
        alt=""
      />
      <img
        src="/intro/trapesium-left.svg"
        className="absolute 
    left-0 
    top-[-5.5%] 
    h-[108%] 
    w-17.5 
    object-cover"
        alt=""
      />
      <img
        src="/intro/trapesium-right.svg"
        className="absolute 
    right-0 
    top-[-5.5%] 
    h-[108%] 
    w-17.5 
    object-cover"
        alt=""
      />

      <div className="absolute inset-15 flex flex-col items-center justify-start gap-6">
        <motion.img
          src="/intro/aia-vitality-wrapped.svg"
          className="w-55"
          alt="AIA Vitality Wrapped"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        />

        {/* <div className="">
        <p>Hi, AIA Vitality Members!</p>
        <p>Ready to check</p>
        <p>your AIA Vitality Wrapped 2025?</p>
        </div> */}

        {/* Center Content group */}
        <div className="relative w-full max-w-72 aspect-3/5 h-[50svh]  flex justify-center mt-10">
          {/* FRAME */}
          <div className="relative w-full h-full translate-y-30 rounded-none border border-[rgba(211,17,69,1)]">
            {/* DOTS */}
            <span className="dot -top-2 -left-2" />
            <span className="dot -top-2 -right-2" />
            <span className="dot -bottom-2 -left-2" />
            <span className="dot -bottom-2 -right-2" />

            {/* CONTENT */}
            <div className="relative w-full h-full overflow-hidden flex justify-center">
              {/* ARTBOARD SCALE WRAPPER */}
              <div
                className="
    relative
    w-[340px]
    h-[450px]
    origin-top
    scale-[0.75]
    min-[390px]:scale-[0.85]
    min-[430px]:scale-100
  "
              >
                {/* semua image kamu taruh DI SINI */}
                <img
                  src="/heart-rate/red-heart.svg"
                  className="absolute top-2 right-3 w-25 rotate-20"
                  alt=""
                />
                <img
                  src="/reward-redeem/women-gold.svg"
                  className="absolute left-1 top-1 w-50 h-60"
                  alt=""
                />
                <img
                  src="/gym-visit/gym-visit-deadlift.svg"
                  className="absolute bottom-4 w-50 left-1"
                  alt=""
                />
                <img
                  src="/reward-redeem/gold-coin.svg"
                  className="absolute bottom-15 left-1 w-23"
                  alt=""
                />
                <img
                  src="/intro/check-inside-love.svg"
                  className="absolute top-1 right-30 w-20"
                  alt=""
                />
                <img
                  src="/intro/wrapped-woman-red.svg"
                  className="absolute w-42 bottom-4 right-1"
                  alt=""
                />
                <img
                  src="/intro/shoe.svg"
                  className="absolute top-40 right-0 w-35"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  {
    /* Center Content group */
  }
}
