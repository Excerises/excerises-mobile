import { defineConfig } from "oxlint";
import oxlintConfig from "oxlint-config-universe/native";

export default defineConfig({
  extends: [oxlintConfig],
  ignorePatterns: ["dist/*"],
});
