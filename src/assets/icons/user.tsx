import React from 'react';
import { ColorValue } from 'react-native';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

interface UserIconProps {
  color: {
    grads: ColorValue[];
    isGradient: boolean;
    mono: ColorValue;
  };
  isFill: boolean;
  isOutline: boolean;
  strokeWidth: number;
}

const UserIcon: React.FC<UserIconProps> = ({ color, isFill, isOutline, strokeWidth }) => {
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
        d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
        stroke={isOutline ? 'url(#grad)' : color.mono}
        fill={isFill ? 'url(#grad)' : 'none'}
      />
    </Svg>
  );
};

export default UserIcon;
