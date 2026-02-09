const STORAGE_KEY = "vitality-id-history";

export function saveVitalityId(id: string) {
  const raw = localStorage.getItem(STORAGE_KEY);
  const list: string[] = raw ? JSON.parse(raw) : [];

  const updated = [id, ...list.filter((v) => v !== id)].slice(0, 5);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getVitalityIdHistory(): string[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}
