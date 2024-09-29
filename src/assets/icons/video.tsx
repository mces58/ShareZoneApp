import React from 'react';
import { ColorValue } from 'react-native';
import { Circle, Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

interface VideoIconProps {
  color: {
    grads: ColorValue[];
    isGradient: boolean;
    mono: ColorValue;
  };
  fillColor?: ColorValue;
}

const VideoIcon: React.FC<VideoIconProps> = ({ color, fillColor }) => {
  return (
    <Svg fill="none" viewBox="0 0 24 24" height="100%" width="100%">
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
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z"
        stroke={color.isGradient ? 'url(#grad)' : color.mono}
        scale={0.7}
        translateX={3.5}
        translateY={4}
      />
      <Path
        d="M5 6 H13 A2 2 0 0 1 15 8 V16 A2 2 0 0 1 13 18 H5 A2 2 0 0 1 3 16 V8 A2 2 0 0 1 5 6 z"
        stroke={color.isGradient ? 'url(#grad)' : color.mono}
        scale={0.7}
        translateX={3.5}
        translateY={4}
      />
    </Svg>
  );
};

export default VideoIcon;
