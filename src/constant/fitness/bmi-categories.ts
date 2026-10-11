import { Colors } from "../theme";

export const bmiCategories = [
  {
    name: "Underweight",
    color: Colors.green[700],
    indicator: "< 18.5",
    max: 18.4,
  },
  {
    name: "Normal",
    color: Colors.green[500],
    indicator: "18.5 - 22.9",
    max: 22.9,
  },
  {
    name: "Overweight",
    color: Colors.orange[500],
    indicator: "23.0 - 24.9",
    max: 24.9,
  },
  {
    name: "Obese",
    color: Colors.red[500],
    indicator: "> 25.0",
    max: 30.0,
  },
];
