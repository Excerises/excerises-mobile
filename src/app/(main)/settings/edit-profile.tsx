import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  Label,
  Separator,
  Text,
  View,
} from "@/component/ui";
import { Colors } from "@/constant/theme";
import { useAuth } from "@/context/auth-context";
import { useUpdateProfileAuth } from "@/hook/api/profile/use-update-profile";
import { useEditAuthForm } from "@/hook/form/auth/use-profile-form";
import { useThemeColor } from "@/hook/use-theme-color";
import { useRouter } from "expo-router";
import { SparklesIcon, UserRoundIcon } from "lucide-react-native";
import { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { control, setValue, setError, handleSubmit } = useEditAuthForm();
  const { user } = useAuth();
  const themeColor = useThemeColor();
  const router = useRouter();

  const { mutation } = useUpdateProfileAuth();

  const handleSave = handleSubmit(async (v) => {
    if (v.password !== v.password_confirmation) {
      setError("password_confirmation", {
        message: "Password confirmation missmatch",
      });
      return;
    }

    try {
      await mutation.mutateAsync(v);
      router.back();
    } catch (_) {
      //
    }
  });

  useEffect(() => {
    setValue("name", user?.name || "");
  }, [user]);

  return (
    <HomeScreen canBack title={<HomeScreenTitle>Edit Profile</HomeScreenTitle>}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView edges={["bottom"]}>
          {/* <View style={styles.hero}> */}
          {/*   <View variant="ghost" style={styles.heroIconContainer}> */}
          {/*     <View */}
          {/*       variant="ghost" */}
          {/*       style={[ */}
          {/*         styles.heroIcon, */}
          {/*         { */}
          {/*           backgroundColor: `${themeColor.primary}22`, */}
          {/*           borderColor: themeColor.primary, */}
          {/*         }, */}
          {/*       ]} */}
          {/*     > */}
          {/*       <UserRoundIcon */}
          {/*         size={34} */}
          {/*         color={themeColor.primary} */}
          {/*         strokeWidth={1.7} */}
          {/*       /> */}
          {/*     </View> */}
          {/*     <View */}
          {/*       style={[ */}
          {/*         styles.sparkleBadge, */}
          {/*         { backgroundColor: themeColor.primary }, */}
          {/*       ]} */}
          {/*       variant="ghost" */}
          {/*     > */}
          {/*       <SparklesIcon size={15} color={Colors.white} /> */}
          {/*     </View> */}
          {/*   </View> */}
          {/**/}
          {/*   <Text style={styles.heroTitle} size="lg" variant="primary"> */}
          {/*     Personal Information */}
          {/*   </Text> */}
          {/*   <Text style={styles.heroSubtitle} size="sm" variant="muted"> */}
          {/*     Keep your profile up to date and manage your account details. */}
          {/*   </Text> */}
          {/* </View> */}

          <View style={styles.formCard} variant="card">
            <View style={styles.sectionHeader} variant="ghost">
              <View
                variant="ghost"
                style={[
                  styles.sectionIndicator,
                  { backgroundColor: themeColor.primary },
                ]}
              />
              <Text style={styles.sectionTitle}>Basic Details</Text>
            </View>

            <View variant="ghost" style={{ gap: 8 }}>
              <FormControl
                control={control}
                name="name"
                label="Full Name"
                required
                render={({ field }) => (
                  <Input
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="Enter your full name"
                  />
                )}
              />

              <FormGroup>
                <Label>Email</Label>
                <Input value={user?.email} disabled />
              </FormGroup>
            </View>

            <View style={styles.sectionDivider}>
              <Separator />
            </View>

            <View variant="ghost" style={styles.sectionHeader}>
              <View
                style={[
                  styles.sectionIndicator,
                  { backgroundColor: themeColor.primary },
                ]}
              />
              <Text style={styles.sectionTitle}>Security Settings</Text>
            </View>

            <Text variant="muted" size="xs" style={{ marginBottom: 14 }}>
              Leave password fields empty if you don{"'"}t want to change your
              password.
            </Text>

            <View style={{ gap: 8 }} variant="ghost">
              <FormControl
                control={control}
                name="password"
                label="New Password"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="Enter new password"
                    password
                  />
                )}
              />

              <FormControl
                control={control}
                name="password_confirmation"
                label="Confirm Password"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="Re-enter new password"
                    password
                  />
                )}
              />
            </View>
          </View>

          <Button
            full
            size="xl"
            disabled={mutation.isPending}
            onPress={handleSave}
          >
            <Text weight="semibold">Save Changes</Text>
          </Button>

          <TouchableOpacity
            style={styles.cancelButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 28,
  },
  heroIconContainer: {
    position: "relative",
    marginBottom: 18,
  },
  heroIcon: {
    width: 88,
    height: 88,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sparkleBadge: {
    position: "absolute",
    right: -5,
    bottom: -3,
    width: 30,
    height: 30,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    fontWeight: "800",
    letterSpacing: -0.8,
    marginBottom: 8,
  },
  heroSubtitle: {
    lineHeight: 21,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  formCard: {
    borderRadius: 25,
    padding: 20,
    elevation: 3,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 9,
  },
  sectionIndicator: {
    width: 5,
    height: 20,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  fieldContainer: {
    marginBottom: 19,
  },
  sectionDivider: {
    height: 1,
    marginTop: 18,
    marginBottom: 18,
  },
  saveIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    marginTop: 4,
  },
  cancelButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
