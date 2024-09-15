import React from 'react';
import { Dimensions, StyleProp } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  CustomFlexStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types/style-types';

import { Container } from '../containers';
import { BaseText } from '../texts';

interface BaseHeaderProps {
  title: string;
  flexStyle?: StyleProp<Partial<CustomFlexStyle>>;
  icon?: React.ReactNode;
  shadowStyle?: StyleProp<Partial<CustomShadowStyle>>;
  textColor?: string;
  textStyle?: StyleProp<Partial<CustomTextStyle>>;
  viewStyle?: StyleProp<Partial<CustomViewStyle>>;
}

const BaseHeader: React.FC<BaseHeaderProps> = ({
  title,
  flexStyle,
  icon,
  shadowStyle,
  textColor,
  textStyle,
  viewStyle,
}) => {
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = Dimensions.get('window');
  const flexStyleHeight = (flexStyle as CustomFlexStyle).height;

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
      {icon}
      <BaseText text={title} textStyle={textStyle} color={textColor} />
    </Container>
  );
};

export default BaseHeader;
