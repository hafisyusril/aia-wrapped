"use client";

import { ReactNode } from "react";

type MobileCardFrameProps = {
  background: string;
  topContent: ReactNode;
  bottomContent: ReactNode;
  ornaments?: ReactNode;
  illustration?: ReactNode;
};

export default function MobileCardFrame({
  background,
  topContent,
  bottomContent,
  ornaments,
  illustration,
}: MobileCardFrameProps) {
  return (
    <div
      className="relative grid h-[100svh] grid-rows-[35%_65%] overflow-hidden font-sans"
      style={{ background }}
    >
      {/* ORNAMENTS */}
      {ornaments}

      {/* TOP (35%) */}
      <div className="relative px-[30px] pt-30 z-20">{topContent}</div>

      {/* BOTTOM (65%) */}
      <div className="relative px-[30px] pt-2 z-20">{bottomContent}</div>

      {/* ILLUSTRATION */}
      {illustration}
    </div>
  );
}
