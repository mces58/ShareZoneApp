import React, { FC } from 'react';
import {
  ActivityIndicator,
  Text as RNText,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import styled, { useTheme } from 'styled-components/native';

import { Theme } from 'src/constants/styles';
import { CustomFlexStyle, CustomTextStyle } from 'src/constants/types';

interface TextProps {
  text: string;
  color?: string;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  flexStyle?: StyleProp<Partial<CustomFlexStyle>>;
  loading?: boolean;
  numberOfLines?: number;
  onPress?: () => void;
  textStyle?: StyleProp<Partial<CustomTextStyle>>;
}

const Text: FC<TextProps> = (props) => {
  const theme = useTheme() as Theme;
  const {
    text,
    color = theme.color.text,
    ellipsizeMode,
    flexStyle = {},
    loading = false,
    numberOfLines,
    onPress,
    textStyle = {},
  } = props;

  const flattenedFlexStyle = StyleSheet.flatten(flexStyle) as CustomFlexStyle;
  const flattenedTextStyle = StyleSheet.flatten(textStyle) as CustomTextStyle;

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      {loading ? (
        <ActivityIndicator color={color} size="small" />
      ) : (
        <StyledText
          color={color}
          numberOfLines={numberOfLines}
          ellipsizeMode={ellipsizeMode}
          flexStyle={flattenedFlexStyle}
          textStyle={flattenedTextStyle}
        >
          {text}
        </StyledText>
      )}
    </TouchableOpacity>
  );
};

export default Text;

const StyledText = styled(RNText)<{
  color: string;
  flexStyle: CustomFlexStyle;
  textStyle: CustomTextStyle;
}>(({ color, flexStyle, textStyle }) => ({
  color,
  ...flexStyle,
  ...textStyle,
}));
