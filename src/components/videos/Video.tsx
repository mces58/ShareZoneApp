import React, { FC, useMemo } from 'react';
import { StyleProp, StyleSheet } from 'react-native';

import { Video as ExpoVideo, ResizeMode } from 'expo-av';

import { shadowEffect } from 'src/utils';

import { CustomImageStyle, CustomShadowStyle } from 'src/constants/types';

interface VideoProps {
  uri: string;
  isLooping?: boolean;
  isMuted?: boolean;
  rate?: number;
  resizeMode?: ResizeMode;
  shadowStyle?: StyleProp<Partial<CustomShadowStyle>>;
  shouldPlay?: boolean;
  useNativeControls?: boolean;
  videoStyle?: StyleProp<Partial<CustomImageStyle>>;
  volume?: number;
}

const Video: FC<VideoProps> = ({
  uri,
  isLooping = false,
  isMuted = false,
  rate = 1.0,
  resizeMode = ResizeMode.COVER,
  shadowStyle = {},
  shouldPlay = false,
  useNativeControls = true,
  videoStyle = {},
  volume = 1.0,
}) => {
  const flattenedVideoStyle = StyleSheet.flatten(videoStyle) as CustomImageStyle;
  const flattenedShadowStyle = StyleSheet.flatten(shadowStyle) as CustomShadowStyle;

  const shadowEffectValue = useMemo(
    () =>
      shadowEffect({
        elevation: flattenedShadowStyle.elevation,
        shadowColor: flattenedShadowStyle.shadowColor,
        shadowOffset: flattenedShadowStyle.shadowOffset,
        shadowOpacity: flattenedShadowStyle.shadowOpacity,
        shadowRadius: flattenedShadowStyle.shadowRadius,
      }),
    [flattenedShadowStyle]
  );

  return (
    <ExpoVideo
      source={{ uri }}
      isLooping={isLooping}
      isMuted={isMuted}
      rate={rate}
      resizeMode={resizeMode}
      shouldPlay={shouldPlay}
      useNativeControls={useNativeControls}
      volume={volume}
      style={[shadowEffectValue, flattenedVideoStyle]}
    />
  );
};

export default Video;
