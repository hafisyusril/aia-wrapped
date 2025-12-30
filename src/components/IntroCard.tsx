"use client";

export default function IntroCard() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {/* CARD */}
      <div className="relative h-175 w-97.5 bg-white overflow-hidden">
        {/* ===== TRAPEZIUM BACKGROUND ===== */}
        <img
          src="/intro/trapesium-top.svg"
          className="absolute top-0 left-0 w-full h-56 object-cover"
          alt=""
        />
        <img
          src="/intro/trapesium-bot.svg"
          className="absolute bottom-0 left-0 w-full h-35 object-cover"
          alt=""
        />
        <img
          src="/intro/trapesium-left.svg"
          className="absolute inset-y-0 left-0 w-17.5 h-full object-cover"
          alt=""
        />
        <img
          src="/intro/trapesium-right.svg"
          className="absolute inset-y-0 right-0 w-17.5 h-full object-cover"
          alt=""
        />

        {/* ===== CENTER CONTENT AREA ===== */}
        <div className="absolute inset-15 flex flex-col items-center justify-center gap-6">
          {/* ===== TITLE (OUTSIDE FRAME) ===== */}
          <img
            src="/intro/aia-vitality-wrapped.svg"
            className="w-55"
            alt="AIA Vitality Wrapped"
          />

          {/* ===== FRAME WRAPPER ===== */}
          <div className="relative w-66.25 h-90 overflow-hidden mt-">
            {/* CONTENT GRID (INSIDE FRAME) */}
            <div className="grid grid-rows-[1fr_auto] h-full px-4 pt-8 pb-6">
              {/* MIDDLE */}
                <img
                  src="/heart-rate/red-heart.svg"
                  className="absolute top-2 right-3 w-18 rotate-20"
                  alt=""
                />

                <img
                  src="/reward-redeem/women-gold.svg"
                  className="absolute left-1 top-1 w-43"
                  alt=""
                />

                <img
                  src="/gym-visit/gym-visit-deadlift.svg"
                  className="absolute bottom-4 w-42 left-1"
                  alt=""
                />

                <img
                  src="/reward-redeem/gold-coin.svg"
                  className="absolute bottom-15 left-1 w-17"
                  alt=""
                />
                <img
                  src="/intro/check-inside-love.svg"
                  className="absolute top-1 right-20 w-15"
                  alt=""
                />

                <img
                  src="/intro/wrapped-woman-red.svg"
                  className="absolute w-42 bottom-4 right-1"
                  alt=""
                />
                <img
                  src="/intro/shoe.svg"
                  className="absolute top-25 right-2 w-25"
                  alt=""
                />
            </div>

            {/* FRAME */}
            <img
              src="/intro/intro-content.svg"
              className="pointer-events-none absolute inset-0 z-10"
              alt="Frame"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
