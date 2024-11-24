import { StyleSheet } from 'react-native';

import { Theme } from 'src/constants/styles';
import { CustomFlexStyle, CustomViewStyle } from 'src/constants/types';

const enum FlexStyles {
  CONTAINER = 'container',
}

const enum ViewStyles {
  CONTAINER = 'container',
}

const createHomeStyles = (
  theme: Theme
): {
  flex: Record<FlexStyles, CustomFlexStyle>;
  view: Record<ViewStyles, CustomViewStyle>;
} => {
  const flex = StyleSheet.create<Record<FlexStyles, CustomFlexStyle>>({
    [FlexStyles.CONTAINER]: {
      flex: 1,
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.CONTAINER]: {
      backgroundColor: theme.color.background,
    },
  });

  return { flex, view };
};

export default createHomeStyles;
