import React from 'react';
import { ColorValue } from 'react-native';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

interface LockIconProps {
  color: {
    grads: ColorValue[];
    isGradient: boolean;
    mono: ColorValue;
  };
  fillColor?: ColorValue;
  strokeWidth?: number;
}

const LockIcon: React.FC<LockIconProps> = ({ color, fillColor, strokeWidth }) => {
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
        d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 01.567-3.677A2.001 2.001 0 0114 16a1.99 1.99 0 01-1 1.723z"
        fill={fillColor}
        stroke={color.isGradient ? 'url(#grad)' : color.mono}
      />
    </Svg>
  );
};

export default LockIcon;
