"use client";

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
  return (
    <button
      onClick={onClick}
      className={`
        absolute top-4 right-4 z-30
        flex items-center gap-2
        rounded-full
        border ${isBrightBg ? "border-black" : "border-white"}
        bg-white/20
        px-4 py-1.5
        text-sm font-normal
        hover:opacity-90
        active:scale-95
        transition
        ${className ?? ""}
      `}
      style={{
        color: isBrightBg ? "#000" : "#fff", // text juga mengikuti
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M43.7 0.280504C43.9 0.480504 44 0.680502 44 0.880502C44.1 1.1805 44.2 1.4805 44.1 1.7805C44.1 1.8805 30.6 44.3805 30.6 44.3805L18 25.8805L0 13.5805L42.4 0.080507C42.9 -0.119493 43.4 0.0805024 43.8 0.380502L43.7 0.280504ZM40.4 5.3805L20.5 25.2805L29.7 38.7805L40.3 5.3805H40.4ZM38.8 3.58051L5.39996 14.1805L18.9 23.3805L38.8 3.48051V3.58051Z"
          fill={isBrightBg ? "#000" : "#fff"} // icon juga mengikuti
        />
      </svg>
      <span>Share</span>
    </button>
  );
}
