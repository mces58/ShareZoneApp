import { Dimensions, StyleSheet } from 'react-native';

import {
  scaleByAspectRatio,
  scaleHeight,
  scaleProportionally,
  scaleWidth,
} from 'src/utils';

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
  AVATAR = 'avatar',
  AVATAR_TEXT = 'avatarText',
  TRASH_ICON = 'trashIcon',
  POST = 'post',
  ICON = 'icon',
  BUTTON_WRAPPER = 'buttonWrapper',
  BUTTON = 'button',
}

const enum ImageStyles {
  AVATAR = 'avatar',
  POST = 'post',
}

const enum ShadowStyles {
  SMALL = 'small',
}

const enum TextStyles {
  USER_NAME = 'userName',
  PUBLIC = 'public',
  DESCRIPTION = 'description',
  ADD_TO_POST = 'addToPost',
  BUTTON = 'button',
}

const enum ViewStyles {
  CONTAINER = 'container',
  POST = 'post',
  BUTTON = 'button',
}

const { width: deviceWidth } = Dimensions.get('window');

const createPostStyles = (
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
    [FlexStyles.AVATAR]: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleProportionally(10),
      paddingHorizontal: scaleWidth(20),
    },
    [FlexStyles.AVATAR_TEXT]: {
      gap: scaleProportionally(5),
    },
    [FlexStyles.TRASH_ICON]: {
      position: 'absolute',
      right: scaleProportionally(30),
      bottom: scaleProportionally(10),
    },
    [FlexStyles.POST]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      width: '90%',
      alignSelf: 'center',
      paddingVertical: scaleHeight(10),
      paddingHorizontal: scaleWidth(10),
      marginTop: scaleHeight(20),
    },
    [FlexStyles.ICON]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    [FlexStyles.BUTTON_WRAPPER]: {
      flex: 1,
      flexDirection: 'column-reverse',
      paddingVertical: scaleHeight(20),
    },
    [FlexStyles.BUTTON]: {
      width: '90%',
      height: scaleHeight(55),
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });

  const image = StyleSheet.create<Record<ImageStyles, CustomImageStyle>>({
    [ImageStyles.AVATAR]: {
      alignSelf: 'center',
      width: scaleByAspectRatio(75),
      height: scaleByAspectRatio(75),
      borderRadius: scaleByAspectRatio(75) / 2,
    },
    [ImageStyles.POST]: {
      width: scaleByAspectRatio(deviceWidth * 0.8),
      height: scaleByAspectRatio(deviceWidth * 0.5),
      borderRadius: scaleByAspectRatio(10),
      alignSelf: 'center',
    },
  });

  const shadow = StyleSheet.create<Record<ShadowStyles, CustomShadowStyle>>({
    [ShadowStyles.SMALL]: {
      elevation: 2,
      shadowColor: theme.color.shadow,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.USER_NAME]: {
      fontSize: theme.common.font.sizes._32,
      textTransform: 'uppercase',
      letterSpacing: scaleProportionally(1),
    },
    [TextStyles.PUBLIC]: {
      fontSize: theme.common.font.sizes._14,
      fontStyle: 'italic',
      letterSpacing: scaleProportionally(0.75),
      textDecorationLine: 'underline',
    },
    [TextStyles.DESCRIPTION]: {
      fontSize: theme.common.font.sizes._20,
      letterSpacing: scaleProportionally(0.5),
      textAlign: 'center',
      textTransform: 'capitalize',
      textDecorationLine: 'underline',
      fontStyle: 'italic',
    },
    [TextStyles.ADD_TO_POST]: {
      fontSize: theme.common.font.sizes._14,
      letterSpacing: scaleProportionally(0.5),
      textTransform: 'capitalize',
    },
    [TextStyles.BUTTON]: {
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
    [ViewStyles.POST]: {
      borderColor: theme.color.border,
      borderRadius: scaleProportionally(10),
    },
    [ViewStyles.BUTTON]: {
      backgroundColor: theme.common.color.success,
      borderRadius: scaleProportionally(15),
    },
  });

  return { flex, image, shadow, text, view };
};

export default createPostStyles;
