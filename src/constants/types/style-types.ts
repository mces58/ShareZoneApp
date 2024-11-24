import { FlexStyle, TextStyle, ViewStyle } from 'react-native';

import { ImageStyle } from 'expo-image';

type CustomViewStyle = Pick<
  ViewStyle,
  | 'backgroundColor'
  | 'borderBottomLeftRadius'
  | 'borderBottomRightRadius'
  | 'borderColor'
  | 'borderRadius'
  | 'borderStyle'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'opacity'
> & {
  backgroundColor?: string;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderColor?: string;
  borderRadius?: number;
  borderStyle?: ViewStyle['borderStyle'];
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  opacity?: number;
};

type CustomFlexStyle = Pick<
  FlexStyle,
  | 'alignItems'
  | 'alignSelf'
  | 'borderBottomWidth'
  | 'borderEndWidth'
  | 'borderStartWidth'
  | 'borderTopWidth'
  | 'borderWidth'
  | 'bottom'
  | 'display'
  | 'flex'
  | 'flexDirection'
  | 'flexWrap'
  | 'gap'
  | 'height'
  | 'justifyContent'
  | 'left'
  | 'marginBottom'
  | 'marginHorizontal'
  | 'marginLeft'
  | 'marginRight'
  | 'marginTop'
  | 'marginVertical'
  | 'minHeight'
  | 'overflow'
  | 'paddingBottom'
  | 'paddingHorizontal'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingTop'
  | 'paddingVertical'
  | 'position'
  | 'right'
  | 'top'
  | 'width'
  | 'zIndex'
> & {
  alignItems?: FlexStyle['alignItems'];
  alignSelf?: FlexStyle['alignSelf'];
  borderBottomWidth?: FlexStyle['borderWidth'];
  borderEndWidth?: FlexStyle['borderWidth'];
  borderStartWidth?: FlexStyle['borderWidth'];
  borderTopWidth?: FlexStyle['borderWidth'];
  borderWidth?: FlexStyle['borderWidth'];
  bottom?: number;
  display?: FlexStyle['display'];
  flex?: FlexStyle['flex'];
  flexDirection?: FlexStyle['flexDirection'];
  flexWrap?: FlexStyle['flexWrap'];
  gap?: FlexStyle['gap'];
  height?: number | string;
  justifyContent?: FlexStyle['justifyContent'];
  left?: number;
  marginBottom?: number;
  marginHorizontal?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginVertical?: number;
  minHeight?: number;
  overflow?: FlexStyle['overflow'];
  paddingBottom?: number;
  paddingHorizontal?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingVertical?: number;
  position?: FlexStyle['position'];
  right?: number;
  top?: number;
  width?: number | string;
  zIndex?: FlexStyle['zIndex'];
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

type CustomImageStyle = Pick<
  ImageStyle,
  | 'alignSelf'
  | 'borderColor'
  | 'borderRadius'
  | 'borderWidth'
  | 'flex'
  | 'height'
  | 'width'
> & {
  alignSelf?: ImageStyle['alignSelf'];
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  flex?: ImageStyle['flex'];
  height?: number;
  width?: string | number;
};

export type {
  CustomViewStyle,
  CustomFlexStyle,
  CustomTextStyle,
  CustomShadowStyle,
  CustomImageStyle,
};
