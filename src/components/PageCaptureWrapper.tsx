"use client";

import { ReactNode, useRef } from "react";
import { captureWithWatermarkV2 } from "../app/utils/captureWithWatermark";
import { useIsElementLoadingComplete } from "../app/hooks/useIsComponentReady";

type PageCaptureWrapperProps = {
  children: (props: {
    pageName: string;
    onShare: () => Promise<void>;
    isReady?: boolean;
  }) => ReactNode;
  fileName?: string;
  disableWatermark?: boolean;
  colorWatermarkLogo?: boolean;
  pageName: string;
  isBrightText?: boolean;
};

export default function PageCaptureWrapper({
  children,
  fileName = "capture.png",
  colorWatermarkLogo = false,
  disableWatermark = false,
  isBrightText = false,
  pageName,
}: PageCaptureWrapperProps) {
  const captureRef = useRef<HTMLDivElement>(null);
  const isReady = useIsElementLoadingComplete(
    captureRef as React.RefObject<HTMLElement>
  );

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
      colorWatermarkLogo,
      isBrightText,
      pageName,
    });
  };

  return (
    <div className="relative max-w-[430px] mx-auto">
      <div ref={captureRef} data-capture-root className="transform-none">
        {children({ pageName, onShare: handleShare, isReady })}
      </div>
    </div>
  );
}
