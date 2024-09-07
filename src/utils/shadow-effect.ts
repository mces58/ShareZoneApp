import { Platform, StyleProp } from 'react-native';

import { COLORS } from 'src/constants/styles/colors';
import { CustomShadowStyle } from 'src/constants/types/style-types';

interface ShadowParams {
  elevation?: number;
  shadowColor?: string;
  shadowOffset?: { height: number; width: number };
  shadowOpacity?: number;
  shadowRadius?: number;
}

export const shadowEffect = ({
  elevation = 0,
  shadowColor = COLORS.ZINC._800,
  shadowOffset = { height: 0, width: 0 },
  shadowOpacity = 0,
  shadowRadius = 0,
}: ShadowParams): StyleProp<CustomShadowStyle> => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius,
    };
  }
  return {
    elevation,
    shadowColor,
  };
};
