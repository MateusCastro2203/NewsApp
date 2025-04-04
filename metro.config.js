const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Combine as configurações do NativeWind e Reanimated
const config = wrapWithReanimatedMetroConfig({
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
  },
});

module.exports = withNativeWind(config, { input: "./global.css" });
