import { VHCStatus, VHCStatusLevel, vhcStatusConfig } from "./vhcStatusConfig";

export function getVHCStatusContent(status: VHCStatus): VHCStatusLevel {
  const content = vhcStatusConfig.find((item) => item.status === status);

  if (!content) {
    throw new Error(`VHC status "${status}" not found`);
  }

  return content;
}
