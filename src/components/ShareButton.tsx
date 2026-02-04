"use client";
import { getCookie } from "../app/utils/cookie";
import ShareIcon from "./ShareIcon";
import { useState } from "react";

type ShareButtonProps = {
  onClick?: () => void;
  className?: string;
  isBrightBg?: boolean; // true = background terang → hitam, false = gelap → putih
  pageName?: string;
  isReady?: boolean; // Optional: disable button until component is ready
};

export default function ShareButton({
  onClick,
  className,
  pageName,
  isBrightBg = false,
  isReady = true,
}: ShareButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const iconColor = isBrightBg ? "#000" : "#fff";
  const isDisabled = !isReady || isLoading;

  const handleClick = async () => {
    if (isDisabled) return;

    setIsLoading(true);
    try {
      await onClick?.();
    } finally {
      setIsLoading(false);
    }

    const vitalityId = getCookie("aia-vitality-id");
    if (!vitalityId) return;

    try {
      const response = await fetch("/api/v1/vitality/share", {
        method: "POST",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          vitalityId,
          platform: "",
          page: pageName,
        }),
      });
      console.log("Share tracking status:", response.status);
    } catch (err) {
      console.error("Share tracking failed:", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`
        share-btn
        absolute top-4 right-4 z-30
        flex items-center gap-2
        rounded-full
        ${isBrightBg ? "bg-[#989898]/20" : "bg-white/20"}
        px-4 py-2
        text-sm font-normal
        hover:opacity-90
        active:scale-95
        transition
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className ?? ""}
      `}
      style={{ color: iconColor }}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 rounded-full border-current border-t-transparent animate-spin" />
          <span>Loading...</span>
        </>
      ) : !isReady ? (
        <>
          <div className="w-4 h-4 border-2 rounded-full border-current border-t-transparent animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          <ShareIcon color={iconColor} />
          <span>Save and Share</span>
        </>
      )}
    </button>
  );
}
