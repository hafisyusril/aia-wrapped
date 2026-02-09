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
    background: "bg-[#FFF8F0]",
    headerBackground: "bg-[#F2B24C]",
    illustrationSrc: "/weekly-challenge/person_illustration.png",
    coinSrc: "/weekly-challenge/coin.png",
    currency: "Rp",
    title: "Living healthier feels good for\n your body and your wallet.",
    message: [
      
      "",
      "Your favorite reward:\n <strong>Tokopedia</strong>",
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
