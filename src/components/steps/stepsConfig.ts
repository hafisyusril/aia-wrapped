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
    title: "Turtle <br /> Master",
    averageText: "That’s an average of 14-5.000 steps each day.",
    motivation: "We know you're not lazy. You just enjoy slow living.",
  },
  {
    max: 2_600_000,
    background: "linear-gradient(to bottom, #0090F2 35%, #FFCFE0 35%)",
    title: "Consistent <br /> Walker",
    averageText: "That’s an average of 14-5.000 steps each day.",
    motivation:
      "Did you walk around the park or walk around the office for meetings?",
  },
  {
    max: 4_600_000,
    background: "linear-gradient(to bottom, #0061EF 35%, #FFA6CA 35%)",
    title: "Non-Stop <br /> Mover",
    averageText: "That’s an average of 14-5.000 steps each day.",
    motivation: "Do you ever sit down? Your legs deserve a nice massage.",
  },
];
