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
  CONTAINER = 'container',
  AVATAR = 'avatar',
  AVATAR_TEXT = 'avatarText',
}

const enum ImageStyles {
  AVATAR = 'avatar',
}

const enum ShadowStyles {
  SMALL = 'small',
}

const enum TextStyles {
  USER_NAME = 'userName',
  PUBLIC = 'public',
}

const enum ViewStyles {
  CONTAINER = 'container',
}

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
      paddingHorizontal: scaleProportionally(20),
    },
    [FlexStyles.AVATAR_TEXT]: {
      gap: scaleProportionally(5),
    },
  });

  const image = StyleSheet.create<Record<ImageStyles, CustomImageStyle>>({
    [ImageStyles.AVATAR]: {
      alignSelf: 'center',
      width: scaleByAspectRatio(75),
      height: scaleByAspectRatio(75),
      borderRadius: scaleByAspectRatio(75) / 2,
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
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.CONTAINER]: {
      backgroundColor: theme.color.background,
    },
  });

  return { flex, image, shadow, text, view };
};

export default createPostStyles;
