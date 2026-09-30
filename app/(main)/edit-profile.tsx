import { useState } from "react";

import { router } from "expo-router";

import { ArrowLeft, Camera } from "lucide-react-native";

import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { currentUser } from "@/components/data/User";

import HeaderActions from "@/components/ui/main/header-actions";

import UIButton from "@/components/ui/common/button";
import FormGroup from "@/components/ui/common/form/form-group";
import Input from "@/components/ui/common/form/input";
import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

const profileImage = require("@/assets/images/workout-dark.jpeg");

export default function EditProfile() {
  const themeColor = useThemeColor();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    router.back();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.background,
        },
      ]}
    >
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton} hitSlop={8}>
          <ArrowLeft size={25} color={themeColor.foreground} />
        </Pressable>

        <UIText style={styles.headerTitle}>Edit Profile</UIText>

        <HeaderActions />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.profileSection}>
          <View style={styles.imageWrapper}>
            <Image
              source={profileImage}
              style={[
                styles.profileImage,
                {
                  borderColor: themeColor.border,
                },
              ]}
            />

            <Pressable
              style={[
                styles.cameraButton,
                {
                  backgroundColor: themeColor.primary,
                },
              ]}
              hitSlop={8}
            >
              <Camera size={18} color={themeColor.black} />
            </Pressable>
          </View>

          <UIText
            style={[
              styles.changePhoto,
              {
                color: themeColor.foreground,
              },
            ]}
          >
            Change Photo
          </UIText>
        </View>

        <View style={styles.form}>
          <FormGroup label="Full Name">
            <Input
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
            />
          </FormGroup>

          <FormGroup label="Email">
            <Input
              placeholder="example@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </FormGroup>

          <FormGroup label="New Password">
            <Input
              placeholder="Enter password"
              isPassword
              value={password}
              onChangeText={setPassword}
            />
          </FormGroup>

          <UIText variant="muted" style={styles.passwordHint}>
            Leave blank if you do not want to change your password.
          </UIText>
        </View>

        <UIButton
          label="Save Changes"
          variant="primary"
          style={styles.saveButton}
          onPress={handleSave}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    minHeight: 60,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 4,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  profileSection: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 10,
  },

  imageWrapper: {
    position: "relative",
  },

  profileImage: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 1,
  },

  cameraButton: {
    position: "absolute",
    right: -2,
    bottom: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  changePhoto: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 8,
  },

  form: {
    marginTop: 22,
    gap: 14,
  },

  passwordHint: {
    fontSize: 10,
    lineHeight: 15,
    marginTop: -6,
  },

  saveButton: {
    width: "100%",
    height: 48,
    marginTop: 24,
  },
});
