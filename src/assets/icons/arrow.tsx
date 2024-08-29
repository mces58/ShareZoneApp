import React from 'react';
import { ColorValue } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import styled from 'styled-components/native';

interface ArrowIconProps {
  color: ColorValue;
  direction: 'top' | 'right' | 'bottom' | 'left';
  height: number;
  width: number;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ color, direction, height, width }) => {
  let d = '';

  switch (direction) {
    case 'top':
      d = 'M24 20L16 12L8 20';
      break;
    case 'right':
      d = 'M12 24L20 16L12 8';
      break;
    case 'bottom':
      d = 'M8 12L16 20L24 12';
      break;
    case 'left':
      d = 'M20 8L12 16L20 24';
      break;
    default:
      console.log('Unknown direction!');
  }

  return (
    <Container width={width} height={height}>
      <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <Path
          d={d}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={color}
        />
      </Svg>
    </Container>
  );
};

export default ArrowIcon;

const Container = styled.View<{ height: number; width: number }>(({ width, height }) => ({
  width,
  height,
}));
