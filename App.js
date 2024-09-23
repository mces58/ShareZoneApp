import React, { useCallback, useEffect, useState } from 'react';
import { LogBox, useColorScheme, View } from 'react-native';

import { ThemeProvider } from 'styled-components/native';

import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider, I18nProvider } from 'src/contexts';
import { loadFonts } from 'src/utils';

import { DarkTheme, LightTheme, THEMES } from 'src/constants/styles';
import RootNavigation from 'src/navigations/RootNavigation';

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
      <AuthProvider>
        <I18nProvider>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <RootNavigation />
          </View>
        </I18nProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled) {
  SplashScreen.hideAsync();
  LogBox.ignoreLogs([
    'fontFamily',
    'Expected style',
    'Node of type rule not supported as an inline style',
  ]);
  AppEntryPoint = Storybook.default;
}

export default AppEntryPoint;
