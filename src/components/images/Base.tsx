import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

import { Image } from 'expo-image';

import { CustomImageStyle } from 'src/constants/types/style-types';

interface BaseImageProps {
  uri: string | undefined;
  contentFit?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  imageStyle?: StyleProp<Partial<CustomImageStyle>>;
  onPress?: () => void;
  transition?: number;
}

const BaseImage: React.FC<BaseImageProps> = ({
  uri,
  contentFit = 'cover',
  imageStyle = {},
  onPress,
  transition = 750,
}) => {
  const blurhash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';
  const flattenedImageStyle = StyleSheet.flatten(imageStyle) as CustomImageStyle;

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <StyledImage
        source={{ uri }}
        imageStyle={flattenedImageStyle}
        placeholder={{ blurhash }}
        transition={transition}
        contentFit={contentFit}
      />
    </TouchableOpacity>
  );
};

export default BaseImage;

const StyledImage = styled(Image)<{ imageStyle: CustomImageStyle }>(({ imageStyle }) => ({
  ...imageStyle,
}));
