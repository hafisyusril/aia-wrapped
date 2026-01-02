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
    title: "Health\nin Check",
    background: "bg-pink-300",
    headerBackground: "bg-red-600",
    illustrationSrc: "/vhc/checked.svg",
    textColor: "text-black",
    message: "You completed\nyour Vitality Health Check.\nGreat job!",
  },
  {
    status: "unchecked",
    title: "Health\nUnchecked",
    background: "bg-gray-600",
    headerBackground: "bg-gray-800",
    illustrationSrc: "/vhc/unchecked.svg",
    textColor: "text-white",
    message:
      "You haven’t completed\nyour Vitality Health Check.\nLet’s do it in 2026!",
  },
];
