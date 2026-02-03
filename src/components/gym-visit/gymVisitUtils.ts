import { gymVisitConfigs } from "./gymVisitConfig";

export function getGymVisitConfig(counter: number) {
  return (
    gymVisitConfigs.find(
      (cfg) => counter >= cfg.min && counter <= cfg.max,
    ) ?? gymVisitConfigs[0]
  );
}
