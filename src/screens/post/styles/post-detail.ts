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
  SCREEN = 'screen',
  CONTAINER = 'container',
  COMMENTS = 'comments',
  COMMENT_INPUT = 'commentInput',
  INPUT = 'input',
  BUTTON = 'button',
}

const enum ShadowStyles {
  SMALL = 'small',
}

const enum TextStyles {
  NO_COMMENTS = 'noComments',
  INPUT = 'input',
  BUTTON = 'button',
}

const enum ViewStyles {
  CONTAINER = 'container',
  INPUT = 'input',
  BUTTON = 'button',
}

const createPostDetailStyles = (
  theme: Theme
): {
  flex: Record<FlexStyles, CustomFlexStyle>;
  shadow: Record<ShadowStyles, CustomShadowStyle>;
  text: Record<TextStyles, CustomTextStyle>;
  view: Record<ViewStyles, CustomViewStyle>;
} => {
  const flex = StyleSheet.create<Record<FlexStyles, CustomFlexStyle>>({
    [FlexStyles.SCREEN]: {
      flex: 1,
    },
    [FlexStyles.CONTAINER]: {
      flex: 1,
      paddingVertical: scaleHeight(10),
      gap: scaleProportionally(15),
    },
    [FlexStyles.COMMENTS]: {
      width: '97%',
      alignSelf: 'center',
      alignItems: 'center',
      gap: scaleProportionally(15),
    },
    [FlexStyles.COMMENT_INPUT]: {
      width: '97%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      paddingVertical: scaleHeight(3),
    },
    [FlexStyles.INPUT]: {
      width: '78%',
      height: scaleHeight(50),
    },
    [FlexStyles.BUTTON]: {
      width: '20%',
      height: scaleHeight(50),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const shadow = StyleSheet.create<Record<ShadowStyles, CustomShadowStyle>>({
    [ShadowStyles.SMALL]: {
      shadowColor: theme.color.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.NO_COMMENTS]: {
      fontFamily: theme.common.font.families.regular,
      fontSize: theme.common.font.sizes._14,
    },
    [TextStyles.INPUT]: {
      fontFamily: theme.common.font.families.regular,
      fontSize: theme.common.font.sizes._16,
    },
    [TextStyles.BUTTON]: {
      fontFamily: theme.common.font.families.semiBold,
      fontSize: theme.common.font.sizes._16,
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.CONTAINER]: {
      backgroundColor: theme.color.overlay,
    },
    [ViewStyles.INPUT]: {
      borderRadius: scaleProportionally(10),
    },
    [ViewStyles.BUTTON]: {
      backgroundColor: theme.common.color.success,
      borderRadius: scaleProportionally(10),
    },
  });

  return { flex, shadow, text, view };
};

export default createPostDetailStyles;
