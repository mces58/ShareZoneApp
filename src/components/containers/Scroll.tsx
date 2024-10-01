import React, { FC, ReactNode } from 'react';
import { ScrollView, StyleProp, StyleSheet } from 'react-native';

import styled from 'styled-components/native';

import { Theme } from 'src/constants/styles';
import { CustomFlexStyle } from 'src/constants/types';

interface ScrollProps {
  children: ReactNode;
  flexStyle?: StyleProp<Partial<CustomFlexStyle>>;
}

const Scroll: FC<ScrollProps> = ({ children, flexStyle = {} }) => {
  const flattenedFlexStyle = StyleSheet.flatten(flexStyle) as CustomFlexStyle;

  return (
    <StyledScroll
      flexStyle={flattenedFlexStyle}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {children}
    </StyledScroll>
  );
};

export default Scroll;

const StyledScroll = styled(ScrollView)<{
  flexStyle: CustomFlexStyle;
  theme: Theme;
}>(({ flexStyle, theme }) => ({
  ...flexStyle,
  backgroundColor: theme.color.background,
}));
