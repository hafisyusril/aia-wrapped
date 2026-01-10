export type WeeklyChallengeVariant = "default";

export interface WeeklyChallengeLevel {
  variant: WeeklyChallengeVariant;
  background: string;
  headerBackground: string;
  illustrationSrc: string;
  coinSrc: string;
  currency: string;
  title: string;
  message: string[];
}

export const weeklyChallengeConfig: WeeklyChallengeLevel[] = [
  {
    variant: "default",
    background: "bg-[#FBEAD1]",
    headerBackground: "bg-[#F2B24C]",
    illustrationSrc: "/weekly-challenge/person_illustration.svg",
    coinSrc: "/weekly-challenge/coin.svg",
    currency: "Rp",
    title: "rewards redeemed!",
    message: [
      "Living healthier feels good",
      "for your body and your wallet.",
      "",
      "Your favorite reward: <strong>Tokopedia</strong>",
    ],
  },
];

export function getWeeklyChallengeByVariant(
  variant: WeeklyChallengeVariant = "default"
): WeeklyChallengeLevel {
  const config = weeklyChallengeConfig.find((item) => item.variant === variant);

  if (!config) {
    throw new Error(`WeeklyChallenge variant "${variant}" not found`);
  }

  return config;
}
