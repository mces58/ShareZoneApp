import React from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

import MaskedView from '@react-native-masked-view/masked-view';

import { calculateGradientEndpoints } from 'src/utils/calculate-gradient-endpoints';

import { DefaultTextStyle } from './commonStyles';

interface GradientTextProps {
  colors: string[];
  text: string;
  gradientDegree?: number;
  onPress?: () => void;
  padding?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
  style?: StyleProp<typeof DefaultTextStyle>;
}

const GradientText: React.FC<GradientTextProps> = (props) => {
  const {
    colors,
    text,
    gradientDegree = 90,
    onPress,
    padding,
    style = DefaultTextStyle,
  } = props;

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <MaskedView
        maskElement={
          <StyledText style={StyleSheet.flatten(style)} padding={padding}>
            {text}
          </StyledText>
        }
      >
        <LinearGradient {...calculateGradientEndpoints(gradientDegree)} colors={colors}>
          <StyledText transparent style={StyleSheet.flatten(style)} padding={padding}>
            {text}
          </StyledText>
        </LinearGradient>
      </MaskedView>
    </TouchableOpacity>
  );
};

export default GradientText;

interface StyledTextProps {
  style: TextStyle;
  padding?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
  transparent?: boolean;
}

const StyledText = styled.Text<StyledTextProps>(({ transparent, padding, style }) => ({
  fontSize: style.fontSize,
  fontFamily: style.fontFamily,
  fontStyle: style.fontStyle,
  textDecorationLine: style.textDecorationLine,
  textTransform: style.textTransform,
  letterSpacing: style.letterSpacing,
  backgroundColor: 'transparent',
  opacity: transparent ? 0 : 1,
  paddingBottom: padding?.bottom || 0,
  paddingLeft: padding?.left || 0,
  paddingRight: padding?.right || 0,
  paddingTop: padding?.top || 0,
}));
