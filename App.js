/* eslint-disable @typescript-eslint/explicit-function-return-type */

/* eslint-disable react/react-in-jsx-scope */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useColorScheme } from 'react-native';

import { ThemeProvider } from 'styled-components/native';

import Constants from 'expo-constants';

import Main from 'src/Main';

import { DarkTheme, LightTheme } from 'src/constants/theme';

import * as Storybook from './.storybook';

const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
};

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled) {
  AppEntryPoint = Storybook.default;
}

export default AppEntryPoint;
