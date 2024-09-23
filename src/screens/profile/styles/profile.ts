import { StyleSheet } from 'react-native';

import { scaleByAspectRatio, scaleHeight } from 'src/utils';

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

const enum ImageStyles {
  AVATAR = 'avatar',
}

const enum ShadowStyles {
  SMALL = 'small',
}

const enum TextStyles {}

const enum ViewStyles {
  CONTAINER = 'container',
}

const createProfileStyles = (
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
      gap: scaleHeight(20),
    },
  });

  const image = StyleSheet.create<Record<ImageStyles, CustomImageStyle>>({
    [ImageStyles.AVATAR]: {
      alignSelf: 'center',
      width: scaleByAspectRatio(150),
      height: scaleByAspectRatio(150),
      borderRadius: scaleByAspectRatio(150) / 2,
    },
  });

  const shadow = StyleSheet.create<Record<ShadowStyles, CustomShadowStyle>>({
    [ShadowStyles.SMALL]: {
      elevation: 2,
      shadowColor: theme.color.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({});

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.CONTAINER]: {
      backgroundColor: theme.color.background,
    },
  });

  return { flex, image, shadow, text, view };
};

export default createProfileStyles;
