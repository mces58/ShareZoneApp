import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

import MaskedView from '@react-native-masked-view/masked-view';

import { CustomFlexStyle, CustomTextStyle } from 'src/constants/types/style-types';
import { calculateGradientEndpoints } from 'src/utils/calculate-gradient-endpoints';

interface GradientTextProps {
  colors: string[];
  text: string;
  flexStyle?: StyleProp<Partial<CustomFlexStyle>>;
  gradientDegree?: number;
  onPress?: () => void;
  textStyle?: StyleProp<Partial<CustomTextStyle>>;
}

const GradientText: React.FC<GradientTextProps> = (props) => {
  const {
    colors,
    text,
    flexStyle = {},
    gradientDegree = 90,
    onPress,
    textStyle = {},
  } = props;

  const flattenedFlexStyle = StyleSheet.flatten(flexStyle) as CustomFlexStyle;
  const flattenedTextStyle = StyleSheet.flatten(textStyle) as CustomTextStyle;

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <MaskedView
        maskElement={
          <StyledText flexStyle={flattenedFlexStyle} textStyle={flattenedTextStyle}>
            {text}
          </StyledText>
        }
      >
        <LinearGradient {...calculateGradientEndpoints(gradientDegree)} colors={colors}>
          <StyledText
            transparent
            flexStyle={flattenedFlexStyle}
            textStyle={flattenedTextStyle}
          >
            {text}
          </StyledText>
        </LinearGradient>
      </MaskedView>
    </TouchableOpacity>
  );
};

export default GradientText;

const StyledText = styled(Text)<{
  flexStyle: CustomFlexStyle;
  textStyle: CustomTextStyle;
  transparent?: boolean;
}>(({ flexStyle, textStyle, transparent }) => ({
  ...flexStyle,
  ...textStyle,
  opacity: transparent ? 0 : 1,
}));
