"use client";

import { motion, easeInOut } from "framer-motion";
import { useInView } from "@/src/app/hooks/useInView";
import MobileCardFrame from "../MobileCardFrame";
import AnimatedCounter from "./StepsCounter";
import { getStepsConfig } from "./stepsUtils";
import { delay } from "framer-motion/dom";
import { useEffect, useState } from "react";

interface StepsCardProps {
  steps: number;
  onShare?: () => void;
}

// Variants untuk grup pertama
const firstGroupVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

// Variants untuk grup kedua
const secondGroupVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export default function StepsCard({ steps, onShare }: StepsCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.6 });
  const config = getStepsConfig(steps);

  // STATE KUNCI: Menjaga animasi agar tidak reset
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const shouldAnimate = hasAnimated; // Variabel bantuan untuk readability

  // speed sesuai dengan 3 kondisi dari config
  const animeSpeed = config.speed || 1;

  const leftShoe = {
    walk: {
      x: [0, 50, 80, 40, 0],
      y: [0, 10, 10, 10, 0],
      rotate: [-30, -30, 0, 0, -30],
    },
  };

  const rightShoe = {
    walk: {
      x: [0, -50, -80, -40, 0],
      y: [0, -10, -10, -10, 0],
      rotate: [0, 30, 30, 20, 0],
    },
  };

  const walkTransition = {
    duration: animeSpeed,
    repeat: Infinity,
    ease: "linear" as const,
  };

  return (
    <div ref={ref}>
      <MobileCardFrame
        background={config.background}
        onShare={onShare}
        pageName="steps"
        curtainColor={config.background.match(/#[0-9A-Fa-f]{6}/)?.[0] ?? "#000"}
        fileName="steps.png"
        ornaments={
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 375 705"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0"
            >
              <motion.path
                d="M452.994 0.409261C409.526 6.01249 365.979 11.2472 322.787 18.7295C291.857 24.0872 260.817 31.0048 231.285 41.7656C214.434 47.9081 198.835 56.2235 183.915 66.2127C178.54 69.8131 173.44 73.8512 168.855 78.4253C161.838 85.4218 154.584 92.5948 149.416 101.153C145.867 107.031 142.287 113.099 139.556 119.439C136.594 126.317 134.99 133.9 133.424 141.154C132.618 144.883 132.168 148.689 132.047 152.502C131.803 160.308 131.806 168.284 132.771 176.06C133.267 180.045 134.073 183.986 135.118 187.86C137.204 195.574 139.327 203.37 142.218 210.843C145.249 218.683 149.063 226.208 153.261 233.481C173.098 267.823 198.409 298.285 220.551 331.079C223.324 335.188 226.014 339.347 228.601 343.575C226.483 340.105 224.368 336.634 222.25 333.164C229.379 344.913 235.978 357.281 239.878 370.518C238.706 366.48 237.536 362.438 236.364 358.4C238.258 365.064 239.412 371.867 239.571 378.799C239.508 374.594 239.44 370.387 239.376 366.182C239.437 371.917 238.804 377.578 237.408 383.144C238.415 379.205 239.418 375.267 240.425 371.328C239.083 376.388 237.142 381.207 234.651 385.809C236.603 382.306 238.552 378.807 240.504 375.305C237.325 380.996 233.393 386.152 228.899 390.868C231.67 387.971 234.439 385.079 237.211 382.183C228.974 390.645 219.439 397.716 209.42 403.916C212.885 401.796 216.351 399.68 219.816 397.561C190.305 415.591 157.082 426.515 124.94 438.763C108.618 444.984 92.3857 451.541 76.8205 459.499C65.9556 465.054 55.4718 471.39 45.2049 477.976C38.7485 482.115 32.4892 486.56 26.6616 491.56C18.9691 498.157 11.8661 505.565 5.2874 513.253C1.29292 517.922 -2.30533 522.933 -5.39001 528.247C-10.0481 536.281 -14.7877 544.406 -18.0305 553.147C-21.3105 561.993 -23.6227 571.332 -25.363 580.588C-28.1448 595.36 -27.7961 610.966 -26.4337 625.846C-25.3595 637.583 -22.8592 649.139 -19.6198 660.46C-14.6478 677.842 -9.08003 694.762 -2.01889 711.408C3.58338 724.616 9.74009 737.579 16.0174 750.477C21.3137 761.363 30.1726 770.52 41.5404 775.076C47.3854 777.677 53.4196 778.654 59.643 778.006C66.0254 778.465 72.1616 777.259 78.0458 774.397C88.7441 769.068 98.5432 760.467 102.608 748.853C106.708 737.143 107.498 723.78 101.916 712.303C89.7459 687.286 77.8602 661.914 70.0101 635.15C71.1824 639.188 72.3517 643.23 73.524 647.269C69.2354 632.472 66.2418 617.252 65.9391 601.812C66.0031 606.017 66.071 610.224 66.135 614.428C65.9989 604.745 66.9568 595.106 69.3237 585.71L66.3062 597.525C68.3546 589.643 71.3637 582.088 75.3106 574.967L69.4569 585.471C73.7999 577.777 79.142 570.76 85.2369 564.374C82.4652 567.27 79.6965 570.162 76.9248 573.059C86.1063 563.578 96.7267 555.829 107.927 548.921L97.5305 555.275C124.914 538.568 155.206 527.739 185.102 516.522C217.577 504.337 249.663 491.04 278.107 470.798C284.025 466.588 289.691 461.965 294.845 456.84C302.063 449.662 309.529 442.257 314.817 433.448C319.669 425.367 324.66 416.975 327.286 407.826C329.972 398.466 332.629 388.946 332.707 379.139C332.783 369.227 332.808 359.353 330.633 349.659C328.349 339.477 325.336 329.197 321.128 319.606C313.347 301.87 302.8 285.253 291.87 269.328C273.555 242.647 252.731 217.537 235.801 189.926C237.919 193.396 240.034 196.866 242.152 200.336C235.108 188.754 228.876 176.603 225.03 163.558C226.202 167.596 227.371 171.639 228.544 175.677C226.59 168.821 225.354 161.825 225.16 154.691C225.224 158.896 225.292 163.103 225.356 167.308C225.269 161.401 225.919 155.575 227.373 149.849C226.366 153.788 225.362 157.726 224.355 161.665C225.612 157.002 227.462 152.627 229.799 148.404C227.847 151.906 225.897 155.405 223.945 158.908C226.966 153.592 230.664 148.75 234.875 144.327C232.103 147.223 229.334 150.115 226.562 153.012C232.731 146.646 239.802 141.305 247.339 136.672C243.874 138.791 240.408 140.907 236.942 143.027C252.665 133.488 270.047 127.016 287.637 121.862C283.604 123.034 279.567 124.203 275.534 125.375C321.105 112.142 368.846 106.246 415.752 100.057C432.813 97.8045 449.886 95.6526 466.952 93.4524C478.745 91.9302 490.747 84.4046 497.764 74.8994C501.662 70.0057 504.118 64.5354 505.125 58.486C507.202 52.5053 507.641 46.3298 506.44 39.9634C504.098 28.0141 498.279 16.1251 487.897 9.1096C477.515 2.09414 465.713 -1.22715 452.998 0.412191L452.994 0.409261Z"
                // --- PENGATURAN VISUAL ---
                fill="none" // Kita buat fill kosong agar fokus ke garis
                stroke="#F4DCE4" // Gunakan warna garis
                strokeWidth="20" // Sesuaikan ketebalan garis (sesuai kebutuhan desain)
                strokeLinecap="round" // Agar ujung garis melengkung halus
                strokeLinejoin="round"
                style={{ mixBlendMode: "multiply" }}
                // --- ANIMASI BERJALAN ---
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  shouldAnimate
                    ? { pathLength: 1, opacity: 0.7 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  duration: 3.5,
                  ease: "easeInOut",
                  opacity: { duration: 1 },
                }}
              />
            </motion.svg>
          </div>
        }
        topContent={
          <motion.h1
            className="text-white text-[54px] font-source font-bold leading-none"
            dangerouslySetInnerHTML={{ __html: config.title }}
            initial={{ y: -100, opacity: 0 }}
            animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          />
        }
        bottomContent={
          <>
            {/* Grup 1: You walked → counter → Steps this year */}
            <motion.div
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              variants={{
                visible: {
                  transition: { delayChildren: 1 }, // tiap child muncul 0.3s selisih
                },
              }}
              className="flex flex-col gap-2"
            >
              <motion.p
                variants={firstGroupVariants}
                className="text-[20px] font-bold font-everest text-black"
              >
                You walked
              </motion.p>

              {shouldAnimate ? (
                <AnimatedCounter
                  target={steps}
                  delay={1000}
                  duration={700}
                  className="text-[54px] text-black font-black font-source leading-none"
                />
              ) : (
                <span className="text-[54px] text-black font-bold">0</span>
              )}

              <motion.p
                variants={firstGroupVariants}
                className="text-[24px] text-black  font-everest font-bold leading-none "
              >
                steps this year
              </motion.p>
            </motion.div>

            {/* Grup 2: Average text & motivation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }} // muncul setelah grup 1
              className="mt-10 flex flex-col gap-2"
            >
              <p className="text-[16px] text-black font-medium leading-tight">
                That’s an average of {config.averageText} {config.motivation}
              </p>

              {/* <p className="text-[16px] text-black font-medium whitespace-pre-line leading-none">
                
              </p> */}
            </motion.div>
          </>
        }
        illustration={
          <>
            <div className="pointer-events-none absolute bottom-15 left-10 right-10 inset-0 z-30">
              <motion.img
                src="/steps/left-shoe.svg"
                alt=""
                className="absolute bottom-2 left-12 w-[30%] h-auto object-contain"
                animate="walk"
                variants={leftShoe}
                transition={walkTransition}
              />

              <img
                src="/steps/left-line.svg"
                alt=""
                className="absolute bottom-0 left-15 w-[25%] max-w-55 h-auto object-contain"
              />

              <motion.img
                src="/steps/right-shoe.svg"
                alt=""
                className="absolute bottom-0 right-12 w-[35%] h-auto object-contain"
                animate="walk"
                variants={rightShoe}
                transition={{
                  ...walkTransition,
                }}
              />

              <img
                src="/steps/right-line.svg"
                alt=""
                className="absolute bottom-0 right-0 w-[50%] max-w-55 h-auto object-contain"
              />
            </div>
          </>
        }
      />
    </div>
  );
}

{
}
