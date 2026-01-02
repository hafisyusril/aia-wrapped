import {
  getWeeklyChallengeByVariant,
} from "./WeeklyChallengeConfig";
import { formatCurrency } from "./WeeklyChallengeUtils";

interface WeeklyChallengeCardProps {
  totalReward: number;
}

export default function WeeklyChallengeCard({
  totalReward,
}: WeeklyChallengeCardProps) {
  const {
    background,
    headerBackground,
    illustrationSrc,
    coinSrc,
    currency,
    title,
    message,
  } = getWeeklyChallengeByVariant("default");

  return (
    <section
      className={`w-full min-h-screen flex flex-col font-sans ${background}`}
    >
      <div className={`px-6 py-12 ${headerBackground}`}>
        <div className="text-white">
          <p className="text-lg font-medium mb-2">
            {currency}
          </p>
          <h1 className="text-5xl font-extrabold leading-tight">
            {formatCurrency(totalReward)}
          </h1>
          <p className="mt-2 text-xl font-medium">
            {title}
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between px-6 py-8">
        <p className="text-black text-lg font-medium leading-relaxed">
          {message.map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div className="relative flex justify-center items-end mt-8">
          <img
            src={illustrationSrc}
            alt="Weekly Challenge Reward"
            className="w-[320px] h-auto"
          />
          <img
            src={coinSrc}
            alt="Floating Coin"
            className="absolute -right-0 top-0 w-[90px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
