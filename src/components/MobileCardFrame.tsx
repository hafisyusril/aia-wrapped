"use client";

import { ReactNode, useRef, useState } from "react";
import ShareButton from "./ShareButton";
import { captureWithWatermark } from "../app/utils/captureWithWatermark";
import ShareBottomSheet from "./ShareBottomSheet";
import { motion } from "framer-motion";

type MobileCardFrameProps = {
  background: string;
  curtainColor?: string; // <--- baru
  topContent: ReactNode;
  bottomContent: ReactNode;
  ornaments?: ReactNode;
  illustration?: ReactNode;

  className?: string;
  topClassName?: string;
  bottomClassName?: string;

  showShareButton?: boolean;
  watermarkSrc?: string;
  fileName?: string;
  pageName: string;

  /** optional hook for analytics / override */
  onShare?: () => void;
};

export default function MobileCardFrame({
  background,
  curtainColor,
  topContent,
  bottomContent,
  ornaments,
  illustration,
  className,
  topClassName,
  bottomClassName,
  showShareButton = true,
  fileName = "shared-image.png",
  pageName,
  onShare,
}: MobileCardFrameProps) {
  const captureRef = useRef<HTMLDivElement>(null);

  const [showSharePopup, setShowSharePopup] = useState(false);
  const [capturedFile, setCapturedFile] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  // Step 1: user klik share → tampilkan bottom sheet
  const handleShareClick = () => {
    setShowSharePopup(true);
  };

  // Step 2: user pilih platform → capture element, simpan file, tapi jangan download langsung
  const handlePlatformSelect = async (_platform: string) => {
    if (!captureRef.current) return;

    // langsung tutup popup
    setShowSharePopup(false);

    // capture element
    const fileUrl = await captureWithWatermark({
      element: captureRef.current,
      fileName,
    });

    // opsional callback
    onShare?.();

    // trigger download
    const a = document.createElement("a");
    a.href = fileUrl as any;
    a.download = fileName;
    // a.click();

    // selesai → popup sudah tertutup
  };

  return (
    <div
      ref={captureRef}
      id="mobile-frame-capture"
      className={`
        relative grid min-h-dvh grid-rows-[35%_65%]
        w-full max-w-[430px] mx-auto
        overflow-hidden font-sans
        ${className ?? ""}
      `}
      style={{ background }}
    >
      {/* Layer animasi tirai */}
      <motion.div
        className="absolute top-0 left-0 w-full z-0"
        initial={{ height: "100vh" }}
        whileInView={{ height: "35%" }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: curtainColor ?? "#000" }} 
      />

      {showShareButton && <ShareButton onClick={handleShareClick} />}

      {ornaments}

      <div
        className={`
          relative flex flex-col h-full
          px-7.5 justify-end pb-5 z-20
          ${topClassName ?? ""}
        `}
      >
        {topContent}
      </div>

      <div
        className={`
          relative px-7.5 pt-2 z-20
          ${bottomClassName ?? ""}
        `}
      >
        {bottomContent}
      </div>

      {illustration}
      <ShareBottomSheet
        pageName={pageName}
        visible={showSharePopup}
        onClose={() => setShowSharePopup(false)}
        onSelect={handlePlatformSelect}
      />
    </div>
  );
}
