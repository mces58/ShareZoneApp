import React, { ReactNode, useMemo } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View } from 'react-native';

import styled from 'styled-components/native';

import { Image } from 'expo-image';

import { CustomImageStyle, CustomShadowStyle } from 'src/constants/types/style-types';
import { shadowEffect } from 'src/utils/shadow-effect';

interface BaseImageProps {
  uri: string | undefined;
  contentFit?: 'cover' | 'contain';
  icon?: ReactNode;
  imageStyle?: StyleProp<Partial<CustomImageStyle>>;
  onPress?: () => void;
  shadowStyle?: StyleProp<Partial<CustomShadowStyle>>;
  transition?: number;
}

const BaseImage: React.FC<BaseImageProps> = ({
  uri,
  contentFit = 'cover',
  icon,
  imageStyle = {},
  onPress,
  shadowStyle = {},
  transition = 750,
}) => {
  const blurhash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';
  const flattenedImageStyle = StyleSheet.flatten(imageStyle) as CustomImageStyle;
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
    <StyledTouchableOpacity
      imageStyle={flattenedImageStyle}
      onPress={onPress}
      disabled={!onPress}
      style={[shadowEffectValue, { alignItems: 'center', justifyContent: 'center' }]}
    >
      <Image
        source={{ uri }}
        placeholder={{ blurhash }}
        transition={transition}
        contentFit={contentFit}
        style={{
          width: flattenedImageStyle.width,
          height: flattenedImageStyle.height,
          borderRadius: flattenedImageStyle.borderRadius,
          borderWidth: flattenedImageStyle.borderWidth,
          borderColor: flattenedImageStyle.borderColor,
        }}
      />
      {icon && (
        <IconContainer
          style={{
            transform: [
              { translateY: (flattenedImageStyle.height || 0) / 2 },
              { translateX: (flattenedImageStyle.width || 0) / 2 },
            ],
          }}
        >
          {icon}
        </IconContainer>
      )}
    </StyledTouchableOpacity>
  );
};

export default BaseImage;

const StyledTouchableOpacity = styled(TouchableOpacity)<{ imageStyle: CustomImageStyle }>(
  ({ imageStyle }) => ({
    ...imageStyle,
  })
);

const IconContainer = styled(View)({
  position: 'absolute',
  top: '30%',
  left: '15%',
});
