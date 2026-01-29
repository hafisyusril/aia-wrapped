"use client";
import ShareIcon from "./ShareIcon";

type ShareButtonProps = {
  onClick?: () => void;
  className?: string;
  isBrightBg?: boolean; // true = background terang → hitam, false = gelap → putih
};


export default function ShareButton({
  onClick,
  className,
  isBrightBg = false,
}: ShareButtonProps) {
  const iconColor = isBrightBg ? "#000" : "#fff";

  return (
    <button
      onClick={onClick}
      className={`
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
      <span>Save</span>
    </button>
  );
}

