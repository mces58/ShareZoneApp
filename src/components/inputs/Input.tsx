import React, {
  Dispatch,
  FC,
  ReactElement,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Animated, StyleProp, StyleSheet, TextInput } from 'react-native';

import styled, { useTheme } from 'styled-components/native';

import {
  formatPhoneNumber,
  scaleByAspectRatio,
  scaleHeight,
  scaleProportionally,
  scaleWidth,
} from 'src/utils';

import { COLORS, Theme } from 'src/constants/styles';
import {
  CustomFlexStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types';

import { Container } from '../containers';

interface InputProps {
  onChangeText: Dispatch<SetStateAction<string>>;
  placeholder: string;
  text: string;
  extraIcon?: ReactNode;
  flexStyle?: StyleProp<Pick<CustomFlexStyle, 'alignSelf' | 'width' | 'height'>>;
  icon?: ReactNode;
  inputMode?: 'text' | 'numeric' | 'search' | 'email';
  isMultiLine?: boolean;
  isSecureText?: boolean;
  maxLength?: number;
  shadowStyle?: StyleProp<Partial<CustomShadowStyle>>;
  textStyle?: StyleProp<Partial<CustomTextStyle>>;
  viewStyle?: StyleProp<Partial<CustomViewStyle>>;
}

const Input: FC<InputProps> = ({
  onChangeText,
  placeholder,
  text,
  extraIcon,
  flexStyle = {},
  icon,
  inputMode = 'text',
  isMultiLine = false,
  isSecureText = false,
  maxLength,
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
  const flexStyleHeight = (flexStyle as CustomFlexStyle).height || 0;

  const heightNumber =
    typeof flexStyleHeight === 'string' && flexStyleHeight.endsWith('%')
      ? parseFloat(flexStyleHeight)
      : typeof flexStyleHeight === 'number'
        ? flexStyleHeight
        : 0;

  useEffect(() => {
    const toValueTop = isFocused || text ? -scaleByAspectRatio(heightNumber * 0.25) : 0;
    const toValueLeft =
      isFocused || text ? -scaleByAspectRatio(2) : scaleByAspectRatio(2);
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

  const handleTextChange = (input: string): void => {
    if (inputMode === 'numeric') onChangeText(formatPhoneNumber(input));
    else onChangeText(input);
  };

  return (
    <Container
      flexStyle={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          paddingHorizontal: scaleWidth(15),
          paddingTop: scaleHeight(5),
          gap: scaleProportionally(5),
          overflow: 'hidden',
        },
        flattenedFlexStyle,
      ]}
      shadowStyle={isFocused ? undefined : flattenedShadowStyle}
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
          isMultiline={isMultiLine}
          style={{
            top: placeholderTop,
            left: placeholderLeft,
            fontSize: placeholderFontSize,
          }}
        >
          {placeholder}
        </AnimatedPlaceholder>
        <StyledInput
          value={text}
          onChangeText={handleTextChange}
          textStyle={flattenedTextStyle}
          secureTextEntry={isSecureText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          inputMode={inputMode} // Both
          maxLength={maxLength} // Both
          multiline={isMultiLine} // Both
          enterKeyHint={
            isMultiLine ? 'enter' : inputMode === 'search' ? 'search' : 'done'
          } // Both
          clearButtonMode="while-editing" // iOS only
          clearTextOnFocus // IOS only
          keyboardAppearance="default" // IOS only
          scrollEnabled={isMultiLine} // IOS only
          cursorColor={theme.common.color.primary} // Android only
          selectionHandleColor={theme.common.color.primary} // Android only
          autoCapitalize={inputMode === 'email' ? 'none' : 'sentences'} // Both
          textAlignVertical={isMultiLine ? 'top' : 'center'} // Both
          style={{
            height: isMultiLine ? flattenedFlexStyle.height : undefined,
            paddingVertical: isMultiLine ? scaleHeight(16) : undefined,
          }}
        />
      </Container>
      {extraIcon && extraIcon}
    </Container>
  );
};

export default Input;

const AnimatedPlaceholder = styled(Animated.Text)<{ isMultiline: boolean; theme: Theme }>(
  ({ isMultiline, theme }) => ({
    position: 'absolute',
    backgroundColor: theme.color.background,
    color: theme.color.textMuted,
    fontFamily: theme.common.font.families.regular,
    zIndex: isMultiline ? 1 : 0,
  })
);

const StyledInput = styled(TextInput)<{
  textStyle: CustomTextStyle;
  theme: Theme;
}>(({ textStyle, theme }) => ({
  flex: 1,
  color: theme.color.text,
  fontFamily: theme.common.font.families.medium,
  fontSize: theme.common.font.sizes._16,
  ...textStyle,
}));
