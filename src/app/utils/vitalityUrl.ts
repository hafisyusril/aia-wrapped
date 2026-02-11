function randomNumeric(length: number) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10); // 0–9
  }
  return result;
}

export function encodeVitalityId(vitalityId: string) {
  const PREFIX_LENGTH = 4;
  const SUFFIX_LENGTH = 5;

  const prefix = Math.random()
    .toString(36)
    .slice(2, 2 + PREFIX_LENGTH);
  const suffix = randomNumeric(SUFFIX_LENGTH);

  return `${prefix}${vitalityId}${suffix}`;
}

export function decodeVitalityId(encoded?: string | null) {
  if (!encoded) return null;

  const PREFIX_LENGTH = 4;
  const SUFFIX_LENGTH = 5;

  if (encoded.length <= PREFIX_LENGTH + SUFFIX_LENGTH) return null;

  return encoded.slice(PREFIX_LENGTH, -SUFFIX_LENGTH);
}
