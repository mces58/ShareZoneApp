import React, { useEffect, useRef } from 'react';
import { Animated, ColorValue, Easing } from 'react-native';
import { Defs, LinearGradient, Path, Stop, Svg } from 'react-native-svg';

interface ReactIconProps {
  color: {
    grads: ColorValue[];
    isGradient: boolean;
    mono: ColorValue;
  };
  animated?: {
    duration?: number;
    rotate?: boolean;
    scale?: boolean;
  };
  strokeWidth?: number;
}

const ReactIcon: React.FC<ReactIconProps> = ({ color, strokeWidth, animated }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animations = [];

    if (animated?.rotate) {
      const rotateAnimation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: animated.duration || 6000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      animations.push(rotateAnimation);
    }

    if (animated?.scale) {
      const scaleAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.15,
            duration: (animated.duration || 6000) / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: (animated.duration || 6000) / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      animations.push(scaleAnimation);
    }

    if (animations.length > 0) {
      Animated.parallel(animations).start();
    } else {
      rotateAnim.stopAnimation(() => rotateAnim.setValue(0));
      scaleAnim.stopAnimation(() => scaleAnim.setValue(1));
    }
  }, [animated, rotateAnim, scaleAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={{
        transform: [
          { rotate: animated?.rotate ? rotation : '0deg' },
          { scale: animated?.scale ? scaleAnim : 1 },
        ],
      }}
    >
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
    </Animated.View>
  );
};

export default ReactIcon;
