"use client";

import { CrowningType } from "./CrowningConfig";
import { getCrowningByType } from "./CrowningUtils";
import ShareButton from "../ShareButton";
import { motion, useAnimate, useInView } from "framer-motion";
import { RefObject, useEffect } from "react";

interface CrowningCardProps {
  type: CrowningType;
  containerRef: RefObject<HTMLElement | null>;
  onShare?: () => void;
}

export default function CrowningCard({
  type,
  containerRef,
  onShare,
}: CrowningCardProps) {
  const {
    titleLine1,
    titleLine2,
    description,
    themeColor,
    illustrations,
    sparkleSvg,
    sparkles,
  } = getCrowningByType(type);

  const [scope, animate] = useAnimate();
  const inView = useInView(scope, {
    root: containerRef,
    initial: false,
    amount: 0.75,
  });

  useEffect(() => {
    const animationKeyframes = {
      type: "keyframes",
      duration: 0.6,
    } as const;

    const enter = async () => {
      await animate(
        '[data-animate="body"]',
        { y: "-120%" },
        animationKeyframes,
      );
      await animate(
        '[data-animate="header"]',
        { y: "50%", opacity: 1 },
        animationKeyframes,
      );
      await Promise.all([
        animate(
          '[data-animate="img-left"]',
          { x: "100%", opacity: 1 },
          animationKeyframes,
        ),
        animate(
          '[data-animate="img-right"]',
          { x: "-100%", opacity: 1 },
          animationKeyframes,
        ),
      ]);
      await animate(
        '[data-animate="text-label"]',
        { y: "50%", opacity: 1 },
        animationKeyframes,
      );
      await animate(
        '[data-animate="text-heading"]',
        { y: "25%", opacity: 1 },
        animationKeyframes,
      );
      await animate(
        '[data-animate="text-desc"]',
        { y: "-50%", opacity: 1 },
        animationKeyframes,
      );
    };

    const exit = () => {
      animate('[data-animate="body"]', { y: "120%" }, animationKeyframes);
      animate(
        '[data-animate="header"]',
        { y: "-50%", opacity: 0 },
        animationKeyframes,
      );
      animate(
        '[data-animate="img-left"]',
        { x: "-100%", opacity: 0 },
        animationKeyframes,
      );
      animate(
        '[data-animate="img-right"]',
        { x: "100%", opacity: 0 },
        animationKeyframes,
      );
      animate(
        '[data-animate="text-label"]',
        { y: "-50%", opacity: 0 },
        animationKeyframes,
      );
      animate(
        '[data-animate="text-heading"]',
        { y: "-25%", opacity: 0 },
        animationKeyframes,
      );
      animate(
        '[data-animate="text-desc"]',
        { y: "50%", opacity: 0 },
        animationKeyframes,
      );
    };

    if (inView) enter();
    else exit();
  }, [inView, animate]);

  return (
    <div
      ref={scope}
      className="w-full relative overflow-hidden max-w-[430px] mx-auto min-h-screen bg-gray-100 font-sans flex flex-col"
    >
      <div
        data-animate="header"
        className="px-6 pt-8 pb-4 flex items-center justify-between opacity-0 -translate-y-1/2"
      >
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
        <div className="w-full flex-none relative min-h-[200px]"></div>
        {illustrations.map((illustration, i) => (
          <img
            data-animate={i ? "img-right" : "img-left"}
            key={i}
            src={illustration.src}
            alt={`${titleLine1} ${titleLine2}`}
            className={`absolute z-10 ${i ? "translate-x-full" : "-translate-x-full"}`}
            style={{ inset: illustration.inset, width: illustration.width }}
          />
        ))}
        <motion.div style={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
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
        </motion.div>
      </div>

      {/* CONTENT */}
      <div
        data-animate="body"
        className="px-6 relative sm:px-8 pt-10 pb-12 bg-white flex-1 translate-y-[120%]"
      >
        <div className="absolute bottom-full -mt-20 left-0 right-0 h-24 sm:h-32 md:h-40">
          <div
            className="absolute bottom-0 w-full h-40 bg-white"
            style={{
              borderRadius: "100% / 40% 40% 0 0",
              transform: "translateY(50%)",
            }}
          />
        </div>
        <div className="relative">
          <p
            data-animate="text-label"
            className="text-[24px] sm:text-xl mb-4 opacity-0 -translate-y-1/2"
          >
            Your AIA Vitality Type
          </p>

          <p
            data-animate="text-heading"
            className={`text-[50px] sm:text-6xl md:text-7xl font-extrabold font-source ${themeColor} leading-none opacity-0 -translate-y-1/4`}
            style={{ fontFamily: "var(--font-source-sans)" }}
          >
            {titleLine1}
          </p>
          <p
            data-animate="text-heading"
            className={`text-[50px] sm:text-6xl md:text-7xl font-bold font-source ${themeColor} leading-none opacity-0 -translate-y-1/4`}
            style={{ fontFamily: "var(--font-source-sans)" }}
          >
            {titleLine2}
          </p>

          <p
            data-animate="text-desc"
            className="mt-3 mb-10 text-base sm:text-lg md:text-xl leading-relaxed whitespace-pre-line translate-y-1/2"
          >
            {description}
          </p>
        </div>
      </div>

      {/* FOOTER */}
      {/* <div className="px-6 sm:px-8 pb-10 border-t border-gray-200 pt-6">
        <p className="text-xs sm:text-sm text-gray-500">aia-financial.co.id</p>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          PT AIA Financial berizin dan diawasi oleh Otoritas Jasa Keuangan
        </p>
      </div> */}
    </div>
  );
}
