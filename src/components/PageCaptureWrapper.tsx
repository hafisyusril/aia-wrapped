"use client";

import { ReactNode, useRef, useState, useCallback } from "react";
import { captureWithWatermark } from "../app/utils/captureWithWatermark";
import ShareBottomSheet from "./ShareBottomSheet";

type Platform = "whatsapp" | "facebook" | "instagram" | "tiktok";

type PageCaptureWrapperProps = {
  children: (props: {
    pageName: string;
    onShare: () => Promise<void>;
  }) => ReactNode;
  fileName?: string;
  disableWatermark?: boolean;
  pageName: string;
  isBrightText?: boolean;
};

export default function PageCaptureWrapper({
  children,
  fileName = "capture.png",
  disableWatermark = false,
  isBrightText = false,
  pageName,
}: PageCaptureWrapperProps) {
  const captureRef = useRef<HTMLDivElement>(null);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const handleShare = async () => {
    if (!captureRef.current) return;
    const shareBtns = document.getElementsByClassName("share-btn");
    for (const btn of Array.from(shareBtns)) {
      (btn as HTMLButtonElement).style.opacity = "0";
    }
    await new Promise((r) => setTimeout(r, 300));
    await captureWithWatermark({
      element: captureRef.current,
      fileName,
      disableWatermark,
      isBrightText,
    });
    for (const btn of Array.from(shareBtns)) {
      (btn as HTMLButtonElement).style.opacity = "";
    }
  };

  const handlePlatformSelect = useCallback(
    async (platform: Platform) => {
      console.log("Wrapper received platform:", platform);

      if (!captureRef.current) return;

      setShowSharePopup(false);

      // beri waktu request tracking dikirim
      await new Promise((r) => setTimeout(r, 300));

      await captureWithWatermark({
        element: captureRef.current,
        fileName,
        disableWatermark,
      });
    },
    [fileName, disableWatermark],
  );

  return (
    <div className="relative">
      <div ref={captureRef} data-capture-root className="transform-none">
        {children({ pageName, onShare: handleShare })}
      </div>

      <ShareBottomSheet
        visible={showSharePopup}
        pageName={pageName}
        onClose={() => setShowSharePopup(false)}
        onSelect={handlePlatformSelect}
      />
    </div>
  );
}
