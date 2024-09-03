import React from 'react';

import styled from 'styled-components/native';

import { StatusBar } from 'expo-status-bar';

import { Theme } from './constants/styles/themes';
import MainNavigation from './navigations/MainNavigation';

const Main = (): JSX.Element => {
  return (
    <Container>
      <StatusBar style="auto" />
      <MainNavigation />
    </Container>
  );
};

export default Main;

const Container = styled.SafeAreaView<{ theme: Theme }>(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.backgroundColor,
}));
