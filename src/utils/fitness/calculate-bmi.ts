export function calculateBmi({
  height,
  weight,
}: {
  height: number;
  weight: number;
}) {
  return weight / Math.pow(height / 100, 2);
}
