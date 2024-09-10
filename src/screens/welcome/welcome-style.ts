import { StyleSheet } from 'react-native';

import { Theme } from 'src/constants/styles/themes';
import {
  CustomFlexStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types/style-types';
import { scaleHeight, scaleProportionally, scaleWidth } from 'src/utils/dimensions';

const enum FlexStyles {
  CONTAINER = 'container',
  HEADER = 'header',
  APP = 'app',
  BUTTON = 'button',
  FOOTER = 'footer',
}

const enum ShadowStyles {
  APP = 'app',
  BUTTON = 'button',
}

const enum TextStyles {
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  BUTTON = 'button',
  FOOTER = 'footer',
  LINK = 'link',
}

const enum ViewStyles {
  APP = 'app',
  BUTTON = 'button',
}

const createStyles = (
  theme: Theme
): {
  flex: Record<FlexStyles, CustomFlexStyle>;
  shadow: Record<ShadowStyles, CustomShadowStyle>;
  text: Record<TextStyles, CustomTextStyle>;
  view: Record<ViewStyles, CustomViewStyle>;
} => {
  const flex = StyleSheet.create<Record<FlexStyles, CustomFlexStyle>>({
    [FlexStyles.CONTAINER]: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    [FlexStyles.HEADER]: {
      gap: scaleProportionally(15),
    },
    [FlexStyles.APP]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: scaleProportionally(5),
      borderWidth: scaleProportionally(1.5),
      paddingVertical: scaleHeight(10),
      paddingHorizontal: scaleWidth(20),
    },
    [FlexStyles.BUTTON]: {
      alignSelf: 'center',
      width: '80%',
      height: scaleHeight(50),
      alignItems: 'center',
      justifyContent: 'center',
    },
    [FlexStyles.FOOTER]: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleProportionally(5),
    },
  });

  const shadow = StyleSheet.create<Record<ShadowStyles, CustomShadowStyle>>({
    [ShadowStyles.APP]: {
      shadowColor: theme.common.color.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 3,
      shadowOpacity: 0.3,
      elevation: 5,
    },
    [ShadowStyles.BUTTON]: {
      shadowColor: theme.common.color.danger,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 5,
      shadowOpacity: 0.3,
      elevation: 5,
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.TITLE]: {
      fontFamily: theme.common.font.families.bold,
      fontSize: theme.common.font.sizes._48,
      textDecorationLine: 'underline',
      letterSpacing: scaleProportionally(3),
    },
    [TextStyles.SUBTITLE]: {
      fontFamily: theme.common.font.families.medium,
      fontSize: theme.common.font.sizes._20,
      textAlign: 'center',
      letterSpacing: scaleProportionally(1.5),
    },
    [TextStyles.BUTTON]: {
      fontFamily: theme.common.font.families.bold,
      fontSize: theme.common.font.sizes._18,
      letterSpacing: scaleProportionally(1.5),
      textAlign: 'center',
    },
    [TextStyles.FOOTER]: {
      fontFamily: theme.common.font.families.bold,
      fontSize: theme.common.font.sizes._14,
    },
    [TextStyles.LINK]: {
      fontFamily: theme.common.font.families.bold,
      fontSize: theme.common.font.sizes._14,
      textDecorationLine: 'underline',
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.APP]: {
      backgroundColor: theme.color.background,
      borderRadius: scaleProportionally(10),
      borderColor: theme.common.color.primary,
    },
    [ViewStyles.BUTTON]: {
      borderRadius: scaleProportionally(20),
    },
  });

  return { flex, shadow, text, view };
};

export default createStyles;
