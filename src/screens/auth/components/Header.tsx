import React, { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { scaleHeight, scaleProportionally } from 'src/utils';

import Icon from 'src/assets/icons';
import { BaseHeader } from 'src/components/headers';
import { Theme } from 'src/constants/styles';
import {
  CustomFlexStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types';

interface HeaderProps {
  onPressHeaderIcon: () => void;
  theme: Theme;
  title: string;
}

const Header: FC<HeaderProps> = ({ onPressHeaderIcon, theme, title }) => {
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <BaseHeader
      title={title}
      icon={<Icon name="short-arrow" direction="left" onPress={onPressHeaderIcon} />}
      flexStyle={styles.flex.header}
      shadowStyle={styles.shadow.header}
      textStyle={styles.text.header}
      viewStyle={styles.view.header}
    />
  );
};

export default Header;

const enum StyleNames {
  HEADER = 'header',
}

const createStyles = (
  theme: Theme
): {
  flex: Record<StyleNames, CustomFlexStyle>;
  shadow: Record<StyleNames, CustomShadowStyle>;
  text: Record<StyleNames, CustomTextStyle>;
  view: Record<StyleNames, CustomViewStyle>;
} => {
  const flex = StyleSheet.create<Record<StyleNames, CustomFlexStyle>>({
    [StyleNames.HEADER]: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: scaleHeight(100),
      paddingHorizontal: scaleHeight(10),
    },
  });

  const shadow = StyleSheet.create<Record<StyleNames, CustomShadowStyle>>({
    [StyleNames.HEADER]: {
      elevation: 5,
      shadowColor: theme.color.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
  });

  const text = StyleSheet.create<Record<StyleNames, CustomTextStyle>>({
    [StyleNames.HEADER]: {
      fontSize: theme.common.font.sizes._24,
      fontFamily: theme.common.font.families.bold,
      letterSpacing: scaleProportionally(1),
    },
  });

  const view = StyleSheet.create<Record<StyleNames, CustomViewStyle>>({
    [StyleNames.HEADER]: {
      borderBottomLeftRadius: scaleProportionally(20),
      borderBottomRightRadius: scaleProportionally(20),
      backgroundColor: theme.color.background,
    },
  });

  return { flex, shadow, text, view };
};
