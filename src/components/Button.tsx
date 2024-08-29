import React from 'react';

import styled from 'styled-components/native';

const Button = (): JSX.Element => {
  return (
    <Container>
      <Touchable>
        <Text color="white">Click me</Text>
      </Touchable>
    </Container>
  );
};

export default Button;

const Container = styled.View({
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
});

const Touchable = styled.TouchableOpacity({
  backgroundColor: 'blue',
  padding: 10,
  borderRadius: 5,
});

const Text = styled.Text<{ color: string; fontSize?: number }>(({ color, fontSize }) => ({
  fontSize,
  color,
}));
