import { OnboardingScreen } from "@/component/screen/onboarding-screen";
import {
  FormGroup,
  Input,
  Label,
  Text,
  ToggleGroup,
  ToggleGroupButton,
  View,
} from "@/component/ui";
import { Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { MarsIcon, VenusIcon } from "lucide-react-native";

export default function Onboarding() {
  const themeColor = useThemeColor();

  return (
    <OnboardingScreen
      title="Tell Us About You"
      description="Enter your data to create a personalized workout plan."
    >
      <View style={{ gap: 14 }}>
        <FormGroup>
          <Label required>Birth Date</Label>
          <Input placeholder="Select your birth date" />
        </FormGroup>

        <FormGroup>
          <Label>Gender</Label>
          <ToggleGroup>
            <ToggleGroupButton value="male">
              <MarsIcon color={themeColor.foreground} size={Fonts.size.sm} />
              <Text>Male</Text>
            </ToggleGroupButton>
            <ToggleGroupButton value="female">
              <VenusIcon color={themeColor.foreground} size={Fonts.size.sm} />
              <Text>Female</Text>
            </ToggleGroupButton>
          </ToggleGroup>
        </FormGroup>

        <FormGroup>
          <Label required>Height (cm)</Label>
          <Input placeholder="Enter your height" />
        </FormGroup>

        <FormGroup>
          <Label required>Weight (kg)</Label>
          <Input placeholder="Enter your weight" />
        </FormGroup>
      </View>
    </OnboardingScreen>
  );
}
