import { StyleSheet } from 'react-native';

import { scaleHeight, scaleProportionally } from 'src/utils';

import { Theme } from 'src/constants/styles';
import {
  CustomFlexStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types';

const enum FlexStyles {
  CONTAINER = 'container',
  MAIN = 'main',
  FORM = 'form',
  FORM_INPUT = 'formInput',
  FOOTER = 'footer',
  FOOTER_IMAGE = 'footerImage',
  FOOTER_ACTION = 'footerAction',
  FOOTER_BUTTON_CONTAINER = 'footerButtonContainer',
  BUTTON = 'button',
  ROW_TEXT = 'rowText',
}

const enum ShadowStyles {
  FORM_INPUT = 'formInput',
  BUTTON = 'button',
}

const enum TextStyles {
  FORM_HEADER = 'formHeader',
  BUTTON = 'button',
  FOOTER = 'footer',
  LINK = 'link',
}

const enum ViewStyles {
  CONTAINER = 'container',
  FORM_INPUT = 'formInput',
  BUTTON = 'button',
}

const createSignupStyles = (
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
    },
    [FlexStyles.MAIN]: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingVertical: scaleHeight(30),
    },
    [FlexStyles.FORM]: {
      width: '90%',
      alignSelf: 'center',
      gap: scaleHeight(30),
    },
    [FlexStyles.FORM_INPUT]: {
      width: '100%',
      height: scaleHeight(65),
    } as Pick<CustomFlexStyle, 'alignSelf' | 'width' | 'height'>,
    [FlexStyles.FOOTER]: {
      flexDirection: 'row',
      width: '95%',
      alignSelf: 'center',
      justifyContent: 'space-around',
    },
    [FlexStyles.FOOTER_IMAGE]: {
      width: '30%',
      alignItems: 'center',
    },
    [FlexStyles.FOOTER_ACTION]: {
      width: '60%',
      paddingTop: scaleHeight(40),
    },
    [FlexStyles.FOOTER_BUTTON_CONTAINER]: {
      flex: 1,
      justifyContent: 'center',
      gap: scaleProportionally(15),
    },
    [FlexStyles.BUTTON]: {
      width: '100%',
      height: scaleHeight(50),
      alignItems: 'center',
      justifyContent: 'center',
    },
    [FlexStyles.ROW_TEXT]: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: scaleProportionally(5),
    },
  });

  const shadow = StyleSheet.create<Record<ShadowStyles, CustomShadowStyle>>({
    [ShadowStyles.FORM_INPUT]: {
      elevation: 2,
      shadowColor: theme.color.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
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
    [TextStyles.FORM_HEADER]: {
      fontFamily: theme.common.font.families.bold,
      fontSize: theme.common.font.sizes._32,
      textAlign: 'center',
      textTransform: 'uppercase',
      textDecorationLine: 'underline',
    },
    [TextStyles.BUTTON]: {
      fontFamily: theme.common.font.families.bold,
      fontSize: theme.common.font.sizes._18,
      letterSpacing: scaleProportionally(1.5),
      textAlign: 'center',
    },
    [TextStyles.FOOTER]: {
      fontFamily: theme.common.font.families.medium,
      fontSize: theme.common.font.sizes._14,
    },
    [TextStyles.LINK]: {
      fontFamily: theme.common.font.families.bold,
      fontSize: theme.common.font.sizes._14,
      textDecorationLine: 'underline',
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.CONTAINER]: {
      backgroundColor: theme.color.background,
    },
    [ViewStyles.FORM_INPUT]: {
      borderRadius: scaleProportionally(15),
    },
    [ViewStyles.BUTTON]: {
      borderRadius: scaleProportionally(20),
    },
  });

  return { flex, shadow, text, view };
};

export default createSignupStyles;
