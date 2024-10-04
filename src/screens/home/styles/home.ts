import { StyleSheet } from 'react-native';

import { Theme } from 'src/constants/styles';
import {
  CustomFlexStyle,
  CustomImageStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types';

const enum FlexStyles {
  CONTAINER = 'container',
}

const enum ImageStyles {}

const enum ShadowStyles {}

const enum TextStyles {}

const enum ViewStyles {
  CONTAINER = 'container',
}

const createHomeStyles = (
  theme: Theme
): {
  flex: Record<FlexStyles, CustomFlexStyle>;
  image: Record<ImageStyles, CustomImageStyle>;
  shadow: Record<ShadowStyles, CustomShadowStyle>;
  text: Record<TextStyles, CustomTextStyle>;
  view: Record<ViewStyles, CustomViewStyle>;
} => {
  const flex = StyleSheet.create<Record<FlexStyles, CustomFlexStyle>>({
    [FlexStyles.CONTAINER]: {
      flex: 1,
    },
  });

  const image = StyleSheet.create<Record<ImageStyles, CustomImageStyle>>({});

  const shadow = StyleSheet.create<Record<ShadowStyles, CustomShadowStyle>>({});

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({});

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.CONTAINER]: {
      backgroundColor: theme.color.background,
    },
  });

  return { flex, image, shadow, text, view };
};

export default createHomeStyles;
