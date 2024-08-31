import React from 'react';

import styled from 'styled-components/native';

import ArrowIcon from 'src/assets/icons/arrow';
import { FONTS } from 'src/constants/fonts';

interface ButtonProps {
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({ onPress }): JSX.Element => {
  return (
    <Container>
      <Touchable onPress={onPress}>
        <Text color="white">Click me</Text>
        <ArrowIcon color="white" direction="right" height={20} width={20} />
      </Touchable>
    </Container>
  );
};

export default Button;

const Container = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
});

const Touchable = styled.TouchableOpacity({
  backgroundColor: 'blue',
  padding: 10,
  borderRadius: 5,
  flexDirection: 'row',
});

const Text = styled.Text<{ color: string; fontSize?: number }>(({ color, fontSize }) => ({
  fontSize,
  color,
  fontFamily: FONTS.Poppins.Regular,
}));
