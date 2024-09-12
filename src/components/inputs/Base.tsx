import React, { useEffect, useState } from 'react';
import { Animated, Platform, TextInput, View } from 'react-native';

import styled, { useTheme } from 'styled-components/native';

import { COLORS } from 'src/constants/styles/colors';
import { Theme } from 'src/constants/styles/themes';
import { scaleByAspectRatio } from 'src/utils/dimensions';

interface BaseInputProps {
  onChangeText: (text: string) => void;
  placeholder: string;
  text: string;
  icon?: React.ReactNode;
  isSecureText?: boolean;
}

const BaseInput: React.FC<BaseInputProps> = ({
  onChangeText,
  placeholder,
  text,
  icon,
  isSecureText = false,
}) => {
  const theme = useTheme() as Theme;

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [placeholderTop] = useState<Animated.Value>(new Animated.Value(0));
  const [placeholderLeft] = useState<Animated.Value>(new Animated.Value(0));
  const [placeholderFontSize] = useState<Animated.Value>(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(placeholderTop, {
      toValue:
        isFocused || text
          ? Platform.OS === 'ios'
            ? -scaleByAspectRatio(12)
            : -scaleByAspectRatio(9)
          : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    Animated.timing(placeholderLeft, {
      toValue: isFocused || text ? 0 : scaleByAspectRatio(5),
      duration: 200,
      useNativeDriver: false,
    }).start();

    Animated.timing(placeholderFontSize, {
      toValue:
        isFocused || text ? theme.common.font.sizes._12 : theme.common.font.sizes._18,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, text]);

  return (
    <InputContainer focusStyle={isFocused ? COLORS.ORANGE._400 : theme.color.textMuted}>
      {icon &&
        React.cloneElement(icon as React.ReactElement, {
          color: {
            mono: isFocused ? theme.color.textMuted : theme.color.textMuted,
          },
          fillColor: isFocused ? COLORS.ORANGE._400 : 'transparent',
        })}
      <InputWrapper>
        <AnimatedPlaceholder
          style={{
            top: placeholderTop,
            left: placeholderLeft,
            fontSize: placeholderFontSize,
          }}
        >
          {placeholder}
        </AnimatedPlaceholder>
        <StyledInput
          onChangeText={onChangeText}
          placeholder={''}
          value={text}
          placeholderTextColor={theme.color.textMuted}
          secureTextEntry={isSecureText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </InputWrapper>
    </InputContainer>
  );
};

export default BaseInput;

const InputContainer = styled(View)<{ focusStyle: string; theme: Theme }>(
  ({ focusStyle, theme }) => ({
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.color.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: focusStyle,
    paddingHorizontal: 10,
    gap: 5,
  })
);

const InputWrapper = styled(View)({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
});

const AnimatedPlaceholder = styled(Animated.Text)<{ theme: Theme }>(({ theme }) => ({
  position: 'absolute',
  color: theme.color.textMuted,
  fontFamily: theme.common.font.families.regular,
}));

const StyledInput = styled(TextInput)<{ theme: Theme }>(({ theme }) => ({
  flex: 1,
  color: theme.color.textMuted,
  fontFamily: theme.common.font.families.regular,
  fontSize: theme.common.font.sizes._16,
}));
