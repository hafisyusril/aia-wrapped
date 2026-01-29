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

export default function VhcIllustration() {
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
        src="/vhc/VHC-STATIC.svg"
        alt="VHC Illustration"
        fill
        className="object-contain"
        priority
      />

      {/* // VHC Illustration Animated */}
      <AnimatedChecklist />
    </motion.div>
  );
}

function AnimatedChecklist() {
  return (
    <motion.svg
      className="absolute z-10"
      style={{
        top: "45%", // sesuaikan ke posisi buku
        left: "35%",
        transform: "translate(-50%, -50%)",
      }}
      width="87"
      height="125"
      viewBox="0 0 87 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ANIMASI ICON PLUS */}
      <motion.g
        style={{
          transformOrigin: "43.5px 20.5px",
        }}
        initial={{ rotate: 0 }}
        variants={rotateVariant}
        custom={0}
      >
        <path
          // icon Plus
          d="M43.2561 0C31.9338 0 22.7561 9.17769 22.7561 20.5C22.7561 31.8223 31.9338 41 43.2561 41C54.5784 41 63.7561 31.8223 63.7561 20.5C63.7561 9.17769 54.5784 0 43.2561 0ZM54.0062 23.2033H45.9549V31.2546C45.9549 32.7459 44.7429 33.9579 43.2516 33.9579C41.7603 33.9579 40.5483 32.7459 40.5483 31.2546V23.2033H32.497C31.0057 23.2033 29.7937 21.9913 29.7937 20.5C29.7937 19.0087 31.0057 17.7967 32.497 17.7967H40.5483V9.74538C40.5483 8.25407 41.7603 7.04209 43.2516 7.04209C44.7429 7.04209 45.9549 8.25407 45.9549 9.74538V17.7967H54.0062C55.4975 17.7967 56.7095 19.0087 56.7095 20.5C56.7095 21.9913 55.4975 23.2033 54.0062 23.2033Z"
          fill="#2370C4"
        />
      </motion.g>

      <motion.path
        // icon garis atas 1
        d="M29.177 57.7817H85.0123"
        stroke="#2370C4"
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
      <motion.g
        style={{
          transformOrigin: "43.5px 20.5px",
        }}
        initial={{ rotate: 0 }}
        variants={rotateVariant}
        custom={0}
      >
        <path
          // icon Check atas
          d="M1.5 61.9361L6.2837 67.0615L19.4389 54.0771"
          stroke="#2370C4"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
      <motion.path
        // icon garis atas 2
        d="M29.177 64.8315H85.0123"
        stroke="#2370C4"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        variants={lineVariant}
        custom={0}
      />
      <motion.path
        // icon garis tengah 1
        d="M29.177 85.751H85.0123"
        stroke="#2370C4"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        variants={lineVariant}
        custom={0.1}
      />

      <motion.g
        style={{
          transformOrigin: "43.5px 20.5px",
        }}
        initial={{ rotate: 0 }}
        variants={rotateVariant}
        custom={0.1}
      >
        <path
          // icon check tengah
          d="M1.5 89.9053L6.2837 95.0307L19.4389 82.0464"
          stroke="#2370C4"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.g>
      <motion.path
        // icon garis tengah 2
        d="M29.177 92.8008H85.0123"
        stroke="#2370C4"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        variants={lineVariant}
        custom={0.1}
      />
      <motion.path
        // icon garis bawah 1
        d="M29.177 113.716H85.0123"
        stroke="#2370C4"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        variants={lineVariant}
        custom={0.2}
      />

      <motion.g
        style={{
          transformOrigin: "43.5px 20.5px",
        }}
        initial={{ rotate: 0 }}
        variants={rotateVariant}
        custom={0.2}
      >
        <path
          // icon check bawah
          d="M1.5 117.875L6.2837 123L19.4389 110.011"
          stroke="#2370C4"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.g>
      <motion.path
        // icon garis bawah 2
        d="M29.177 120.77H85.0123"
        stroke="#2370C4"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          transformOrigin: "center",
          transformBox: "fill-box",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        variants={lineVariant}
        custom={0.2}
      />
    </motion.svg>
  );
}
