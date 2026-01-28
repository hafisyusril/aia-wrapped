"use client";

import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { useAnimate, useInView } from "framer-motion";

type EndCardProps = {
  leftIllustration?: ReactNode;
  rightIllustration?: ReactNode;
};

export default function EndCard({
  leftIllustration,
  rightIllustration,
}: EndCardProps) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { amount: 0.5, once: false });

  useEffect(() => {
    const config = { duration: 0.8, ease: "easeOut" } as const;

    const enterAnimation = async () => {
      // 1. Munculkan Logo
      animate("[data-anim='logo']", { opacity: 1, y: 0 }, config);

      // 2. Munculkan Top Content
      await animate("[data-anim='top']", { opacity: 1, x: 0 }, { ...config, delay: 0.2 });

      // 3. Munculkan Bottom Content
      await animate("[data-anim='bottom']", { opacity: 1, y: 0 }, config);

      // 4. Terakhir Illustration (Pop up)
      await animate(
        "[data-anim='illustration']",
        { opacity: 1, scale: 1, y: 0 },
        { type: "spring", stiffness: 100, damping: 15 }
      );

      // 5. ANIMASI TAMBAHAN: FLOATING
      // Kita jalankan tanpa 'await' supaya tidak memblokir kode lain jika ada
      animate(
        "[data-anim='illustration']",
        { y: [0, -25, 0], x: [0, -25, 0] }, // Bergerak naik turun 15px
        {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      );
    };

    const exitAnimation = () => {
      // Saat exit, kita hentikan semua animasi pada selector tersebut
      animate("[data-anim='logo']", { opacity: 0, y: -20 }, { duration: 0.2 });
      animate("[data-anim='top']", { opacity: 0, x: -20 }, { duration: 0.2 });
      animate("[data-anim='bottom']", { opacity: 0, y: 20 }, { duration: 0.2 });
      animate("[data-anim='illustration']", { opacity: 0, scale: 0.8, y: 50 }, { duration: 0.2 });
    };

    if (isInView) {
      enterAnimation();
    } else {
      exitAnimation();
    }
  }, [isInView, animate]);

  return (
    <div
      ref={scope}
      className="relative grid min-h-screen w-full max-w-[430px] mx-auto grid-rows-[50%_50%] overflow-hidden font-sans"
      style={{
        background: "linear-gradient(to bottom, #E60041 50%, #A00032 50%)",
      }}
    >
      {/* ... bagian logo, top, bottom tetep sama ... */}
      
      {/* ===== LOGO ===== */}
      <div data-anim="logo" className="absolute top-8 left-7.5 z-30 opacity-0" style={{ transform: "translateY(-20px)" }}>
        <Image src="/end-card/aia-logo-white.svg" alt="AIA Wrapped" width={135} height={50} priority />
      </div>

      {/* ===== TOP CONTENT ===== */}
      <div data-anim="top" className="relative flex flex-col justify-end px-7.5 pb-6 text-white z-20 opacity-0" style={{ transform: "translateX(-30px)" }}>
        <h1 className="text-4xl font-bold text-[44px] font-source leading-none" style={{ fontFamily: "var(--font-source-sans)" }}>Thank you</h1>
        <div className="text-base font-medium text-[24px] text-white mt-2">
          <p className="leading-snug">for living a healthier life</p>
        </div>
      </div>

      {/* ===== BOTTOM CONTENT ===== */}
      <div data-anim="bottom" className="relative flex flex-col justify-start px-7.5 pt-6 pb-28 text-gray-900 z-20 opacity-0" style={{ transform: "translateY(30px)" }}>
        <p className="font-medium text-white text-[16px] whitespace-pre-line mb-6">
          {`Here's to another year\nof wellness together!`}
        </p>
      </div>

      {/* ===== ILLUSTRATIONS ===== */}
{/* Container tetap nempel di pojok kanan bawah dengan overflow hidden */}
<div 
  data-anim="illustration" 
  className="absolute -bottom-10 -right-15 z-10 w-85 h-100  origin-bottom-right overflow-hidden"
  style={{ transform: "translateY(50px) scale(0.9)" }}
>
  <Image
    src="/end-card/end-card-illustration.svg"
    alt=""
    fill
    className="object-contain object-right-bottom z-20 " 
    priority
  />
</div>
    </div>
  );
}