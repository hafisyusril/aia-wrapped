"use client";

import { ReactNode } from "react";

type MobileCardFrameProps = {
  background: string;
  topContent: ReactNode;
  bottomContent: ReactNode;
  ornaments?: ReactNode;
  illustration?: ReactNode;
  
  /** layout overrides */
  className?: string;
  topClassName?: string;
  bottomClassName?: string;

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
  
}: MobileCardFrameProps) {
  return (
    <div
      className={`relative grid h-svh grid-rows-[35%_65%] overflow-hidden font-sans ${className ?? ""}`}
      style={{ background }}
    >
      {/* ORNAMENTS */}
      {ornaments}

      {/* TOP (35%) */}
      <div className={`relative flex flex-col h-full px-7.5 justify-end pb-5 z-20 ${topClassName ?? ""}`}>{topContent}</div>

      {/* BOTTOM (65%) */}
      <div className={`relative px-7.5 pt-2 z-20 ${bottomClassName ?? ""}`}>{bottomContent}</div>

      {/* ILLUSTRATION */}
      {illustration}
    </div>
  );
}
