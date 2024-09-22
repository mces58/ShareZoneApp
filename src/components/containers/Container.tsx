import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';

import styled from 'styled-components/native';

import { shadowEffect } from 'src/utils';

import {
  CustomFlexStyle,
  CustomShadowStyle,
  CustomViewStyle,
} from 'src/constants/types/style-types';

interface ContainerProps {
  children: React.ReactNode;
  flexStyle?: StyleProp<Partial<CustomFlexStyle>>;
  shadowStyle?: StyleProp<Partial<CustomShadowStyle>>;
  viewStyle?: StyleProp<Partial<CustomViewStyle>>;
}

const Container: React.FC<ContainerProps> = ({
  children,
  flexStyle = {},
  shadowStyle = {},
  viewStyle = {},
}) => {
  const flattenedFlexStyle = StyleSheet.flatten(flexStyle) as CustomFlexStyle;
  const flattenedViewStyle = StyleSheet.flatten(viewStyle) as CustomViewStyle;
  const flattenedShadowStyle = StyleSheet.flatten(shadowStyle) as CustomShadowStyle;

  const shadowEffectValue = useMemo(
    () =>
      shadowEffect({
        elevation: flattenedShadowStyle.elevation,
        shadowColor: flattenedShadowStyle.shadowColor,
        shadowOffset: flattenedShadowStyle.shadowOffset,
        shadowOpacity: flattenedShadowStyle.shadowOpacity,
        shadowRadius: flattenedShadowStyle.shadowRadius,
      }),
    [flattenedShadowStyle]
  );

  return (
    <StyledContainer
      flexStyle={flattenedFlexStyle}
      viewStyle={flattenedViewStyle}
      style={shadowEffectValue}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;

const StyledContainer = styled(View)<{
  flexStyle: CustomFlexStyle;
  viewStyle: CustomViewStyle;
}>(({ flexStyle, viewStyle }) => ({
  ...flexStyle,
  ...viewStyle,
}));
