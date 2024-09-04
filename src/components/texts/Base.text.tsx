import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

import styled, { useTheme } from 'styled-components/native';

import { DefaultTextStyle } from './commonStyles';

interface BaseTextProps {
  text: string;
  color?: string;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  hasShadow?: boolean;
  numberOfLines?: number;
  padding?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
  style?: StyleProp<typeof DefaultTextStyle>;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
}

const BaseText: React.FC<BaseTextProps> = (props) => {
  const theme = useTheme();
  const {
    text,
    color = theme.textColor,
    ellipsizeMode,
    hasShadow = false,
    numberOfLines,
    padding,
    style = DefaultTextStyle,
    textAlign = 'left',
  } = props;

  return (
    <StyledText
      color={color}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      hasShadow={hasShadow}
      padding={padding}
      style={StyleSheet.flatten(style)}
      textAlign={textAlign}
    >
      {text}
    </StyledText>
  );
};

export default BaseText;

interface StyledTextProps {
  color: string;
  hasShadow: boolean;
  style: TextStyle;
  textAlign: 'left' | 'right' | 'center' | 'justify';
  padding?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
}

const StyledText = styled.Text<StyledTextProps>(
  ({ style, hasShadow, textAlign, color, padding }) => ({
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    fontStyle: style.fontStyle,
    textDecorationLine: style.textDecorationLine,
    textTransform: style.textTransform,
    letterSpacing: style.letterSpacing,
    textAlign,
    color,
    textShadow: hasShadow ? '3px 3px 4px rgba(0, 0, 0, 0.5)' : 'none',
    paddingBottom: padding?.bottom || 0,
    paddingLeft: padding?.left || 0,
    paddingRight: padding?.right || 0,
    paddingTop: padding?.top || 0,
  })
);
