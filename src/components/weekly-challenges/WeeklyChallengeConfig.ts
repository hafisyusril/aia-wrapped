export interface WeeklyChallengeTheme {
  background: string;
  headerBackground: string;
  illustrationSrc: string;
  coinSrc: string;
}

export const WEEKLY_CHALLENGE_THEME: WeeklyChallengeTheme = {
  background: "bg-[#FBEAD1]",
  headerBackground: "bg-[#F2B24C]",
  illustrationSrc: "/weekly-challenge/person_illustration.svg",
  coinSrc: "/weekly-challenge/coin.svg",
};

export const WEEKLY_CHALLENGE_COPY = {
  currency: "Rp",
  title: "rewards redeemed!",
  message: [
    "Kamu berhasil buktiin",
    "kalau hidup sehat",
    "bisa bikin lebih hemat!",
  ],
};
