import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import styled from 'styled-components/native';

import BaseText from '../texts/Base.text';

interface BaseButtonProps {
  onPress: () => void;
  title: string;
  backgroundColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  title,
  onPress,
  color = '#ffffff',
  backgroundColor = '#007bff',
  style,
  textStyle,
}) => {
  return (
    <ButtonContainer onPress={onPress} backgroundColor={backgroundColor} style={style}>
      <BaseText text={title} color={color} style={textStyle} />
    </ButtonContainer>
  );
};

export default BaseButton;

interface ButtonContainerProps {
  backgroundColor: string;
}

const ButtonContainer = styled(TouchableOpacity)<ButtonContainerProps>((props) => ({
  backgroundColor: props.backgroundColor,
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
}));
