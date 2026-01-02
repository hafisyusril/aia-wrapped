import {
  WEEKLY_CHALLENGE_COPY,
  WEEKLY_CHALLENGE_THEME,
} from "./WeeklyChallengeConfig";
import { formatCurrency } from "./WeeklyChallengeUtils";

interface WeeklyChallengeCardProps {
  totalReward: number;
}

export default function WeeklyChallengeCard({
  totalReward,
}: WeeklyChallengeCardProps) {
  return (
    <section
      className={`w-full min-h-screen flex flex-col font-sans ${WEEKLY_CHALLENGE_THEME.background}`}
    >
      <div
        className={`px-6 py-12 ${WEEKLY_CHALLENGE_THEME.headerBackground}`}
      >
        <div className="text-white">
          <p className="text-lg font-medium mb-2">
            {WEEKLY_CHALLENGE_COPY.currency}
          </p>
          <h1 className="text-5xl font-extrabold leading-tight">
            {formatCurrency(totalReward)}
          </h1>
          <p className="mt-2 text-xl font-medium">
            {WEEKLY_CHALLENGE_COPY.title}
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between px-6 py-8">
        <p className="text-black text-lg font-medium leading-relaxed">
          {WEEKLY_CHALLENGE_COPY.message.map(
            (line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            )
          )}
        </p>
        <div className="relative flex justify-center items-end mt-8">
          <img
            src={WEEKLY_CHALLENGE_THEME.illustrationSrc}
            alt="Weekly Challenge Reward"
            className="w-[320px] h-auto"
          />
          <img
            src={WEEKLY_CHALLENGE_THEME.coinSrc}
            alt="Floating Coin"
            className="absolute -right-0 top-0 w-[90px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
