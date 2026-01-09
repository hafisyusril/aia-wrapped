import { HeartRateCondition } from "./heartRateUtils";

export const heartRateConfig: Record<
  HeartRateCondition,
  {
    background: string;
    topImage: string;
    description: string;
    showExerciseText?: boolean;
    message?: string;
  }
> = {
  "low-heat": {
    background: "linear-gradient(to bottom, #F96B7D 35%, #D9D9FC 35%)",
    topImage: "/heart-rate/low-heat.svg",
    description: "low to moderate intensity",
    showExerciseText: true,
    message: "We can see you running away \n(from your problems) on a treadmill.",
  },
  "on-fire": {
    background: "linear-gradient(to bottom, #F93D5D 35%, #C0C0FF 35%)",
    topImage: "/heart-rate/on-fire.svg",
    description: "moderate to high intensity",
    showExerciseText: true,
    message: "You must be really really likes working out.. \nand donuts.",
  },
  "cardio-junkie": {
    background: "linear-gradient(to bottom, #b71c37 35%, #9090fc 35%)",
    topImage: "/heart-rate/cardio-junkie.svg",
    description: "high intensity exercise",
    message: "Are you human? Other people workout routine \nis just your warm-up!"
  },
};
