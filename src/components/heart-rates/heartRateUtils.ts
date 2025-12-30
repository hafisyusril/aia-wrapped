export type HeartRateCondition = "steady" | "super" | "strong";

export function getHeartRateCondition(bpm: number): HeartRateCondition {
  if (bpm < 100) return "steady";
  if (bpm < 140) return "strong";
  return "super";
}
