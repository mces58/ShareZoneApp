import React from 'react';
import { ScrollView, StyleProp, StyleSheet } from 'react-native';

import styled from 'styled-components/native';

import { Theme } from 'src/constants/styles';
import { CustomFlexStyle } from 'src/constants/types';

interface ScrollProps {
  children: React.ReactNode;
  flexStyle?: StyleProp<Partial<CustomFlexStyle>>;
}

const Scroll: React.FC<ScrollProps> = ({ children, flexStyle = {} }) => {
  const flattenedFlexStyle = StyleSheet.flatten(flexStyle) as CustomFlexStyle;

  return (
    <StyledContainer
      flexStyle={flattenedFlexStyle}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {children}
    </StyledContainer>
  );
};

export default Scroll;

const StyledContainer = styled(ScrollView)<{
  flexStyle: CustomFlexStyle;
  theme: Theme;
}>(({ flexStyle, theme }) => ({
  ...flexStyle,
  backgroundColor: theme.color.background,
}));
