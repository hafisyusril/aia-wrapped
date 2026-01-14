"use client";

import { ReactNode, useRef, useState } from "react";
import ShareButton from "./ShareButton";
import { captureWithWatermark } from "../app/utils/captureWithWatermark";
import ShareBottomSheet from "./ShareBottomSheet";

type MobileCardFrameProps = {
  background: string;
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

  /** optional hook for analytics / override */
  onShare?: () => void;
};

export default function MobileCardFrame({
  background,
  topContent,
  bottomContent,
  ornaments,
  illustration,
  className,
  topClassName,
  bottomClassName,
  showShareButton = true,
  watermarkSrc = "/crowning/aia_vitality.svg",
  fileName = "shared-image.png",
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
        relative grid min-h-svh grid-rows-[35%_65%]
        w-full max-w-[430px] mx-auto
        overflow-hidden font-sans
        ${className ?? ""}
      `}
      style={{ background }}
    >
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

      {/* Bottom sheet platform */}
      <ShareBottomSheet
        visible={showSharePopup}
        onClose={() => setShowSharePopup(false)}
        onSelect={handlePlatformSelect}
      />
    </div>
  );
}
