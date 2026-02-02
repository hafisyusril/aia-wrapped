"use client";

import { ReactNode, useRef, useState } from "react";
import { captureWithWatermarkV2 } from "../app/utils/captureWithWatermark";

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

  const handleShare = async () => {
    if (!captureRef.current) return;
    // await new Promise((r) => setTimeout(r, 300));
    // await captureWithWatermark({
    //   element: captureRef.current,
    //   fileName,
    //   disableWatermark,
    //   isBrightText,
    // });
    await captureWithWatermarkV2({
      element: captureRef.current,
      fileName,
      disableWatermark,
      isBrightText,
    });
  };

  return (
    <div className="relative max-w-[430px] mx-auto">
      <div ref={captureRef} data-capture-root className="transform-none">
        {children({ pageName, onShare: handleShare })}
      </div>
    </div>
  );
}
