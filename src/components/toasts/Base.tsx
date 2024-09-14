/* eslint-disable security/detect-object-injection */
import React, { ReactNode, useEffect, useState } from 'react';
import { Animated } from 'react-native';

import styled, { useTheme } from 'styled-components/native';

import { Theme } from 'src/constants/styles/themes';
import { scaleHeight, scaleProportionally, scaleWidth } from 'src/utils/dimensions';

import { Container } from '../containers';
import { BaseText } from '../texts';

export const enum ToastType {
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warn = 'warn',
}

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  icon?: ReactNode;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 2000, icon }) => {
  const [slideAnim] = useState<Animated.Value>(new Animated.Value(-scaleHeight(100)));
  const [visible, setVisible] = useState<boolean>(false);
  const theme = useTheme() as Theme;

  useEffect(() => {
    const showToast = (): void => {
      Animated.timing(slideAnim, {
        toValue: scaleHeight(10),
        duration: 400,
        useNativeDriver: true,
      }).start();
    };

    const hideToast = (): void => {
      Animated.timing(slideAnim, {
        toValue: -scaleHeight(100),
        duration: 400,
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
        <BaseText
          text={message}
          textStyle={{
            fontSize: theme.common.font.sizes._16,
            fontFamily: theme.common.font.families.medium,
          }}
        />
      </Container>
    </AnimatedContainer>
  );
};

export default Toast;

const backgroundColors = (theme: Theme): { [key in ToastType]: string } => ({
  [ToastType.Error]: theme.common.color.danger,
  [ToastType.Info]: theme.common.color.primary,
  [ToastType.Success]: theme.common.color.success,
  [ToastType.Warn]: theme.common.color.warning,
});

const AnimatedContainer = styled(Animated.View)<{
  theme: Theme;
  type: ToastType;
}>(({ theme, type }) => ({
  position: 'absolute',
  top: -scaleHeight(100),
  left: scaleWidth(20),
  right: scaleWidth(20),
  backgroundColor: backgroundColors(theme)[type],
  borderRadius: scaleProportionally(10),
  paddingVertical: scaleProportionally(20),
  paddingHorizontal: scaleProportionally(10),
  zIndex: 1,
}));
