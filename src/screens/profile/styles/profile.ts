import { StyleSheet } from 'react-native';

import { Theme } from 'src/constants/styles/themes';
import {
  CustomFlexStyle,
  CustomImageStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types/style-types';
import {
  scaleByAspectRatio,
  scaleHeight,
  scaleProportionally,
} from 'src/utils/dimensions';

const enum FlexStyles {
  CONTAINER = 'container',
  HEADER = 'header',
}

const enum ImageStyles {
  AVATAR = 'avatar',
}

const enum ShadowStyles {
  HEADER = 'header',
  AVATAR = 'avatar',
}

const enum TextStyles {
  HEADER = 'header',
}

const enum ViewStyles {
  CONTAINER = 'container',
  HEADER = 'header',
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
    [FlexStyles.HEADER]: {
      width: '100%',
      height: scaleHeight(80),
      borderBottomWidth: scaleProportionally(1),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: scaleProportionally(15),
      paddingLeft: scaleProportionally(5),
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
    [ShadowStyles.HEADER]: {
      elevation: 5,
      shadowColor: theme.color.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    [ShadowStyles.AVATAR]: {
      elevation: 5,
      shadowColor: theme.color.shadow,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.HEADER]: {
      fontSize: theme.common.font.sizes._24,
      fontFamily: theme.common.font.families.bold,
      letterSpacing: scaleProportionally(1.5),
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.CONTAINER]: {
      backgroundColor: theme.color.background,
    },
    [ViewStyles.HEADER]: {
      backgroundColor: theme.color.background,
      borderColor: theme.color.border,
    },
  });

  return { flex, image, shadow, text, view };
};

export default createProfileStyles;
