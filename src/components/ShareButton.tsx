"use client";
import { getCookie } from "../app/utils/cookie";
import ShareIcon from "./ShareIcon";

type ShareButtonProps = {
  onClick?: () => void;
  className?: string;
  isBrightBg?: boolean; // true = background terang → hitam, false = gelap → putih
  pageName?: string;
};

export default function ShareButton({
  onClick,
  className,
  pageName,
  isBrightBg = false,
}: ShareButtonProps) {
  const iconColor = isBrightBg ? "#000" : "#fff";

  return (
    <button
      onClick={() => {
        onClick?.();
        const vitalityId = getCookie("aia-vitality-id");
        if (!vitalityId) return;
        fetch("/api/v1/vitality/share", {
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
        })
          .then((res) => console.log("Share tracking status:", res.status))
          .catch((err) => console.error("Share tracking failed:", err));
      }}
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
        ${className ?? ""}
      `}
      style={{ color: iconColor }}
    >
      <ShareIcon color={iconColor} />
      <span>Save and Share</span>
    </button>
  );
}
