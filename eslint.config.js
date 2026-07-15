const expoConfig = require("eslint-config-expo/flat");

module.exports = [
  ...expoConfig,
  {
    ignores: ["dist/**", "dist-web/**", "screenshots/**", ".expo/**", ".expo-home/**", "node_modules/**", ".npm-cache/**"]
  }
];
