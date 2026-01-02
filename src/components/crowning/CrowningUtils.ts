import { crowningConfig, CrowningLevel, CrowningType } from "./CrowningConfig";

export function getCrowningByType(type: CrowningType): CrowningLevel {
  const result = crowningConfig.find((item) => item.type === type);

  if (!result) {
    throw new Error(`Crowning type "${type}" not found`);
  }

  return result;
}
