const expoConfig = require("eslint-config-expo/flat");

module.exports = [
  ...expoConfig,
  {
    ignores: ["dist/**", "dist-web/**", ".expo/**", ".expo-home/**", "node_modules/**", ".npm-cache/**"]
  }
];
