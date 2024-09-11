import React from 'react';
import { ColorValue } from 'react-native';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

interface ReactIconProps {
  color: {
    grads: ColorValue[];
    isGradient: boolean;
    mono: ColorValue;
  };
  strokeWidth?: number;
}

const ReactIcon: React.FC<ReactIconProps> = ({ color, strokeWidth }) => {
  return (
    <Svg
      fill="none"
      viewBox="0 0 15 15"
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
        stroke={color.isGradient ? 'url(#grad)' : color.mono}
        d="M14.5 7.584c0 1.657-3.134 3-7 3s-7-1.343-7-3 3.134-3 7-3 7 1.343 7 3z"
      />
      <Path
        stroke={color.isGradient ? 'url(#grad)' : color.mono}
        d="M4.166 13.739c1.457.79 4.13-1.327 5.972-4.726 1.841-3.4 2.153-6.795.696-7.584-1.457-.79-4.13 1.327-5.972 4.726-1.841 3.4-2.153 6.795-.696 7.584z"
      />
      <Path
        stroke={color.isGradient ? 'url(#grad)' : color.mono}
        d="M10.834 13.739c-1.457.79-4.13-1.327-5.972-4.726-1.841-3.4-2.153-6.795-.696-7.584 1.457-.79 4.13 1.327 5.972 4.726 1.841 3.4 2.153 6.795.696 7.584z"
      />
      <Path
        stroke={color.isGradient ? 'url(#grad)' : color.mono}
        d="M6.5 7.584a1 1 0 102 0 1 1 0 00-2 0z"
      />
    </Svg>
  );
};

export default ReactIcon;
