export type CrowningType = "warming-up" | "rajin-gerak" | "paling-atlet";

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
    type: "warming-up",
    titleLine1: "Si Baru",
    titleLine2: "Warming-Up",
    description:
      "Part paling pentingnya: kamu udah mulai olahraga. Kalau udah nemu ritemnya, pasti makin semangat hidup sehat!",
    themeColor: "text-[#00AEEF]",
    illustrationSrc: "/crowning/yoga_radio.svg",
  },
  {
    type: "rajin-gerak",
    titleLine1: "Si Rajin",
    titleLine2: "Gerak",
    description:
      "Kamu jago jaga ritem, udah konsisten olahraga, tinggal tingkatin intensitas dan rutin finish Weekly Challenge-nya!",
    themeColor: "text-[#FF7F00]",
    illustrationSrc: "/crowning/treadmill_run.svg",
  },
  {
    type: "paling-atlet",
    titleLine1: "Si Paling",
    titleLine2: "Atlet",
    description:
      "Kamu totalitas 110% buat hidup sehat, rata-rata aktivitas olahraga kamu di zona intens. Bener-bener push to the max!",
    themeColor: "text-[#E60000]",
    illustrationSrc: "/crowning/barbel.svg",
  },
];
