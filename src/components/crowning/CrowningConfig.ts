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

export interface Illustration {
  src: string;
  inset: string;
  width: number;
}

export interface CrowningLevel {
  type: CrowningType;
  titleLine1: string;
  titleLine2: string;
  description: string;
  themeColor: string;
  illustrations: [Illustration, Illustration];
  sparkleSvg: string;
  sparkles: SparkleConfig[];
}

export const crowningConfig: CrowningLevel[] = [
  {
    type: "stretcher",
    titleLine1: "The Rising",
    titleLine2: "Newbie",
    description:
      "Sometimes you walk, sometimes you run, You move once in a while, but it still counts.",
    themeColor: "text-[#07C0FF]", // light blue
    illustrations: [
      {
        src: "/crowning/yoga.svg",
        inset: "auto auto 0 24px",
        width: 214,
      },
      {
        src: "/crowning/radio.svg",
        inset: "0 40px auto auto",
        width: 190,
      },
    ],
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
    titleLine1: "The Consistent",
    titleLine2: "Learner",
    description:
      "You enjoy trying different workouts to build healthy habits. That’s progress!",
    themeColor: "text-[#FF6A3D]", // orange
    illustrations: [
      {
        src: "/crowning/treadmill.svg",
        inset: "0 auto auto 76px",
        width: 104,
      },
      {
        src: "/crowning/run.svg",
        inset: "auto 55px 0 auto",
        width: 163,
      },
    ],
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
    titleLine1: "The Active",
    titleLine2: "Mover",
    description:
      "Work-life-exercise balanced! Even on busy days, you still exercise regularly.",
    themeColor: "text-[#7B6CF6]", // purple
    illustrations: [
      {
        src: "/crowning/barbel-sit.svg",
        inset: "0 auto auto 36px",
        width: 242,
      },
      {
        src: "/crowning/barbel-lift.svg",
        inset: "auto 35px 0 auto",
        width: 81,
      },
    ],
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
    titleLine1: "The Unstoppable",
    titleLine2: "Athlete",
    description: "Running today, gym tomorrow, tennis next! Exercise is your hobby.",
    themeColor: "text-[#2563EB]", // blue
    illustrations: [
      {
        src: "/crowning/wheel-push.svg",
        inset: "auto auto 0 34px",
        width: 200,
      },
      {
        src: "/crowning/barbel-lift-red.svg",
        inset: "auto 39px 0 auto",
        width: 89,
      },
    ],
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
    titleLine1: "The Legendary",
    titleLine2: "Champion",
    description:
      "Maximum efforts, minimum excuses.\n Olympian-consistency, runs in your blood",
    themeColor: "text-[#E11D48]", // red
    illustrations: [
      {
        src: "/crowning/thropy.svg",
        inset: "auto auto 0 43px",
        width: 185,
      },
      {
        src: "/crowning/meditation.svg",
        inset: "auto 37px 0 auto",
        width: 143,
      },
    ],
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
