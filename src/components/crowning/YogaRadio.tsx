import { motion } from "framer-motion";

export default function YogaRadioS() {
  return (
    <motion.svg
      width="904"
      height="638"
      viewBox="0 0 904 638"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* GARIS */}
      <path d="M0 530.4H756.7" stroke="#B2B2B2" strokeWidth="2" />
      <path d="M413.199 430.1H903.799" stroke="#B2B2B2" strokeWidth="2" />

      {/* RECT DENGAN PATTERN */}
      <rect x="327.5" width="518" height="431" fill="url(#pattern0)" />
      <rect
        width="621.5"
        height="331"
        transform="matrix(-1 0 0 1 637 286.9)"
        fill="url(#pattern1)"
      />

      {/* DEKORASI */}
      <path
        d="M817.299 609.6C801.899 609.6 789.499 597.2 789.499 581.8C789.499 597.2 777.099 609.6 761.699 609.6C777.099 609.6 789.499 622 789.499 637.4C789.499 622 801.899 609.6 817.299 609.6Z"
        fill="#00D4FB"
      />

      {/* DEFINITIONS */}
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <image
            href="/crowning/yoga.svg"
            width="1034"
            height="860"
            transform="scale(0.000967118 0.00116279)"
          />
        </pattern>

        <pattern
          id="pattern1"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <image
            href="/crowning/radio.svg"
            width="1243"
            height="662"
            transform="scale(0.000804505 0.00151057)"
          />
        </pattern>
      </defs>
    </motion.svg>
  );
}
