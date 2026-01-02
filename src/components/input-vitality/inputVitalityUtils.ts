export function submitVitalityId(vitalityId: string): void {
  if (!vitalityId.trim()) {
    return;
  }

  // sementara: logging
  console.log("Vitality ID:", vitalityId);

  // next step nanti:
  // - set global state
  // - navigate slide
  // - call backend
}
