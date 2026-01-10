export type HeartRateLevel = "light" | "moderate" | "intense";
export type HeartRateCondition = "low-heat" | "on-fire" | "cardio-junkie";

export function getHeartRateCondition(
  level: HeartRateLevel
): HeartRateCondition {
  switch (level) {
    case "light":
      return "low-heat";
    case "moderate":
      return "on-fire";
    case "intense":
      return "cardio-junkie";
    default:
      return "low-heat";
  }
}
