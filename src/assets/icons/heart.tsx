import React from 'react';
import { ColorValue } from 'react-native';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

interface HeartIconProps {
  color: {
    grads: ColorValue[];
    isGradient: boolean;
    mono: ColorValue;
  };
  fillColor?: ColorValue;
  strokeWidth?: number;
}

const HeartIcon: React.FC<HeartIconProps> = ({ color, fillColor, strokeWidth }) => {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      height="100%"
      width="100%"
      strokeWidth={strokeWidth}
    >
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="50%">
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
        fill={fillColor}
        stroke={color.isGradient ? 'url(#grad)' : color.mono}
        fillRule="evenodd"
        d="M12.012 5.572l-1.087-1.087a5.5 5.5 0 10-7.778 7.778l8.839 8.839.002-.002.026.026 8.839-8.839a5.5 5.5 0 10-7.778-7.778l-1.063 1.063zm-.024 12.7l4.936-4.937 1.45-1.4h.002l1.063-1.062a3.5 3.5 0 10-4.95-4.95L12.013 8.4l-.007-.007h-.001L9.511 5.9a3.5 3.5 0 10-4.95 4.95l2.54 2.54.001-.003 4.886 4.886z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default HeartIcon;
