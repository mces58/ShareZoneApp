import { StyleSheet } from 'react-native';

import { scaleByAspectRatio, scaleHeight, scaleProportionally } from 'src/utils';

import { Theme } from 'src/constants/styles';
import {
  CustomFlexStyle,
  CustomImageStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types';

const enum FlexStyles {
  LIST = 'list',
}

const enum ImageStyles {
  AVATAR = 'avatar',
}

const enum ShadowStyles {
  SMALL = 'small',
}

const enum TextStyles {
  LIST_FOOTER = 'listFooter',
}

const enum ViewStyles {
  LIST = 'list',
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
    [FlexStyles.LIST]: {
      gap: scaleProportionally(20),
      paddingBottom: scaleHeight(10),
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

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.LIST_FOOTER]: {
      fontFamily: theme.common.font.families.medium,
      fontSize: theme.common.font.sizes._12,
      textAlign: 'center',
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.LIST]: {
      backgroundColor: theme.color.background,
    },
  });

  return { flex, image, shadow, text, view };
};

export default createProfileStyles;
