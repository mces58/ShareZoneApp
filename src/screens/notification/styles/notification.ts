import { StyleSheet } from 'react-native';

import { scaleProportionally } from 'src/utils';

import { Theme } from 'src/constants/styles';
import { CustomFlexStyle, CustomTextStyle, CustomViewStyle } from 'src/constants/types';

const enum FlexStyles {
  CONTAINER = 'container',
}

const enum TextStyles {
  NOT_FOUND = 'notFound',
}

const enum ViewStyles {
  CONTAINER = 'container',
}

const createNotificationStyles = (
  theme: Theme
): {
  flex: Record<FlexStyles, CustomFlexStyle>;
  text: Record<TextStyles, CustomTextStyle>;
  view: Record<ViewStyles, CustomViewStyle>;
} => {
  const flex = StyleSheet.create<Record<FlexStyles, CustomFlexStyle>>({
    [FlexStyles.CONTAINER]: {
      flex: 1,
      gap: scaleProportionally(15),
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.NOT_FOUND]: {
      fontSize: theme.common.font.sizes._20,
      fontFamily: theme.common.font.families.semiBold,
      letterSpacing: scaleProportionally(0.5),
      textDecorationLine: 'underline',
      textAlign: 'center',
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.CONTAINER]: {
      backgroundColor: theme.color.background,
    },
  });

  return { flex, text, view };
};

export default createNotificationStyles;
