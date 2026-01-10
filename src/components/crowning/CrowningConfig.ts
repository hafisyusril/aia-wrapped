export type CrowningType =
  | "stretcher"
  | "starter"
  | "active"
  | "health-nut"
  | "athlete";

export interface CrowningLevel {
  type: CrowningType;
  titleLine1: string;
  titleLine2: string;
  description: string;
  themeColor: string;
  illustrationSrc: string;
}

export const crowningConfig: CrowningLevel[] = [
  {
    type: "stretcher",
    titleLine1: "Certified",
    titleLine2: "Stretcher",
    description:
      "Some days you move, some days you wait for motivation. We try again this year!",
    themeColor: "text-[#6EC1E4]", // light blue
    illustrationSrc: "/crowning/yoga_radio.svg",
  },
  {
    type: "starter",
    titleLine1: "Certified",
    titleLine2: "Starter",
    description:
      "The most important part: you started. Your fitness era is coming. Right?",
    themeColor: "text-[#FF6A3D]", // orange
    illustrationSrc: "/crowning/treadmill_run.svg",
  },
  {
    type: "active",
    titleLine1: "Certified",
    titleLine2: "Active",
    description:
      "Busy life and yet still making time to move and check your AIA Vitality app. Respect!",
    themeColor: "text-[#7B6CF6]", // purple
    illustrationSrc: "/crowning/barbel.svg",
  },
  {
    type: "health-nut",
    titleLine1: "Certified",
    titleLine2: "Health Nut",
    description: "You exercise almost everyday. Great! But, are you okay?",
    themeColor: "text-[#2563EB]", // blue
    illustrationSrc: "/crowning/yoga_radio.svg",
  },
  {
    type: "athlete",
    titleLine1: "Certified",
    titleLine2: "Athlete",
    description:
      "You pushed yourself to the max! Are you training for the Olympics?",
    themeColor: "text-[#E11D48]", // red
    illustrationSrc: "/crowning/treadmill_run.svg",
  },
];
