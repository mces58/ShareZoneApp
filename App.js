import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { ThemeProvider } from 'styled-components/native';

import Constants from 'expo-constants';

import Main from 'src/Main';

import { DarkTheme, LightTheme } from 'src/constants/theme';
import { I18nProvider } from 'src/context/i18n-context';
import { loadFonts } from 'src/utils/load-fonts';

import * as Storybook from './.storybook';

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <I18nProvider>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </I18nProvider>
  );
};

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled) {
  AppEntryPoint = Storybook.default;
}

export default AppEntryPoint;
