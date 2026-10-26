import type { ComponentType } from "react";
import type { CalculatorMeta } from "@/content/calculators";
import { SipCalculator } from "./SipCalculator";
import { LumpsumCalculator } from "./LumpsumCalculator";
import { GoalCalculator } from "./GoalCalculator";
import { RetirementCalculator } from "./RetirementCalculator";
import { EducationCalculator } from "./EducationCalculator";
import { CrorepatiCalculator } from "./CrorepatiCalculator";
import { SwpCalculator } from "./SwpCalculator";

export const calculatorComponents: Record<CalculatorMeta["slug"], ComponentType> = {
  sip: SipCalculator,
  lumpsum: LumpsumCalculator,
  goal: GoalCalculator,
  retirement: RetirementCalculator,
  education: EducationCalculator,
  crorepati: CrorepatiCalculator,
  swp: SwpCalculator,
};
