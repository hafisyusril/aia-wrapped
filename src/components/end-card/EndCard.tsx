"use client";

import Image from "next/image";
import { ReactNode } from "react";

type EndCardProps = {
  leftIllustration?: ReactNode;
  rightIllustration?: ReactNode;
};

export default function EndCard({
  leftIllustration,
  rightIllustration,
}: EndCardProps) {
  return (
    <div
      className="
        relative grid min-h-screen w-full max-w-[430px] mx-auto
        grid-rows-[35%_65%]
        overflow-hidden font-sans
      "
      style={{
        background: "linear-gradient(to bottom, #E60041 35%, #ffffff 35%)",
      }}
    >
      {/* ===== LOGO ===== */}
      <div className="absolute top-8 left-7.5 z-30">
        <Image
          src="/end-card/aia-logo-white.svg"
          alt="AIA Wrapped"
          width={60}
          height={32}
          priority
        />
      </div>

      {/* ===== TOP CONTENT (RED AREA) ===== */}
      <div className="relative flex flex-col justify-end px-7.5 pb-6 text-white z-20">
        <h1 className="text-4xl font-bold font-source leading-none" style={{ fontFamily: "var(--font-source-sans)" }}>
          Thank you
        </h1>

        <div className="text-base text-white mt-2">
          <p className="leading-snug">
            for living a healthier life with us in 2025.
          </p>

          <p className="mt-4 font-semibold leading-snug">
            Special perks for the first 200 members only until 6 February 2026!:
          </p>
        </div>
      </div>

      {/* ===== BOTTOM CONTENT (WHITE AREA) ===== */}
      <div className="relative flex flex-col justify-start px-7.5 pt-6 pb-28 text-gray-900 z-20">
        <p className="font-light mb-6">
          Share your AIA Vitality Wrapped in social media, tag @AIAIndonesia and get:
        </p>
        <div className="flex flex-col items-start gap-3">
          <div className="inline-flex items-center gap-2 border border-[#E60041] rounded-2xl px-4 py-1 text-sm">
            <img
              src="/end-card/sparkle-gold.svg"
              className="w-5 h-5 shrink-0"
              alt=""
            />
            <span className="leading-none whitespace-nowrap">
              50 AIA Vitality Points
            </span>
          </div>

          <div className="inline-flex items-center gap-2 border border-[#E60041] rounded-2xl px-4 py-1 text-sm">
            <img
              src="/end-card/sparkle-gold.svg"
              className="w-5 h-5 shrink-0"
              alt=""
            />
            <span className="leading-none whitespace-nowrap">
              Kopi Kenangan vouchers Rp 50.000
            </span>
          </div>
        </div>
      </div>

      {/* ===== ILLUSTRATIONS ===== */}

      <div className="absolute bottom-0 left-8 z-10 w-50 h-15">
        <img
          src="/end-card/ojk-statement.svg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <div className="absolute bottom-4 right-0 z-10 w-56 h-56">
        {/* Man with ticket */}
        <img
          src="/end-card/man-with-ticket.svg"
          alt=""
          className="absolute bottom-0 right-1 w-full h-full object-contain z-20"
        />

        {/* Mobile phone (layer depan) */}
        <img
          src="/end-card/mobile-phone.svg"
          alt=""
          className="absolute bottom-0 right-0 w-32 h-36 object-contain z-10"
        />
      </div>
    </div>
  );
}
