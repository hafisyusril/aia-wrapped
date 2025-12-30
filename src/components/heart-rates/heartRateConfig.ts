type HeartRateCondition = "steady" | "super" | "strong";

export const heartRateConfig: Record<
  HeartRateCondition,
  {
    background: string;
    topImage: string;
    description: string;
    showExerciseText?: boolean;
  }
> = {
  steady: {
    background: "linear-gradient(to bottom, #F96B7D 35%, #D9D9FC 35%)",
    topImage: "/heart-rate/steady.svg",
    description: "low to moderate intensity",
    showExerciseText: true,
  },
  super: {
    background: "linear-gradient(to bottom, #b71c37 35%, #9090fc 35%)",
    topImage: "/heart-rate/super.svg",
    description: "high intensity",
  },
  strong: {
    background: "linear-gradient(to bottom, #F93D5D 35%, #C0C0FF 35%)",
    topImage: "/heart-rate/strong.svg",
    description: "moderate to high intensity",
    showExerciseText: true,
  },
};
