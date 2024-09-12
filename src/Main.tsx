import React from 'react';

import styled, { useTheme } from 'styled-components/native';

import { StatusBar } from 'expo-status-bar';

import { Theme } from './constants/styles/themes';
import MainNavigation from './navigations/MainNavigation';

const Main = (): JSX.Element => {
  const theme = useTheme() as Theme;
  return (
    <Container>
      <StatusBar style="auto" backgroundColor={theme.color.background} />
      <MainNavigation />
    </Container>
  );
};

export default Main;

const Container = styled.SafeAreaView<{ theme: Theme }>(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.color.background,
}));
