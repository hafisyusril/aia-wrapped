export function formatCurrency(
  amount?: number,
  locale: string = "id-ID"
): string {
  if (!amount || amount <= 0) {
    return "0";
  }

  return amount.toLocaleString(locale);
}
