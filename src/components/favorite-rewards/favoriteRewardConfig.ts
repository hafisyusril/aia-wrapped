export interface FavoriteRewardData {
  background: string;
  headerBackground: string;
  illustrationSrc: string;
  title: string;
  message: string[];
  stores: string[];
}

export const favoriteReward: FavoriteRewardData = {
  background: "bg-[#E0F7FA]",
  headerBackground: "bg-[#00ACC1]",
  illustrationSrc: "/favorite-rewards/shopping.jpg",
  title: "Toni's Shopping Spree!",
  message: [
    "Toni had a blast spending his hard-earned rewards!",
    "From online malls to daily essentials, here's where the points went:",
  ],
  stores: ["Tokopedia", "Shopee", "Bukalapak", "Lazada"],
};
