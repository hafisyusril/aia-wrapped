import { useAnimate, useInView } from "framer-motion";
import { RefObject, useEffect } from "react";
import ShareButton from "../ShareButton";

export default function RewardInfoCard({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, {
    root: containerRef,
    initial: false,
    amount: 0.75,
    once: true,
  });

  useEffect(() => {
    const animationKeyframes = {
      type: "keyframes",
      duration: 0.6,
    } as const;

    const animationSpring = {
      type: "spring" as const,
      stiffness: 100,
      damping: 7,
      mass: 0.4,
    } as const;

    const enter = async () => {
      await animate(
        '[data-animate="bottom-box"]',
        { y: "0%" },
        animationKeyframes,
      );
      await animate(
        '[data-animate="logo"]',
        { y: "0%", opacity: 1 },
        animationKeyframes,
      );
      await animate(
        '[data-animate="text"]',
        { y: "0%", opacity: 1 },
        animationKeyframes,
      );
      await animate(
        '[data-animate="heading"]',
        { y: "0%", opacity: 1 },
        animationKeyframes,
      );
      await animate(
        '[data-animate="info"]',
        {
          scale: 1,
        },
        animationSpring,
      );
      await animate(
        '[data-animate="disclaimer"]',
        { y: "0%", opacity: 1 },
        animationKeyframes,
      );
    };

    const exit = () => {
      animate('[data-animate="bottom-box"]', { y: "100%" }, animationKeyframes);
      animate(
        '[data-animate="logo"]',
        { y: "-100%", opacity: 0 },
        animationKeyframes,
      );
      animate(
        '[data-animate="text"]',
        { y: "-100%", opacity: 0 },
        animationKeyframes,
      );
      animate(
        '[data-animate="heading"]',
        { y: "-100%", opacity: 0 },
        animationKeyframes,
      );
      animate(
        '[data-animate="info"]',
        {
          scale: 0,
        },
        animationSpring,
      );
      animate(
        '[data-animate="disclaimer"]',
        { y: "100%", opacity: 0 },
        animationKeyframes,
      );
    };

    if (inView) enter();
    else exit();
  }, [inView, animate]);

  return (
    <section
      ref={scope}
      className="@container relative flex flex-col w-full max-w-107.5 min-h-dvh mx-auto overflow-hidden bg-[#EAEAEA] px-8"
    >
      <div
        data-animate="bottom-box"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#DEDEDE]"
      />
      <div className="flex flex-1 flex-col relative">
        <div>
          <img
            data-animate="logo"
            src="/crowning/aia_vitality.svg"
            alt="AIA Vitality Wrapped"
            width={60}
            height={60}
            className="h-10 w-auto my-14"
          />
        </div>
        <p data-animate="text" className="mb-3 text-[4.3cqi]">
          Before you start scrolling...
          <br />
          <br />
          Don&apos;t forget to share your favorite
          <br />
          achievements & tag us on
          <br />
          Instagram <b>@aiaindonesia</b>
        </p>
        <h3
          data-animate="heading"
          className="text-[#D31145] font-bold text-[5.4cqi] mb-4"
        >
          Get a chance to win:
        </h3>
        <div data-animate="info" className="flex flex-col gap-4 flex-1">
          <div className="flex items-center gap-5 px-5 py-4 rounded-[20px] bg-white">
            <div className="flex-none">
              <img
                src="/reward-info/coin.png"
                alt="AIA Vitality Points"
                width={80}
                height={80}
              />
            </div>
            <div className="flex-1">
              <div className="font-bold text-[13cqi]">50</div>
              <div className="font-semibold text-[4.3cqi]">
                AIA Vitality Points
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 px-5 py-4 rounded-[20px] bg-white">
            <div className="flex-none">
              <img
                src="/reward-info/voucher.png"
                alt="AIA Vitality Points"
                width={106}
                height={92}
              />
            </div>
            <div className="flex-1">
              <div className="font-bold text-[6.6cqi]">Rp50.000</div>
              <div className="font-semibold text-[4.3cqi]">
                Kopi Kenangan
                <br /> vouchers
              </div>
            </div>
          </div>
        </div>
        <div data-animate="disclaimer" className="mb-16 text-[4.3cqi]">
          Only for the first 200 members,
          <br />
          until 20 February 2026!
        </div>
      </div>
    </section>
  );
}
