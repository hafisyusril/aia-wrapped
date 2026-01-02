export function formatRank(rank?: number): string {
  if (!rank || rank <= 0) {
    return "-";
  }

  return `#${rank}`;
}
