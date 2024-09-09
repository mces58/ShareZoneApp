import React, { useMemo } from 'react';
import { Platform, StyleProp, StyleSheet, TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

import {
  CustomFlexStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types/style-types';
import { calculateGradientEndpoints } from 'src/utils/calculate-gradient-endpoints';
import { shadowEffect } from 'src/utils/shadow-effect';

import { BaseText } from '../texts';

interface GradientButtonProps {
  colors: string[];
  onPress: () => void;
  text: string;
  flexStyle?: StyleProp<Partial<CustomFlexStyle>>;
  gradientDegree?: number;
  icon?: React.ReactNode;
  loading?: boolean;
  shadowStyle?: StyleProp<CustomShadowStyle>;
  textColors?: string;
  textStyle?: StyleProp<Partial<CustomTextStyle>>;
  viewStyle?: StyleProp<CustomViewStyle>;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  text,
  onPress,
  colors,
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
    <Button
      onPress={onPress}
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
        <BaseText
          text={text}
          textStyle={flattenedTextStyle}
          color={textColors}
          loading={loading}
        />
        {!loading && icon}
      </LinearGradient>
    </Button>
  );
};

export default GradientButton;

const Button = styled(TouchableOpacity)<{
  flexStyle: CustomFlexStyle;
  viewStyle: CustomViewStyle;
}>(({ flexStyle, viewStyle }) => ({
  ...flexStyle,
  ...viewStyle,
}));
