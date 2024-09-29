import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

import { shadowEffect } from 'src/utils';

import BaseText from '../texts/Base';
import {
  CustomFlexStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types';

interface BaseButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  flexStyle?: StyleProp<Partial<CustomFlexStyle>>;
  icon?: React.ReactNode;
  loading?: boolean;
  shadowStyle?: StyleProp<Partial<CustomShadowStyle>>;
  textColors?: string;
  textStyle?: StyleProp<Partial<CustomTextStyle>>;
  viewStyle?: StyleProp<Partial<CustomViewStyle>>;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  onPress,
  text,
  disabled = false,
  flexStyle = {},
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
      disabled={disabled}
      flexStyle={flattenedFlexStyle}
      viewStyle={flattenedViewStyle}
      style={[
        shadowEffectValue,
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}
    >
      <BaseText
        text={text}
        color={textColors}
        textStyle={flattenedTextStyle}
        loading={loading}
      />
      {!loading && icon}
    </Button>
  );
};

export default BaseButton;

const Button = styled(TouchableOpacity)<{
  flexStyle: CustomFlexStyle;
  viewStyle: CustomViewStyle;
}>(({ flexStyle, viewStyle }) => ({
  ...flexStyle,
  ...viewStyle,
}));
