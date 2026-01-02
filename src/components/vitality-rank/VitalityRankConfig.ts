export type VitalityRankVariant = "default";

export interface VitalityRankTheme {
  variant: VitalityRankVariant;
  backgroundColor: string;
  sideAccentColor: string;
  ornamentSrc: string;
  trophySrc: string;
}

export const vitalityRankConfig: VitalityRankTheme[] = [
  {
    variant: "default",
    backgroundColor: "bg-[#C6283D]",
    sideAccentColor: "bg-[#E57373]",
    ornamentSrc: "/vitality-rank/vitality_ornament.svg",
    trophySrc: "/vitality-rank/trophy.svg",
  },
];

export function getVitalityRankTheme(
  variant: VitalityRankVariant = "default"
): VitalityRankTheme {
  const theme = vitalityRankConfig.find((item) => item.variant === variant);

  if (!theme) {
    throw new Error(`VitalityRank theme "${variant}" not found`);
  }

  return theme;
}
