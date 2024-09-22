import { StyleSheet } from 'react-native';

import { scaleByAspectRatio, scaleHeight, scaleProportionally } from 'src/utils';

import { Theme } from 'src/constants/styles/themes';
import {
  CustomFlexStyle,
  CustomImageStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types/style-types';

const enum FlexStyles {
  CONTAINER = 'container',
  HEADER = 'header',
}

const enum ImageStyles {
  AVATAR = 'avatar',
}

const enum ShadowStyles {
  HEADER = 'header',
}

const enum TextStyles {
  HEADER = 'header',
}

const enum ViewStyles {
  CONTAINER = 'container',
  HEADER = 'header',
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
    [FlexStyles.HEADER]: {
      width: '100%',
      height: scaleHeight(90),
      borderBottomWidth: scaleProportionally(1),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scaleProportionally(15),
    },
  });

  const image = StyleSheet.create<Record<ImageStyles, CustomImageStyle>>({
    [ImageStyles.AVATAR]: {
      width: scaleByAspectRatio(35),
      height: scaleByAspectRatio(35),
      borderRadius: scaleByAspectRatio(35) / 2,
      borderColor: theme.color.border,
      borderWidth: scaleProportionally(1),
    },
  });

  const shadow = StyleSheet.create<Record<ShadowStyles, CustomShadowStyle>>({
    [ShadowStyles.HEADER]: {
      elevation: 5,
      shadowColor: theme.color.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.HEADER]: {
      fontSize: theme.common.font.sizes._32,
      fontFamily: theme.common.font.families.bold,
      letterSpacing: scaleProportionally(1.5),
      textDecorationLine: 'underline',
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.CONTAINER]: {
      backgroundColor: theme.color.background,
    },
    [ViewStyles.HEADER]: {
      borderColor: theme.color.border,
      backgroundColor: theme.color.background,
    },
  });

  return { flex, image, shadow, text, view };
};

export default createHomeStyles;
