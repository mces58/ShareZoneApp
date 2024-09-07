import { FlexStyle, TextStyle, ViewStyle } from 'react-native';

type CustomViewStyle = Pick<
  ViewStyle,
  'backgroundColor' | 'borderColor' | 'borderRadius' | 'borderStyle' | 'opacity'
> & {
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  borderStyle?: ViewStyle['borderStyle'];
  opacity?: number;
};

type CustomFlexStyle = Pick<
  FlexStyle,
  | 'alignItems'
  | 'alignSelf'
  | 'borderWidth'
  | 'display'
  | 'flex'
  | 'flexDirection'
  | 'flexWrap'
  | 'gap'
  | 'height'
  | 'justifyContent'
  | 'marginHorizontal'
  | 'marginVertical'
  | 'overflow'
  | 'paddingHorizontal'
  | 'paddingVertical'
  | 'width'
> & {
  alignItems?: FlexStyle['alignItems'];
  alignSelf?: FlexStyle['alignSelf'];
  borderWidth?: FlexStyle['borderWidth'];
  display?: FlexStyle['display'];
  flex?: FlexStyle['flex'];
  flexDirection?: FlexStyle['flexDirection'];
  flexWrap?: FlexStyle['flexWrap'];
  gap?: FlexStyle['gap'];
  height?: number | string;
  justifyContent?: FlexStyle['justifyContent'];
  marginHorizontal?: number;
  marginVertical?: number;
  overflow?: FlexStyle['overflow'];
  paddingHorizontal?: number;
  paddingVertical?: number;
  width?: number | string;
};

type CustomTextStyle = Pick<
  TextStyle,
  | 'fontSize'
  | 'fontFamily'
  | 'fontStyle'
  | 'letterSpacing'
  | 'textAlign'
  | 'textDecorationLine'
  | 'textDecorationStyle'
  | 'textTransform'
> & {
  fontFamily?: TextStyle['fontFamily'];
  fontSize?: TextStyle['fontSize'];
  fontStyle?: TextStyle['fontStyle'];
  letterSpacing?: TextStyle['letterSpacing'];
  lineHeight?: TextStyle['lineHeight'];
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  textDecorationLine?: TextStyle['textDecorationLine'];
  textDecorationStyle?: TextStyle['textDecorationStyle'];
  textTransform?: TextStyle['textTransform'];
};

type CustomShadowStyle = Pick<
  ViewStyle,
  'elevation' | 'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius'
> & {
  elevation?: ViewStyle['elevation'];
  shadowColor?: string;
  shadowOffset?: ViewStyle['shadowOffset'];
  shadowOpacity?: number;
  shadowRadius?: ViewStyle['shadowRadius'];
};

export type { CustomViewStyle, CustomFlexStyle, CustomTextStyle, CustomShadowStyle };
