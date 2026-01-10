export type VHCStatus = "checked" | "unchecked";

export interface VHCStatusLevel {
  status: VHCStatus;
  title: string;
  background: string;
  headerBackground: string;
  illustrationSrc: string;
  textColor: string;
  message: string;
}

export const vhcStatusConfig: VHCStatusLevel[] = [
  {
    status: "checked",
    title: "You have completed AIA Vitality Health Check",
    background: "bg-pink-300",
    headerBackground: "bg-red-600",
    illustrationSrc: "/vhc/checked.svg",
    textColor: "text-black",
    message: "Your future self says thank you!\nLet’s do it again in 2026!",
  },
  {
    status: "unchecked",
    title: "You haven’t completed AIA Vitality Health Check",
    background: "bg-gray-600",
    headerBackground: "bg-gray-800",
    illustrationSrc: "/vhc/unchecked.svg",
    textColor: "text-white",
    message: "You’re busy. We get it.\n Let’s do it in 2026!",
  },
];
