import React from 'react';
import { ColorValue } from 'react-native';
import { Circle, Defs, LinearGradient, Path, Polygon, Stop, Svg } from 'react-native-svg';

interface EditIconProps {
  color: {
    grads: ColorValue[];
    isGradient: boolean;
    mono: ColorValue;
  };
  fillColor?: ColorValue;
}

const EditIcon: React.FC<EditIconProps> = ({ color, fillColor }) => {
  return (
    <Svg fill="none" viewBox="0 0 512 512" height="100%" width="100%">
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
      <Circle cx="256" cy="256" r="253.44" fill={fillColor} />
      <Path
        d="M209.128,350.737l-47.865-47.865l156.964-156.964c6.966-6.966,18.261-6.966,25.227,0 l22.637,22.637c6.966,6.966,6.966,18.261,0,25.227L209.128,350.737z"
        fill={color.isGradient ? 'url(#grad)' : color.mono}
      />
      <Polygon
        points="140.684,371.316 161.263,302.872 209.128,350.737"
        fill={color.isGradient ? 'url(#grad)' : color.mono}
      />
    </Svg>
  );
};

export default EditIcon;
