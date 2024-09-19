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
  FORM = 'form',
  FORM_INPUT = 'formInput',
  FORM_BUTTON = 'formButton',
}

const enum ImageStyles {
  AVATAR = 'avatar',
}

const enum ShadowStyles {
  NORMAL = 'normal',
  SMALL = 'small',
}

const enum TextStyles {
  HEADER = 'header',
  SUBHEADER = 'subheader',
  FORM_BUTTON = 'formButton',
}

const enum ViewStyles {
  CONTAINER = 'container',
  HEADER = 'header',
  FORM_INPUT = 'formInput',
  FORM_BUTTON = 'formButton',
}

const createProfileEditStyles = (
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
    [FlexStyles.FORM]: {
      width: '90%',
      alignSelf: 'center',
      gap: scaleHeight(25),
      paddingVertical: scaleHeight(20),
    },
    [FlexStyles.FORM_INPUT]: {
      width: '100%',
      height: scaleHeight(65),
    } as Pick<CustomFlexStyle, 'alignSelf' | 'width' | 'height'>,
    [FlexStyles.FORM_BUTTON]: {
      width: '100%',
      height: scaleHeight(55),
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
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
    [ShadowStyles.NORMAL]: {
      elevation: 5,
      shadowColor: theme.color.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    [ShadowStyles.SMALL]: {
      elevation: 2,
      shadowColor: theme.color.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.HEADER]: {
      fontSize: theme.common.font.sizes._20,
      fontFamily: theme.common.font.families.bold,
      letterSpacing: scaleProportionally(1.5),
    },
    [TextStyles.SUBHEADER]: {
      fontFamily: theme.common.font.families.semiBold,
      fontSize: theme.common.font.sizes._16,
      textAlign: 'center',
      letterSpacing: scaleProportionally(1),
    },
    [TextStyles.FORM_BUTTON]: {
      fontFamily: theme.common.font.families.bold,
      fontSize: theme.common.font.sizes._18,
      letterSpacing: scaleProportionally(1),
      textDecorationLine: 'underline',
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
    [ViewStyles.FORM_INPUT]: {
      borderRadius: scaleProportionally(15),
    },
    [ViewStyles.FORM_BUTTON]: {
      backgroundColor: theme.common.color.success,
      borderRadius: scaleProportionally(15),
    },
  });

  return { flex, image, shadow, text, view };
};

export default createProfileEditStyles;
