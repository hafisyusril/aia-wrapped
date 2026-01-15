"use client";

import { ReactNode, useRef } from "react";
import ShareButton from "./ShareButton";
import { captureWithWatermark } from "../app/utils/captureWithWatermark";

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

  const handleShare = async () => {
    if (!captureRef.current) return;

    await captureWithWatermark({
      element: captureRef.current,
      fileName,
    });

    onShare?.(); // analytics / callback
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
      {showShareButton && <ShareButton onClick={handleShare} />}

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
      
    </div>
  );
}
