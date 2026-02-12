// getFitnessChaserConfig.ts

import { FITNESS_CHASER_CONFIG, FitnessChaserConfig } from "./FitnessChaserConfig";



export function getFitnessChaserConfig(
  totalChallenges: number
): FitnessChaserConfig | null {
  if (totalChallenges >= 37) {
    return FITNESS_CHASER_CONFIG.BOUNTY_HUNTER;
  }

  if (totalChallenges >= 25) {
    return FITNESS_CHASER_CONFIG.CONSISTENT;
  }

  if (totalChallenges >= 1) {
    return FITNESS_CHASER_CONFIG.WARMING_UP;
  }

  return null
}
