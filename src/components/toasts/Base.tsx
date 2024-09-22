/* eslint-disable security/detect-object-injection */
import React, { ReactNode, useEffect, useState } from 'react';
import { Animated, Dimensions } from 'react-native';

import styled, { useTheme } from 'styled-components/native';

import { scaleHeight, scaleProportionally, scaleWidth } from 'src/utils';

import { Theme } from 'src/constants/styles/themes';

import { Container } from '../containers';
import { BaseText } from '../texts';

export const enum ToastTypes {
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warn = 'warn',
}

interface BaseToastProps {
  downHeight: number;
  message: string;
  type: ToastTypes;
  duration?: number;
  icon?: ReactNode;
}

const BaseToast: React.FC<BaseToastProps> = ({
  downHeight,
  message,
  type,
  duration = 2000,
  icon,
}) => {
  const { width } = Dimensions.get('window');
  const [slideAnim] = useState<Animated.Value>(
    new Animated.Value(-scaleHeight(width * 0.5))
  );
  const [visible, setVisible] = useState<boolean>(false);
  const theme = useTheme() as Theme;

  useEffect(() => {
    const showToast = (): void => {
      Animated.timing(slideAnim, {
        toValue: -scaleHeight(width) * downHeight,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    const hideToast = (): void => {
      Animated.timing(slideAnim, {
        toValue: -scaleHeight(width),
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
        <BaseText
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

export default BaseToast;

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
  top: -scaleHeight(100),
  left: scaleWidth(20),
  right: scaleWidth(20),
  backgroundColor: backgroundColors(theme)[type],
  borderRadius: scaleProportionally(10),
  paddingVertical: scaleProportionally(20),
  paddingHorizontal: scaleProportionally(10),
  zIndex: 1,
}));
