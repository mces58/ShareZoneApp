import React from 'react';
import { ColorValue } from 'react-native';
import { Circle, Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

interface ThreeDotIconProps {
  color: {
    grads: ColorValue[];
    isGradient: boolean;
    mono: ColorValue;
  };
  fillColor?: ColorValue;
  strokeWidth?: number;
}

const ThreeDotIcon: React.FC<ThreeDotIconProps> = ({ color, fillColor, strokeWidth }) => {
  return (
    <Svg
      fill="none"
      viewBox="0 0 32 32"
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
      <Circle cx="12" cy="12" r="12" fill={fillColor} />
      <Path
        d="M16,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S17.654,13,16,13z"
        fill={color.isGradient ? 'url(#grad)' : color.mono}
        scale={0.7}
        translateX={3.5}
        translateY={4}
      />
      <Path
        d="M6,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S7.654,13,6,13z"
        fill={color.isGradient ? 'url(#grad)' : color.mono}
        scale={0.7}
        translateX={3.5}
        translateY={4}
      />
      <Path
        d="M26,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S27.654,13,26,13z"
        fill={color.isGradient ? 'url(#grad)' : color.mono}
        scale={0.7}
        translateX={3.5}
        translateY={4}
      />
    </Svg>
  );
};

export default ThreeDotIcon;
