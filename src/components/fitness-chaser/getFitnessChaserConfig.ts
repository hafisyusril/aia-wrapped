// getFitnessChaserConfig.ts

import { FITNESS_CHASER_CONFIG, FitnessChaserConfig } from "./FitnessChaserConfig";



export function getFitnessChaserConfig(
  totalChallenges: number
): FitnessChaserConfig {
  if (totalChallenges <= 20) {
    return FITNESS_CHASER_CONFIG.WARMING_UP;
  }

  if (totalChallenges <= 40) {
    return FITNESS_CHASER_CONFIG.CONSISTENT;
  }

  return FITNESS_CHASER_CONFIG.BOUNTY_HUNTER;
}
