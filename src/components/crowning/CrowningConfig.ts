export type CrowningType =
  | "stretcher"
  | "starter"
  | "active"
  | "challenger"
  | "athlete";

export interface SparkleConfig {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: string; // tailwind size
  delay: number;
  duration: number;
}

export interface CrowningLevel {
  type: CrowningType;
  titleLine1: string;
  titleLine2: string;
  description: string;
  themeColor: string;
  illustrationSrc: string;
  sparkleSvg: string;
  sparkles: SparkleConfig[];
}

export const crowningConfig: CrowningLevel[] = [
  {
    type: "stretcher",
    titleLine1: "Certified",
    titleLine2: "Stretcher",
    description:
      "Some days you move, some days you wait for motivation. We try again this year!",
    themeColor: "text-[#6EC1E4]", // light blue
    illustrationSrc: "/crowning/yoga-radio.svg",
    sparkleSvg: "/crowning/sparkle-stretcher.svg",
    sparkles: [
  { top: "18%", left: "20%", size: "w-5 h-5", delay: 0, duration: 3 },
  { top: "25%", right: "42%", size: "w-7 h-7", delay: 0.5, duration: 4 },
  { top: "35%", left: "12%", size: "w-2.5 h-2.5", delay: 1, duration: 5 },
  { bottom: "10%", right: "20%", size: "w-5 h-5", delay: 1.2, duration: 4 },
  { bottom: "30%", left: "25%", size: "w-2 h-2", delay: 1.6, duration: 6 },
],
  },
  {
    type: "starter",
    titleLine1: "Certified",
    titleLine2: "Starter",
    description:
      "The most important part: you started. Your fitness era is coming. Right?",
    themeColor: "text-[#FF6A3D]", // orange
    illustrationSrc: "/crowning/treadmill-run.svg",
    sparkleSvg: "/crowning/sparkle-starter.svg",
    sparkles: [
  { top: "18%", left: "20%", size: "w-4 h-4", delay: 0, duration: 3 },
  { top: "25%", right: "42%", size: "w-5 h-5", delay: 0.5, duration: 4 },
  { top: "35%", left: "12%", size: "w-5 h-5", delay: 1, duration: 5 },
  { bottom: "42%", right: "10%", size: "w-7 h-7", delay: 1.2, duration: 4 },
  { bottom: "30%", left: "25%", size: "w-2 h-2", delay: 1.6, duration: 6 },
],
  },
  {
    type: "active",
    titleLine1: "Certified",
    titleLine2: "Active",
    description:
      "Busy life and yet still making time to move and check your AIA Vitality app. Respect!",
    themeColor: "text-[#7B6CF6]", // purple
    illustrationSrc: "/crowning/barbel-new.svg",
    sparkleSvg: "/crowning/sparkle-active.svg",
    sparkles: [
  { top: "18%", left: "20%", size: "w-4 h-4", delay: 0, duration: 3 },
  { top: "25%", right: "42%", size: "w-5 h-5", delay: 0.5, duration: 4 },
  { top: "35%", left: "12%", size: "w-5 h-5", delay: 1, duration: 5 },
  { bottom: "42%", right: "30%", size: "w-3 h-3", delay: 1.2, duration: 4 },
  { bottom: "30%", left: "25%", size: "w-2 h-2", delay: 1.6, duration: 6 },
],
  },
  {
    type: "challenger",
    titleLine1: "Certified",
    titleLine2: "Challenger",
    description: "You exercise almost everyday. Great! But, are you okay?",
    themeColor: "text-[#2563EB]", // blue
    illustrationSrc: "/crowning/wheel.svg",
    sparkleSvg: "/crowning/sparkle-challenger.svg",
    sparkles: [
  { top: "18%", left: "20%", size: "w-4 h-4", delay: 0, duration: 3 },
  { top: "25%", right: "32%", size: "w-5 h-5", delay: 0.5, duration: 4 },
  { top: "35%", left: "12%", size: "w-2.5 h-2.5", delay: 1, duration: 5 },
  { bottom: "42%", right: "30%", size: "w-3 h-3", delay: 1.2, duration: 4 },
  { bottom: "10%", left: "45%", size: "w-7 h-7", delay: 1.6, duration: 6 },
],

  },
  {
    type: "athlete",
    titleLine1: "Certified",
    titleLine2: "Athlete",
    description:
      "You pushed yourself to the max! Are you training for the Olympics?",
    themeColor: "text-[#E11D48]", // red
    illustrationSrc: "/crowning/man-thropy.svg",
    sparkleSvg: "/crowning/sparkle-athlete.svg",
    sparkles: [
  { top: "10%", left: "40%", size: "w-6 h-6", delay: 0, duration: 3 },
  { top: "25%", right: "22%", size: "w-3 h-3", delay: 0.5, duration: 4 },
  { bottom: "35%", left: "10%", size: "w-5 h-5", delay: 1, duration: 5 },
  { bottom: "12%", right: "30%", size: "w-4 h-4", delay: 1.2, duration: 4 },
  { bottom: "30%", left: "35%", size: "w-6 h-6", delay: 1.6, duration: 6 },
],
  },
];
