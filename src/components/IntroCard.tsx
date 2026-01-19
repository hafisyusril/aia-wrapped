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
      <div className="relative translate-y-48">
        <Artboard />
      </div>
    </div>
  );
}

function Artboard() {
  return (
    <div
      className="
        relative
        origin-top
        scale-[0.75]
        min-[390px]:scale-[0.85]
        min-[430px]:scale-100
      "
    >
      {/* ===== WHITE CANVAS + FRAME ===== */}
      <div className="relative w-[300px] h-[450px] bg-white border border-[rgba(211,17,69,1)]">
        {/* DOTS */}
        <span className="dot absolute -top-2 -left-2" />
        <span className="dot absolute -top-2 -right-2" />
        <span className="dot absolute -bottom-2 -left-2" />
        <span className="dot absolute -bottom-2 -right-2" />

        {/* ===== ILLUSTRATIONS ===== */}
        <img
          src="/heart-rate/red-heart.svg"
          className="absolute top-10 right-3 w-20 rotate-20"
          alt=""
        />
        <img
          src="/reward-redeem/women-gold.svg"
          className="absolute left-1 top-1 w-50 h-60"
          alt=""
        />
        <img
          src="/gym-visit/gym-visit-deadlift.svg"
          className="absolute bottom-4 left-1 w-50"
          alt=""
        />
        <img
          src="/reward-redeem/gold-coin.svg"
          className="absolute bottom-15 left-1 w-23"
          alt=""
        />
        <img
          src="/intro/check-inside-love.svg"
          className="absolute top-10 right-22 w-15"
          alt=""
        />
        <img
          src="/intro/wrapped-woman-red.svg"
          className="absolute bottom-4 right-1 w-42"
          alt=""
        />
        <img
          src="/intro/shoe.svg"
          className="absolute top-40 right-0 w-35"
          alt=""
        />
      </div>
    </div>
  );
}
