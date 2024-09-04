import { TextStyle } from 'react-native';

import { FONTS } from 'src/constants/styles/fonts';
import { scaleFontSize } from 'src/utils/dimensions';

export const DefaultTextStyle: Pick<
  TextStyle,
  | 'fontFamily'
  | 'fontSize'
  | 'fontStyle'
  | 'textDecorationLine'
  | 'textTransform'
  | 'letterSpacing'
> = {
  fontFamily: FONTS.Nunito.Bold,
  fontSize: scaleFontSize(15),
  fontStyle: 'normal',
  textDecorationLine: 'none',
  textTransform: 'none',
  letterSpacing: 0,
};
