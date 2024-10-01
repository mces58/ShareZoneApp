/* eslint-disable security/detect-object-injection */
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Animated } from 'react-native';

import styled, { useTheme } from 'styled-components/native';

import { scaleHeight, scaleProportionally, scaleWidth } from 'src/utils';

import { Theme } from 'src/constants/styles';

import { Container } from '../containers';
import { Text } from '../texts';

export const enum ToastTypes {
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warn = 'warn',
}

interface ToastProps {
  downHeight: number;
  message: string;
  type: ToastTypes;
  duration?: number;
  icon?: ReactNode;
}

const Toast: FC<ToastProps> = ({ downHeight, message, type, duration = 2000, icon }) => {
  const [slideAnim] = useState<Animated.Value>(new Animated.Value(-scaleHeight(400)));
  const [visible, setVisible] = useState<boolean>(false);
  const theme = useTheme() as Theme;

  useEffect(() => {
    const showToast = (): void => {
      Animated.timing(slideAnim, {
        toValue: -scaleHeight(downHeight),
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    const hideToast = (): void => {
      Animated.timing(slideAnim, {
        toValue: -scaleHeight(400),
        duration: 500,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    };

    setVisible(true);
    showToast();
    const timer = setTimeout(hideToast, duration);

    return (): void => clearTimeout(timer);
  }, [slideAnim, duration]);

  if (!visible) return null;

  return (
    <AnimatedContainer type={type} style={{ transform: [{ translateY: slideAnim }] }}>
      <Container
        flexStyle={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          gap: scaleProportionally(5),
        }}
      >
        {icon && icon}
        <Text
          text={message}
          textStyle={{
            fontSize: theme.common.font.sizes._14,
            fontFamily: theme.common.font.families.medium,
          }}
        />
      </Container>
    </AnimatedContainer>
  );
};

export default Toast;

const backgroundColors = (theme: Theme): { [key in ToastTypes]: string } => ({
  [ToastTypes.Error]: theme.common.color.danger,
  [ToastTypes.Info]: theme.common.color.primary,
  [ToastTypes.Success]: theme.common.color.success,
  [ToastTypes.Warn]: theme.common.color.warning,
});

const AnimatedContainer = styled(Animated.View)<{
  theme: Theme;
  type: ToastTypes;
}>(({ theme, type }) => ({
  position: 'absolute',
  top: -scaleHeight(200),
  left: scaleWidth(20),
  right: scaleWidth(20),
  backgroundColor: backgroundColors(theme)[type],
  borderRadius: scaleProportionally(10),
  paddingVertical: scaleHeight(20),
  paddingHorizontal: scaleProportionally(10),
  zIndex: 1,
}));
