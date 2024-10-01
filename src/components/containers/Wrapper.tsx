import React, { FC, ReactNode } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import styled from 'styled-components/native';

import { Theme } from 'src/constants/styles';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  const insets = useSafeAreaInsets();
  return <StyledContainer insets={insets}>{children}</StyledContainer>;
};

export default Wrapper;

const StyledContainer = styled(SafeAreaView)<{
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
