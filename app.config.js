export const expo = {
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
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
  plugins: ['expo-localization'],
};
