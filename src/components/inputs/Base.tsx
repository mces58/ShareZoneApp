import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { Animated, StyleProp, StyleSheet, TextInput } from 'react-native';

import styled, { useTheme } from 'styled-components/native';

import { COLORS } from 'src/constants/styles/colors';
import { Theme } from 'src/constants/styles/themes';
import {
  CustomFlexStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types/style-types';
import { scaleByAspectRatio, scaleProportionally } from 'src/utils/dimensions';

import { Container } from '../containers';

interface BaseInputProps {
  onChangeText: (text: string) => void;
  placeholder: string;
  text: string;
  extraIcon?: ReactNode;
  flexStyle?: StyleProp<Pick<CustomFlexStyle, 'alignSelf' | 'width' | 'height'>>;
  icon?: ReactNode;
  isSecureText?: boolean;
  shadowStyle?: StyleProp<Partial<CustomShadowStyle>>;
  textStyle?: StyleProp<Partial<CustomTextStyle>>;
  viewStyle?: StyleProp<Partial<CustomViewStyle>>;
}

const BaseInput: React.FC<BaseInputProps> = ({
  onChangeText,
  placeholder,
  text,
  extraIcon,
  flexStyle = {},
  icon,
  isSecureText = false,
  shadowStyle = {},
  textStyle = {},
  viewStyle = {},
}) => {
  const theme = useTheme() as Theme;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const placeholderTop = useRef(new Animated.Value(0)).current;
  const placeholderLeft = useRef(new Animated.Value(scaleByAspectRatio(5))).current;
  const placeholderFontSize = useRef(
    new Animated.Value(theme.common.font.sizes._16)
  ).current;

  const flattenedFlexStyle = StyleSheet.flatten(flexStyle);
  const flattenedShadowStyle = StyleSheet.flatten(shadowStyle);
  const flattenedTextStyle = StyleSheet.flatten(textStyle);
  const flattenedViewStyle = StyleSheet.flatten(viewStyle);

  useEffect(() => {
    const toValueTop = isFocused || text ? -scaleByAspectRatio(12) : 0;
    const toValueLeft = isFocused || text ? 0 : scaleByAspectRatio(5);
    const toValueFontSize =
      isFocused || text ? theme.common.font.sizes._12 : theme.common.font.sizes._18;

    Animated.parallel([
      Animated.timing(placeholderTop, {
        toValue: toValueTop,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(placeholderLeft, {
        toValue: toValueLeft,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(placeholderFontSize, {
        toValue: toValueFontSize,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isFocused, text, placeholderTop, placeholderLeft, placeholderFontSize, theme]);

  return (
    <Container
      flexStyle={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          paddingHorizontal: scaleProportionally(15),
          gap: scaleProportionally(5),
        },
        flattenedFlexStyle,
      ]}
      shadowStyle={flattenedShadowStyle}
      viewStyle={[
        {
          backgroundColor: theme.color.background,
          borderColor: isFocused ? COLORS.ORANGE._400 : theme.color.border,
        },
        flattenedViewStyle,
      ]}
    >
      {icon &&
        React.cloneElement(icon as ReactElement, {
          color: {
            mono: isFocused ? theme.color.textMuted : theme.color.textMuted,
          },
          fillColor: isFocused ? COLORS.ORANGE._400 : 'transparent',
        })}
      <Container flexStyle={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <AnimatedPlaceholder
          style={{
            top: placeholderTop,
            left: placeholderLeft,
            fontSize: placeholderFontSize,
          }}
        >
          {placeholder}
        </AnimatedPlaceholder>
        <Input
          value={text}
          onChangeText={onChangeText}
          textStyle={flattenedTextStyle}
          secureTextEntry={isSecureText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </Container>
      {extraIcon && extraIcon}
    </Container>
  );
};

export default BaseInput;

const AnimatedPlaceholder = styled(Animated.Text)<{ theme: Theme }>(({ theme }) => ({
  position: 'absolute',
  color: theme.color.textMuted,
  fontFamily: theme.common.font.families.regular,
}));

const Input = styled(TextInput)<{ textStyle: CustomTextStyle; theme: Theme }>(
  ({ textStyle, theme }) => ({
    flex: 1,
    color: theme.color.text,
    fontFamily: theme.common.font.families.medium,
    fontSize: theme.common.font.sizes._16,
    ...textStyle,
  })
);
