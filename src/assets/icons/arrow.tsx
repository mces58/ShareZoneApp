import React from 'react';
import { ColorValue } from 'react-native';
import { Circle, Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

interface ArrowIconProps {
  color: {
    grads: ColorValue[];
    isGradient: boolean;
    mono: ColorValue;
  };
  direction:
    | 'up'
    | 'right'
    | 'down'
    | 'left'
    | 'up-right'
    | 'up-left'
    | 'down-right'
    | 'down-left';
  fillColor?: ColorValue;
  strokeWidth?: number;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
  color,
  direction,
  fillColor,
  strokeWidth,
}) => {
  let d = '';

  switch (direction) {
    case 'up':
      d = 'M12 18V5M5 12l7-7 7 7';
      break;
    case 'right':
      d = 'M6 12h12M12 5l7 7-7 7';
      break;
    case 'down':
      d = 'M12 6v13M19 12l-7 7-7-7';
      break;
    case 'left':
      d = 'M18 12H5M12 19l-7-7 7-7';
      break;
    case 'up-right':
      d = 'M8 16L17 7M7 7h10v10';
      break;
    case 'up-left':
      d = 'M16 16L7 7M7 17V7h10';
      break;
    case 'down-right':
      d = 'M7 7l10 10M17 7v10H7';
      break;
    case 'down-left':
      d = 'M16 8L7 17M17 17H7V7';
      break;
    default:
      console.log('Unknown direction!');
  }

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
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
      <Circle cx="12" cy="12" r="11" fill={fillColor} />
      <Path
        d={d}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color.isGradient ? 'url(#grad)' : color.mono}
      />
    </Svg>
  );
};

export default ArrowIcon;
