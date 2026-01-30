import { HeartRateCondition } from "./heartRateUtils";

export const heartRateConfig: Record<
  HeartRateCondition,
  {
    background: string;
    backgrounds: [string, string];
    topImage: string;
    description: string;
    motivation: string;
    showExerciseText?: boolean;
    message?: string;
  }
> = {
  "low-heat": {
    background: "linear-gradient(to bottom, #F96B7D 35%, #D9D9FC 35%)",
    backgrounds: ["#F96B7D", "#D9D9FC"],
    topImage: "/heart-rate/low-heat.svg",
    description: "low to moderate intensity",
    motivation:
      "We can see you running away (from your problems) on a treadmill.",
    showExerciseText: true,
    
  },
  "on-fire": {
    background: "linear-gradient(to bottom, #F93D5D 35%, #C0C0FF 35%)",
    backgrounds: ["#F93D5D", "#C0C0FF"],
    topImage: "/heart-rate/on-fire.svg",
    description: "moderate to high intensity",
    motivation:
      "This shows strong effort. And the bonus... make rooms for donuts.",
    showExerciseText: true,
  },
  "cardio-junkie": {
    background: "linear-gradient(to bottom, #b71c37 35%, #9090fc 35%)",
    backgrounds: ["#b71c37", "#9090fc"],
    topImage: "/heart-rate/cardio-junkie.svg",
    description: "high intensity exercise",
    motivation:
      "Are you human? Other people workout routine is just your warm-up!",
  },
};
