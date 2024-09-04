import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import styled from 'styled-components/native';

import { LinearGradient } from 'expo-linear-gradient';

import BaseText from '../texts/Base.text';
import { calculateGradientEndpoints } from 'src/utils/calculate-gradient-endpoints';

interface GradientButtonProps {
  colors: string[];
  onPress: () => void;
  title: string;
  gradientDegree?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  colors,
  gradientDegree = 90,
  style,
  textStyle,
}) => {
  return (
    <ButtonContainer onPress={onPress} style={style}>
      <LinearGradient
        {...calculateGradientEndpoints(gradientDegree)}
        colors={colors}
        style={gradientStyle}
      >
        <BaseText text={title} style={textStyle} />
      </LinearGradient>
    </ButtonContainer>
  );
};

export default GradientButton;

const gradientStyle: ViewStyle = {
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  width: '100%',
  justifyContent: 'center',
};

const ButtonContainer = styled(TouchableOpacity)(() => ({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
}));
