import {
  VHCStatus,
  VHCStatusContent,
  VHC_STATUS_CONFIG,
} from "./VHCStatusConfig";

export function getVHCStatusContent(status: VHCStatus): VHCStatusContent {
  return VHC_STATUS_CONFIG[status];
}
