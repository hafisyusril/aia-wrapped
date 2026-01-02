import {
  CrowningType,
  CROWNING_CONFIG,
  CrowningContent,
} from "./CrowningConfig";

export function getCrowningContent(type: CrowningType): CrowningContent {
  return CROWNING_CONFIG[type];
}
