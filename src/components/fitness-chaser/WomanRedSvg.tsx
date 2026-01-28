import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function WomanRedSvg({ progress = 100 }: { progress?: number }) {
  const outerRef = useRef<SVGPathElement>(null);
  const innerRef = useRef<SVGPathElement>(null);

  const outerControls = useAnimation();
  const innerControls = useAnimation();

  const outerInView = useInView(outerRef, );
  const innerInView = useInView(innerRef, );

  useEffect(() => {
    if (outerRef.current && outerInView) {
      const length = outerRef.current.getTotalLength();
      outerControls.set({ strokeDashoffset: length });
      outerControls.start({
        strokeDashoffset: length * (1 - progress / 100),
        transition: { duration: 2, ease: "easeInOut", delay: 0.3 },
      });
    }
    if (innerRef.current && innerInView) {
      const length = innerRef.current.getTotalLength();
      innerControls.set({ strokeDashoffset: length });
      innerControls.start({
        strokeDashoffset: length * (1 - progress / 100),
        transition: { duration: 2, ease: "easeInOut" },
      });
    }
  }, [outerInView, innerInView, outerControls, innerControls, progress]);
  return (
    <div className="flex items-center w-full h-full">
      {/* SVG Inline */}
      <svg
        className="w-full h-full"
        viewBox="0 0 742 598"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M415.199 587.921H741.899"
          stroke="#3E4853"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
        <path
          d="M0 587.921H274.2"
          stroke="#3E4853"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
        <path
          d="M310.4 567.922C415.279 567.922 500.3 482.9 500.3 378.022C500.3 273.143 415.279 188.122 310.4 188.122C205.521 188.122 120.5 273.143 120.5 378.022C120.5 482.9 205.521 567.922 310.4 567.922Z"
          stroke="#FFD2DF"
          strokeWidth="51"
          strokeMiterlimit="10"
        />

        {/* Circle Bar paling luar animasi */}
        <motion.path
          ref={outerRef}
          d="M310.4 188.122C415.279 188.122 500.3 273.143 500.3 378.022C500.3 482.9 415.279 567.922 310.4 567.922C205.521 567.922 120.5 482.9 120.5 378.022C120.5 273.143 205.521 188.122 310.4 188.122Z"
          stroke="#D31145"
          strokeWidth="51"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={outerRef.current?.getTotalLength() ?? 0}
          strokeDashoffset={outerRef.current?.getTotalLength() ?? 0}
          animate={outerControls}
        />

        <path
          d="M310.4 493.021C373.913 493.021 425.4 441.534 425.4 378.021C425.4 314.509 373.913 263.021 310.4 263.021C246.888 263.021 195.4 314.509 195.4 378.021C195.4 441.534 246.888 493.021 310.4 493.021Z"
          stroke="#BDBDFF"
          strokeWidth="41"
          strokeMiterlimit="10"
        />
        <path
          d="M375.635 386.229C380.134 350.223 354.593 317.388 318.587 312.888C282.582 308.389 249.746 333.93 245.246 369.936C240.747 405.941 266.288 438.777 302.294 443.276C338.299 447.776 371.135 422.235 375.635 386.229Z"
          fill="#00C66C"
        />

        {/* Circle bar paling dalam animasi */}
        <motion.path
          ref={innerRef}
          d="M310.4 263.021C373.913 263.021 425.4 314.509 425.4 378.021C425.4 441.534 373.913 493.021 310.4 493.021C246.888 493.021 195.4 441.534 195.4 378.021C195.4 314.509 246.888 263.021 310.4 263.021Z"
          stroke="#4C4794"
          strokeWidth="41"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={innerRef.current?.getTotalLength() ?? 0}
          strokeDashoffset={innerRef.current?.getTotalLength() ?? 0}
          animate={innerControls}
        />
        <path
          d="M277.9 381.622L299.7 404.322L343 354.922"
          stroke="white"
          strokeWidth="12"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="397.516"
          width="205.635"
          height="597.561"
          fill="url(#pattern0_491_286)"
        />
        <defs>
          <pattern
            id="pattern0_491_286"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_491_286"
              transform="scale(0.00347222 0.00120337)"
            />
          </pattern>
        </defs>
      </svg>

      {/* SVG eksternal di sebelah kanan */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          transform: "translate(15%)", // geser 10% ke kanan dan 5% ke bawah
        }}
      >
        <Image
          src="/fitness-chaser/woman-red-only.svg"
          alt="Woman Red Only"
          fill // ⬅️ pakai fill biar otomatis 100% w/h parent
          style={{ objectFit: "contain" }} // biar penuh tapi proporsinya tetap
          priority
        />
      </div>
    </div>
  );
}

// aku ingin buat animasi untuk circle bar paling luar dan dalam awalnya dibuat kosong terus beranimasi jadi kaya berjalan melingkar gitu kaya circle bar mengisi bar lingkarannya. kaya cricle bar kebugaran di apple. bisa ga ya? pakai framer motion
