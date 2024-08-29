import React from 'react';

import styled from 'styled-components/native';

import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import Button from 'src/components/Button';

import * as Storybook from './.storybook';

const App = (): JSX.Element => {
  return (
    <Container>
      <Button />
      <StatusBar style="auto" />
    </Container>
  );
};

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.storybookEnabled) {
  AppEntryPoint = Storybook.default;
}

export default AppEntryPoint;

const Container = styled.View({
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
});
