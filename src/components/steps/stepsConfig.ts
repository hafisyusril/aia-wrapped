export type StepsLevel = {
  max: number;
  background: string;
  title: string;
  averageText: string;
  motivation: string;
  speed: number;
};

export const stepsConfig: StepsLevel[] = [
  {
    max: 1_800_000,
    background: "linear-gradient(to bottom, #2ABBF4 35%, #FFE6EE 35%)",
    title: "Turtle <br /> Master",
    averageText: "100-5.000 steps each day.",
    motivation: "We know you’re not lazy. You just enjoy slow living.",
    speed: 1.5,
  },
  {
    max: 2_600_000,
    background: "linear-gradient(to bottom, #0090F2 35%, #FFCFE0 35%)",
    title: "Consistent <br /> Walker",
    averageText: "5.000-7.500 steps each day.",
    motivation: "Did you walk around the park or walk around the office for meetings?",
    speed: 1,
  },
  {
    max: 4_600_000,
    background: "linear-gradient(to bottom, #0061EF 35%, #FFA6CA 35%)",
    title: "Non-Stop <br /> Wanderer",
    averageText: "7.500-12.500 steps each day.",
    motivation: "Do you ever sit down? Your legs deserves a nice massage.",
    speed: 0.8,
  },
];
