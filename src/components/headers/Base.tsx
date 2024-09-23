import React, { ReactNode } from 'react';
import { Dimensions, StyleProp } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { scaleProportionally } from 'src/utils';

import {
  CustomFlexStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types';

import { Container } from '../containers';
import { BaseText, GradientText } from '../texts';

interface BaseHeaderProps {
  title: string;
  extraIcons?: ReactNode[];
  flexStyle?: StyleProp<Partial<CustomFlexStyle>>;
  icon?: ReactNode;
  shadowStyle?: StyleProp<Partial<CustomShadowStyle>>;
  textColor?: {
    grads: string[];
    isGradient: boolean;
    mono: string;
  };
  textStyle?: StyleProp<Partial<CustomTextStyle>>;
  viewStyle?: StyleProp<Partial<CustomViewStyle>>;
}

const BaseHeader: React.FC<BaseHeaderProps> = ({
  title,
  extraIcons,
  flexStyle = {},
  icon,
  shadowStyle = {},
  textColor,
  textStyle = {},
  viewStyle = {},
}) => {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = Dimensions.get('window');
  const flexStyleHeight = (flexStyle as CustomFlexStyle).height || 0;

  const heightNumber =
    typeof flexStyleHeight === 'string' && flexStyleHeight.endsWith('%')
      ? (parseFloat(flexStyleHeight) / 100) * screenHeight
      : typeof flexStyleHeight === 'number'
        ? flexStyleHeight
        : 0;

  const newHeight = heightNumber + insets.top;

  return (
    <Container
      flexStyle={[flexStyle, { paddingTop: insets.top, height: newHeight }]}
      viewStyle={viewStyle}
      shadowStyle={shadowStyle}
    >
      <Container
        flexStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: scaleProportionally(5),
        }}
      >
        {icon}
        {textColor?.isGradient ? (
          <GradientText text={title} colors={textColor.grads} textStyle={textStyle} />
        ) : (
          <BaseText text={title} textStyle={textStyle} color={textColor?.mono} />
        )}
      </Container>
      {extraIcons && (
        <Container
          flexStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleProportionally(10),
          }}
        >
          {extraIcons.map((extraIcon) => extraIcon)}
        </Container>
      )}
    </Container>
  );
};

export default BaseHeader;
