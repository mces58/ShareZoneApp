import React from 'react';

import styled from 'styled-components/native';

interface ButtonProps {
  onPress?: () => void;
  title?: string;
}

const Button: React.FC<ButtonProps> = ({ onPress, title = 'Click me' }) => {
  return (
    <Container>
      <Touchable onPress={onPress}>
        <Text color="white">{title}</Text>
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
}));
