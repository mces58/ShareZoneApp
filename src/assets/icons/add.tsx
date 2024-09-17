import React from 'react';
import { ColorValue } from 'react-native';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

interface AddIconProps {
  color: {
    grads: ColorValue[];
    isGradient: boolean;
    mono: ColorValue;
  };
  fillColor?: ColorValue;
  strokeWidth?: number;
}

const AddSquareIcon: React.FC<AddIconProps> = ({ color, fillColor, strokeWidth }) => {
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
        d="M12 6a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H7a1 1 0 110-2h4V7a1 1 0 011-1z"
      />
      <Path
        fill={fillColor}
        stroke={color.isGradient ? 'url(#grad)' : color.mono}
        fillRule="evenodd"
        d="M5 22a3 3 0 01-3-3V5a3 3 0 013-3h14a3 3 0 013 3v14a3 3 0 01-3 3H5zm-1-3a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v14z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default AddSquareIcon;
