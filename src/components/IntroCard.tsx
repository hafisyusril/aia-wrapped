"use client";

import { motion } from "framer-motion";

export default function IntroCard() {
  return (
    <section className="relative w-full max-w-107.5 min-h-svh mx-auto overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <BackgroundTrapesium />

      {/* ================= HEADER ================= */}
      <HeaderContent />

      {/* ================= CENTER FRAME ================= */}
      <CenterFrame />
    </section>
  );
}

/* ================================================= */
/* ================= COMPONENTS ==================== */
/* ================================================= */

function BackgroundTrapesium() {
  return (
    <>
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
        className="absolute left-0 top-[-5.5%] h-[108%] w-17.5 object-cover"
        alt=""
      />
      <img
        src="/intro/trapesium-right.svg"
        className="absolute right-0 top-[-5.5%] h-[108%] w-17.5 object-cover"
        alt=""
      />
    </>
  );
}

function HeaderContent() {
  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 text-center">
      <motion.img
        src="/intro/aia-vitality-wrapped.svg"
        className="w-55"
        alt="AIA Vitality Wrapped"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      <div className="leading-tight text-sm">
        <p>Hi, AIA Vitality Members!</p>
        <p>Ready to check</p>
        <p>your AIA Vitality Wrapped 2025?</p>
      </div>
    </div>
  );
}

function CenterFrame() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div className="relative w-full max-w-72 aspect-3/5 h-[50svh] translate-y-30">
        {/* FRAME */}
        <div className="relative w-full h-full border border-[rgba(211,17,69,1)]">
          {/* DOTS */}
          <span className="dot -top-2 -left-2" />
          <span className="dot -top-2 -right-2" />
          <span className="dot -bottom-2 -left-2" />
          <span className="dot -bottom-2 -right-2" />

          {/* CONTENT */}
          <div className="relative w-full h-full overflow-hidden flex justify-center">
            <Artboard />
          </div>
        </div>
      </div>
    </div>
  );
}

function Artboard() {
  return (
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
      <img
        src="/heart-rate/red-heart.svg"
        className="absolute top-2 right-3 w-25 rotate-20"
      />
      <img
        src="/reward-redeem/women-gold.svg"
        className="absolute left-1 top-1 w-50 h-60"
      />
      <img
        src="/gym-visit/gym-visit-deadlift.svg"
        className="absolute bottom-4 left-1 w-50"
      />
      <img
        src="/reward-redeem/gold-coin.svg"
        className="absolute bottom-15 left-1 w-23"
      />
      <img
        src="/intro/check-inside-love.svg"
        className="absolute top-1 right-30 w-20"
      />
      <img
        src="/intro/wrapped-woman-red.svg"
        className="absolute bottom-4 right-1 w-42"
      />
      <img src="/intro/shoe.svg" className="absolute top-40 right-0 w-35" />
    </div>
  );
}
