import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

import MaskedView from '@react-native-masked-view/masked-view';
import { calculateGradientEndpoints } from 'src/utils';

import { CustomFlexStyle, CustomTextStyle } from 'src/constants/types';

interface GradientTextProps {
  colors: string[];
  text: string;
  flexStyle?: StyleProp<Partial<CustomFlexStyle>>;
  gradientDegree?: number;
  loading?: boolean;
  onPress?: () => void;
  textStyle?: StyleProp<Partial<CustomTextStyle>>;
}

const GradientText: React.FC<GradientTextProps> = (props) => {
  const {
    colors,
    text,
    flexStyle = {},
    gradientDegree = 90,
    loading = false,
    onPress,
    textStyle = {},
  } = props;

  const flattenedFlexStyle = StyleSheet.flatten(flexStyle) as CustomFlexStyle;
  const flattenedTextStyle = StyleSheet.flatten(textStyle) as CustomTextStyle;

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      {loading ? (
        <ActivityIndicator color={colors[0]} size="small" />
      ) : (
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
      )}
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
