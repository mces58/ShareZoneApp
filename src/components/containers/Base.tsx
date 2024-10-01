import React, { FC, ReactNode } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import styled from 'styled-components/native';

import { Theme } from 'src/constants/styles';

interface BaseContainerProps {
  children: ReactNode;
}

const BaseContainer: FC<BaseContainerProps> = ({ children }) => {
  const insets = useSafeAreaInsets();
  return <Container insets={insets}>{children}</Container>;
};

export default BaseContainer;

const Container = styled(SafeAreaView)<{
  insets: { bottom: number; left: number; right: number; top: number };
  theme: Theme;
}>(({ insets, theme }) => ({
  flex: 1,
  paddingTop: insets.top,
  paddingLeft: insets.left,
  paddingRight: insets.right,
  paddingBottom: insets.bottom,
  backgroundColor: theme.color.background,
}));
