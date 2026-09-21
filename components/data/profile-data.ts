import {
  Bell,
  Clock3,
  CircleHelp,
  Dumbbell,
  FileText,
  Flame,
  Palette,
  Settings2,
} from "lucide-react-native";

export const profileStats = [
  {
    value: "24",
    label: "Workouts",
    icon: Dumbbell,
  },
  {
    value: "12",
    label: "Days Streak",
    icon: Flame,
  },
  {
    value: "36.5",
    label: "Hours",
    icon: Clock3,
  },
];

export const profileMenuItems = [
  {
    label: "Account Settings",
    icon: Settings2,
  },
  {
    label: "Notifications",
    icon: Bell,
  },
  {
    label: "Appearance",
    icon: Palette,
  },
  {
    label: "Help & Support",
    icon: CircleHelp,
  },
  {
    label: "Terms & Privacy",
    icon: FileText,
  },
];

export const profileData = {
  name: "Rama",
  email: "rama@email.com",
  goal: "Muscle Gain",
  goalDescription: "Stay consistent and reach your goal.",
  goalProgress: 60,
};
