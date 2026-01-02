import { stepsConfig } from "./stepsConfig";

export function getStepsConfig(steps: number) {
  return stepsConfig.find((level) => steps < level.max) ?? stepsConfig.at(-1)!;
}
