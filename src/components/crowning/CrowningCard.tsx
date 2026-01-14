"use client";

import { CrowningType } from "./CrowningConfig";
import { getCrowningByType } from "./CrowningUtils";
import ShareButton from "../ShareButton";
import { motion } from "framer-motion";

interface CrowningCardProps {
  type: CrowningType;
  onShare?: () => void;
}

export default function CrowningCard({ type, onShare }: CrowningCardProps) {
  const {
    titleLine1,
    titleLine2,
    description,
    themeColor,
    illustrationSrc,
    sparkleSvg,
    sparkles,
  } = getCrowningByType(type);

  return (
    <div className="w-full min-h-screen bg-white font-sans flex flex-col">
      {/* HEADER */}
      <div className="px-6 pt-8 pb-4 bg-gray-100 flex items-center justify-between">
        <img
          src="/crowning/aia_vitality.svg"
          alt="AIA Vitality Wrapped"
          width={60}
          height={60}
          className="object-contain w-20 sm:w-40 md:w-48"
        />

        {/* PASANG isBrightBg={true} karena bg utama section putih */}
        {onShare && <ShareButton onClick={onShare} isBrightBg={true} />}
      </div>

      {/* ILLUSTRATION */}
      <div className="relative flex-1 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={illustrationSrc}
          alt={`${titleLine1} ${titleLine2}`}
          width={400}
          height={400}
          className="object-contain z-10 drop-shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg px-8"
        />
        {/* SPARKLES */}
        {sparkles.map((s, i) => {
          const { size, delay, duration, ...position } = s;

          return (
            <motion.img
              key={i}
              src={sparkleSvg}
              alt=""
              className={`absolute ${size} z-20 pointer-events-none`}
              style={{
                ...position,
                filter: "drop-shadow(0 0 8px rgba(0, 212, 251, 0.9))",
              }}
              animate={{
                scale: [0.6, 1.4, 0.6],
                opacity: [0.3, 1, 0.3],
                rotate: [0, 20, -20, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

        <div className="absolute bottom-20 left-0 right-0 h-24 sm:h-32 md:h-40">
          <div
            className="absolute bottom-0 w-full h-40 bg-white"
            style={{
              borderRadius: "100% / 40% 40% 0 0",
              transform: "translateY(50%)",
            }}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 sm:px-8 pt-10 pb-12">
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          Your Vitality Type
        </p>

        <p
          className={`text-2xl sm:text-6xl md:text-7xl font-bold ${themeColor} leading-none`}
        >
          {titleLine1}
        </p>
        <p
          className={`mt-3 text-5xl sm:text-6xl md:text-7xl font-bold ${themeColor} leading-none`}
        >
          {titleLine2}
        </p>

        <p className="mt-8 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>

      {/* FOOTER */}
      <div className="px-6 sm:px-8 pb-10 border-t border-gray-200 pt-6">
        <p className="text-xs sm:text-sm text-gray-500">aia-financial.co.id</p>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          PT AIA Financial berizin dan diawasi oleh Otoritas Jasa Keuangan
        </p>
      </div>
    </div>
  );
}
