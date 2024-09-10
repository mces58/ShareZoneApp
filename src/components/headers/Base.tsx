import React from 'react';
import { StyleProp } from 'react-native';

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
  return (
    <Container flexStyle={flexStyle} viewStyle={viewStyle} shadowStyle={shadowStyle}>
      {icon}
      <BaseText text={title} textStyle={textStyle} color={textColor} />
    </Container>
  );
};

export default BaseHeader;
