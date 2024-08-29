/* eslint-disable @typescript-eslint/explicit-function-return-type */

/* eslint-disable react/react-in-jsx-scope */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Constants from 'expo-constants';

import Main from 'src/Main';

import * as Storybook from './.storybook';

const App = () => {
  return <Main />;
};

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled) {
  AppEntryPoint = Storybook.default;
}

export default AppEntryPoint;
