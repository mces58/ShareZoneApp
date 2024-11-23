import React, { FC, ReactNode } from 'react';
import { Dimensions, Modal, StyleSheet, View } from 'react-native';

import { useTheme } from 'styled-components/native';

import { BlurView } from 'expo-blur';

import { scaleProportionally } from 'src/utils';

import { Theme } from 'src/constants/styles';
import { CustomFlexStyle, CustomViewStyle } from 'src/constants/types';

const { width, height } = Dimensions.get('window');

type BlurRate = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

interface BaseModalProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
  blurRate?: BlurRate;
  componentStyle?: Pick<
    CustomFlexStyle & CustomViewStyle,
    'width' | 'height' | 'backgroundColor' | 'borderRadius'
  >;
}

const BaseModal: FC<BaseModalProps> = ({
  children,
  isVisible,
  onClose,
  blurRate = 0.5,
  componentStyle,
}) => {
  const theme = useTheme() as Theme;

  if (!isVisible) return null;

  const defaultStyle = {
    width: width * 0.9,
    height: height * 0.5,
    backgroundColor: theme.color.overlay,
    borderRadius: scaleProportionally(10),
  };

  return (
    <Modal animationType="fade" transparent visible={isVisible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <BlurView style={styles.absoluteFill} intensity={blurRate * 100} tint="dark" />
        <View style={[defaultStyle, componentStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

export default BaseModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
