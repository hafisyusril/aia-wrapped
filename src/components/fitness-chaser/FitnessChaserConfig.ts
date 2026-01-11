// fitnessChaserConfig.ts

export interface FitnessChaserConfig {
  background: string;
  title: string;
  description: string;
}

export const FITNESS_CHASER_CONFIG = {
  WARMING_UP: {
    background: "linear-gradient(to bottom, #FC7449 35%, #E1F9E6 35%)",
    title: "Still Warming Up",
    description:
      "It depends on the week and the mood.\nBut your efforts still counts!",
  },

  CONSISTENT: {
    background: "linear-gradient(to bottom, #f9572b 35%, #bcf7c6 35%)",
    title: "Fitness Chaser",
    description:
      "Your life motto must be\n“I never sweat, I glow”.",
  },

  BOUNTY_HUNTER: {
    background: "linear-gradient(to bottom, #EA380F 35%, #88EA98 35%)",
    title: "Bounty Hunter",
    description:
      "No rest days? You really deserves\n those weekly rewards",
  },
} as const;
