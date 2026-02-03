export type GymVisitLevel = 1 | 2 | 3 | 4;

export interface GymVisitConfig {
  min: number;
  max: number;
  title: string;
  message: string;
  background: string;
  speed: GymVisitLevel;
}

export const gymVisitConfigs: GymVisitConfig[] = [
  {
    min: 0,
    max: 50,
    title: "Energy-Saving <br /> Mode",
    message:
      "Sometimes leg day, sometimes abs day. <br /> Most times, rest days.",
    background: "linear-gradient(to bottom, #9393f9 35%, #d7f5ff 35%)",
    speed: 1,
  },
  {
    min: 51,
    max: 150,
    title: "Serious <br /> Bodybuilder",
    message:
      "Solid habit. You clearly not just hit <br /> the gym for mirror selfies.",
    background: "linear-gradient(to bottom, #7171E2 35%, #B2E8F7 35%)",
    speed: 2,
  },
  {
    min: 151,
    max: 250,
    title: "Gym <br /> Bunny",
    message:
      "Admit it, you train hard <br /> so you can have pizza after.",
    background: "linear-gradient(to bottom, #4646CC 35%, #8CEAF4 35%)",
    speed: 3,
  },
  {
    min: 251,
    max: Infinity,
    title: "Hustle <br /> for Muscle",
    message:
      "You give ‘No Days Off’ Energy. <br /> Be honest, the PT is your bestie!",
    background: "linear-gradient(to bottom, #29299B 35%, #4ADEE5 35%)",
    speed: 4,
  },
];
