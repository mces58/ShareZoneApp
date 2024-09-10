import React from 'react';
import { ColorValue } from 'react-native';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

interface EyesIconProps {
  color: {
    grads: ColorValue[];
    isGradient: boolean;
    mono: ColorValue;
  };
  isClose: boolean;
  isFill: boolean;
  isOutline: boolean;
  strokeWidth: number;
}

const EyesIcon: React.FC<EyesIconProps> = ({
  color,
  isClose,
  isFill,
  isOutline,
  strokeWidth,
}) => {
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
      {isClose ? (
        <Path
          d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"
          stroke={isOutline ? 'url(#grad)' : color.mono}
          fill={isFill ? 'url(#grad)' : 'none'}
        />
      ) : (
        <>
          <Path
            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
            stroke={isOutline ? 'url(#grad)' : color.mono}
            fill={isFill ? 'url(#grad)' : 'none'}
          />
          <Path
            d="M15 12 A3 3 0 0 1 12 15 A3 3 0 0 1 9 12 A3 3 0 0 1 15 12 z"
            stroke={isOutline ? 'url(#grad)' : color.mono}
            fill={isFill ? 'url(#grad)' : 'none'}
          />
        </>
      )}
    </Svg>
  );
};

export default EyesIcon;
