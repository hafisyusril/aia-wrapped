// fitnessChaserConfig.ts

export interface FitnessChaserConfig {
  progress: number;
  background: string;
  title: string;
  description: string;
}

export const FITNESS_CHASER_CONFIG = {
  WARMING_UP: {
    progress: 50,
    background: "linear-gradient(to bottom, #FC7449 35%, #E1F9E6 35%)",
    title: "Casual\nChallenger",
    description:
      "It depends on the week and the mood. But your efforts still counts!",
  },

  CONSISTENT: {
    progress: 75,
    background: "linear-gradient(to bottom, #f9572b 35%, #bcf7c6 35%)",
    title: "Fitness\n Chaser",
    description:
      "Consistency looks good on you",
  },

  BOUNTY_HUNTER: {
    progress: 100,
    background: "linear-gradient(to bottom, #EA380F 35%, #88EA98 35%)",
    title: "Bounty\n Hunter",
    description:
      "No rest days? You really deserves those weekly rewards",
  },
} as const;
