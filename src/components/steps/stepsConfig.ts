export type StepsLevel = {
  max: number;
  background: string;
  title: string;
  averageText: string;
  motivation: string;
};

export const stepsConfig: StepsLevel[] = [
  {
    max: 1_800_000,
    background: "linear-gradient(to bottom, #2ABBF4 35%, #FFE6EE 35%)",
    title: "Casual <br /> Walker",
    averageText: "14-5.000 steps each day.",
    motivation: "Keep it up!",
  },
  {
    max: 2_600_000,
    background: "linear-gradient(to bottom, #0090F2 35%, #FFCFE0 35%)",
    title: "Consistent <br /> Stroller",
    averageText: "5.003-7.000 steps each day.",
    motivation: "You’re on a roll!",
  },
  {
    max: 4_600_000,
    background: "linear-gradient(to bottom, #0061EF 35%, #FFA6CA 35%)",
    title: "Steps <br /> Master",
    averageText: "7.003-12.500 steps each day.",
    motivation: "OMG you’re flying!",
  },
];
