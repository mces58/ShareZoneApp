import React, { FC, ReactNode, useMemo } from 'react';
import { Platform, StyleProp, StyleSheet, TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

import { calculateGradientEndpoints, shadowEffect } from 'src/utils';

import {
  CustomFlexStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types';

import { Text } from '../texts';

interface GradientButtonProps {
  colors: string[];
  onPress: () => void;
  text: string;
  disabled?: boolean;
  flexStyle?: StyleProp<Partial<CustomFlexStyle>>;
  gradientDegree?: number;
  icon?: ReactNode;
  loading?: boolean;
  shadowStyle?: StyleProp<Partial<CustomShadowStyle>>;
  textColors?: string;
  textStyle?: StyleProp<Partial<CustomTextStyle>>;
  viewStyle?: StyleProp<Partial<CustomViewStyle>>;
}

const GradientButton: FC<GradientButtonProps> = ({
  colors,
  onPress,
  text,
  disabled = false,
  flexStyle = {},
  gradientDegree = 90,
  icon,
  loading = false,
  shadowStyle = {},
  textColors,
  textStyle = {},
  viewStyle = {},
}) => {
  const flattenedFlexStyle = StyleSheet.flatten(flexStyle) as CustomFlexStyle;
  const flattenedShadowStyle = StyleSheet.flatten(shadowStyle) as CustomShadowStyle;
  const flattenedTextStyle = StyleSheet.flatten(textStyle) as CustomTextStyle;
  const flattenedViewStyle = StyleSheet.flatten(viewStyle) as CustomViewStyle;

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
    <StyledButton
      onPress={onPress}
      disabled={disabled}
      flexStyle={flattenedFlexStyle}
      viewStyle={flattenedViewStyle}
      style={Platform.OS === 'ios' ? shadowEffectValue : {}}
    >
      <LinearGradient
        {...calculateGradientEndpoints(gradientDegree)}
        colors={colors}
        style={[
          flattenedFlexStyle,
          {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          },
          flattenedViewStyle,
          Platform.OS === 'android' ? shadowEffectValue : {},
        ]}
      >
        <Text
          text={text}
          textStyle={flattenedTextStyle}
          color={textColors}
          loading={loading}
        />
        {!loading && icon}
      </LinearGradient>
    </StyledButton>
  );
};

export default GradientButton;

const StyledButton = styled(TouchableOpacity)<{
  flexStyle: CustomFlexStyle;
  viewStyle: CustomViewStyle;
}>(({ flexStyle, viewStyle }) => ({
  ...flexStyle,
  ...viewStyle,
}));
