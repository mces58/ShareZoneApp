import React from 'react';
import { ColorValue } from 'react-native';
import { Circle, Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

interface CameraIconProps {
  color: {
    grads: ColorValue[];
    isGradient: boolean;
    mono: ColorValue;
  };
  fillColor?: ColorValue;
}

const CameraIcon: React.FC<CameraIconProps> = ({ color, fillColor }) => {
  return (
    <Svg fill="none" viewBox="0 0  24 24" height="100%" width="100%">
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
        d="M4 4h3l2-2h6l2 2h3a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2m8 3a5 5 0 00-5 5 5 5 0 005 5 5 5 0 005-5 5 5 0 00-5-5m0 2a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3z"
        fill={color.isGradient ? 'url(#grad)' : color.mono}
        scale={0.7}
        translateX={3.5}
        translateY={4}
      />
    </Svg>
  );
};

export default CameraIcon;
