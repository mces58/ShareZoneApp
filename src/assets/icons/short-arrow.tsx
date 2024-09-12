import React from 'react';
import { ColorValue } from 'react-native';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

interface ShortArrowIconProps {
  color: {
    grads: ColorValue[];
    isGradient: boolean;
    mono: ColorValue;
  };
  direction: 'up' | 'right' | 'down' | 'left';
  strokeWidth?: number;
}

const ShortArrowIcon: React.FC<ShortArrowIconProps> = ({
  color,
  direction,
  strokeWidth,
}) => {
  let d = '';

  switch (direction) {
    case 'up':
      d = 'M24 20L16 12L8 20';
      break;
    case 'right':
      d = 'M12 24L20 16L12 8';
      break;
    case 'down':
      d = 'M8 12L16 20L24 12';
      break;
    case 'left':
      d = 'M20 8L12 16L20 24';
      break;
    default:
      console.log('Unknown direction!');
  }

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 32 32"
      fill="none"
      strokeWidth={strokeWidth}
    >
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="75%">
          {color.grads.map((c, index) => (
            <Stop
              key={index}
              offset={index / (color.grads.length - 1)}
              stopColor={c}
              stopOpacity={1}
            />
          ))}
        </LinearGradient>
      </Defs>
      <Path
        d={d}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color.isGradient ? 'url(#grad)' : color.mono}
      />
    </Svg>
  );
};

export default ShortArrowIcon;
