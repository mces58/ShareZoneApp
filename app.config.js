export default {
  owner: 'mces58',
  name: 'ShareZoneApp',
  slug: 'ShareZoneApp',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/app-icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.sharezoneapp',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.sharezoneapp',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
  plugins: ['expo-localization'],
};
