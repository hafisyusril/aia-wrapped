export type HeartRateCondition = "low_heat" | "on_fire" | "cardio_junkie";

export function getHeartRateCondition(bpm: number): HeartRateCondition {
  if (bpm < 100) return "low_heat";
  if (bpm < 140) return "on_fire";
  return "cardio_junkie";
}
