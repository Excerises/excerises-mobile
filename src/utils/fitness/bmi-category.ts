import { bmiCategories } from "@/constant/fitness/bmi-categories";

export function getBmiCategory(bmi: number) {
  for (const c of bmiCategories) {
    if (bmi <= c.max) {
      return c;
    }
  }

  return bmiCategories[bmiCategories.length - 1];
}
