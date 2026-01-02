export type VHCStatus = "checked" | "unchecked";

export interface VHCStatusContent {
  title: string;
  background: string;
  headerBackground: string;
  illustrationSrc: string;
  textColor: string;
  message: string;
}

export const VHC_STATUS_CONFIG: Record<VHCStatus, VHCStatusContent> = {
  checked: {
    title: "Health\nin Check",
    background: "bg-pink-300",
    headerBackground: "bg-red-600",
    illustrationSrc: "/vhc/checked.svg",
    textColor: "text-black",
    message: "You completed\nyour Vitality Health Check.\nGreat job!",
  },
  unchecked: {
    title: "Health\nUnchecked",
    background: "bg-gray-600",
    headerBackground: "bg-gray-800",
    illustrationSrc: "/vhc/unchecked.svg",
    textColor: "text-white",
    message:
      "You haven’t completed\nyour Vitality Health Check.\nLet’s do it in 2026!",
  },
};
