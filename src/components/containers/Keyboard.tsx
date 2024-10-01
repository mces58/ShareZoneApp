import React, { FC, ReactNode } from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useTheme } from 'styled-components/native';

import { Theme } from 'src/constants/styles';

interface KeyboardProps {
  children: ReactNode;
  height?: {
    android: number;
    ios: number;
  };
}

const Keyboard: FC<KeyboardProps> = ({ children, height }) => {
  const theme = useTheme() as Theme;
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      enableOnAndroid
      extraHeight={Platform.select({ android: height?.android, ios: height?.ios })}
      enableAutomaticScroll
      style={{ flex: 1, backgroundColor: theme.color.background }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default Keyboard;
