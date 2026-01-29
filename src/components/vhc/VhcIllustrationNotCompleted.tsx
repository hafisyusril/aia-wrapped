import { motion, Variants } from "framer-motion";
import Image from "next/image";

const rotateVariant: Variants = {
  visible: (delay: number) => ({
    rotate: [0, 360],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      delay,
      repeat: 4,
      repeatDelay: 1,
    },
  }),
};

const lineVariant: Variants = {
  visible: (delay: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay,
      repeat: 4,
      repeatDelay: 1,
    },
  }),
};

const appearAnim = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 140, // makin gede = makin kaku
      damping: 2, // makin kecil = makin mantul
      mass: 0.8,
      delay: 1,
    },
  },
};

export default function VhcIllustrationNotCompleted() {
  return (
    <motion.div
      className="relative w-[194px] h-[200px]"
      variants={appearAnim}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* // VHC illustration Static */}
      <Image
        src="/vhc/VHC-STATIC-UNCHECKED.svg"
        alt="VHC Illustration"
        fill
        className="object-contain"
        priority
      />

      {/* // VHC Illustration Animated */}
      <AnimatedX />
    </motion.div>
  );
}

function AnimatedX() {
  return (
    <motion.svg
      className="absolute z-10"
      style={{
        top: "60%",
        left: "44%",
        transform: "translate(-50%, -50%)",
      }}
      strokeWidth="86"
      height="72"
      viewBox="0 0 86 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gambar X */}
      <motion.g
        style={{
          transformOrigin: "43.5px 20.5px",
        }}
        initial={{ rotate: 0 }}
        variants={rotateVariant}
        custom={0}
      >
        <path
          d="M60.2557 6.1895C52.003 -2.06317 38.6232 -2.06317 30.3705 6.1895C22.1179 14.4422 22.1179 27.822 30.3705 36.0746C38.6232 44.3273 52.003 44.3273 60.2557 36.0746C68.5083 27.822 68.5083 14.4422 60.2557 6.1895ZM51.181 30.9382L45.3154 25.0726L39.4499 30.9382C38.3631 32.0249 36.5983 32.0249 35.507 30.9382C34.4156 29.8515 34.4202 28.0867 35.507 26.9953L41.3725 21.1297L35.507 15.2642C34.4202 14.1774 34.4202 12.4127 35.507 11.3213C36.5937 10.2299 38.3585 10.2346 39.4499 11.3213L45.3154 17.1869L51.181 11.3213C52.2677 10.2346 54.0325 10.2346 55.1239 11.3213C56.2153 12.408 56.2106 14.1728 55.1239 15.2642L49.2583 21.1297L55.1239 26.9953C56.2106 28.082 56.2106 29.8468 55.1239 30.9382C54.0371 32.0296 52.2724 32.0249 51.181 30.9382Z"
          fill="#E11F46"
        />
      </motion.g>

      {/* Garis Horizontal 1 */}
      <motion.path
        d="M25.8189 60.2434H83.9885"
        stroke="#848A90"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        variants={lineVariant}
        custom={0}
      />
      <motion.path
        d="M25.8189 67.5878H83.9885"
        stroke="#848A90"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        variants={lineVariant}
        custom={0}
      />
      {/* <path
        d="M25.8189 60.2434H83.9885"
        stroke="#848A90"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.8189 67.5878H83.9885"
        stroke="#848A90"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      /> */}

      {/* Garis Silang */}
      <motion.g
        style={{
          transformOrigin: "43.5px 20.5px",
        }}
        initial={{ rotate: 0 }}
        variants={rotateVariant}
        custom={0}
      >
        <path
          d="M1.5 69.911L15.2051 56.3839"
          stroke="#333D47"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.58899 56.2949L15.1161 70"
          stroke="#333D47"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </motion.svg>
  );
}
