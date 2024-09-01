import React, { useCallback, useEffect, useState } from 'react';
import { useColorScheme, View } from 'react-native';

import { ThemeProvider } from 'styled-components/native';

import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';

import Main from 'src/Main';

import { DarkTheme, LightTheme, THEMES } from 'src/constants/styles/themes';
import { I18nProvider } from 'src/contexts/i18n-context';
import { loadFonts } from 'src/utils/load-fonts';

import * as Storybook from './.storybook';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === THEMES.DARK ? DarkTheme : LightTheme;

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <I18nProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Main />
        </View>
      </I18nProvider>
    </ThemeProvider>
  );
};

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled) {
  AppEntryPoint = Storybook.default;
}

export default AppEntryPoint;
