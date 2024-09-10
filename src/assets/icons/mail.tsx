import React from 'react';
import { ColorValue } from 'react-native';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

interface MailIconProps {
  color: {
    grads: ColorValue[];
    isGradient: boolean;
    mono: ColorValue;
  };
  isFill: boolean;
  isOutline: boolean;
  strokeWidth: number;
}

const MailIcon: React.FC<MailIconProps> = ({ color, isFill, isOutline, strokeWidth }) => {
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
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke={isOutline ? 'url(#grad)' : color.mono}
        fill={isFill ? 'url(#grad)' : 'none'}
      />
      <Path
        d="M22 6l-10 7L2 6"
        stroke={isOutline ? 'url(#grad)' : color.mono}
        fill={isFill ? 'url(#grad)' : 'none'}
      />
    </Svg>
  );
};

export default MailIcon;
