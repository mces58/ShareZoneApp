import React, { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import {
  scaleByAspectRatio,
  scaleHeight,
  scaleProportionally,
  scaleWidth,
} from 'src/utils';

import Icon from 'src/assets/icons';
import { Header } from 'src/components/headers';
import { COLORS, Theme } from 'src/constants/styles';
import {
  CustomFlexStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types';

interface SubHeaderProps {
  onPressHeaderIcon: () => void;
  theme: Theme;
  title: string;
  onPressExtraHeaderIcon?: () => void;
}

const SubHeader: FC<SubHeaderProps> = ({
  onPressHeaderIcon,
  theme,
  title,
  onPressExtraHeaderIcon,
}) => {
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Header
      title={title}
      icon={
        <Icon
          name="short-arrow"
          direction="left"
          size={scaleByAspectRatio(30)}
          onPress={onPressHeaderIcon}
        />
      }
      flexStyle={styles.flex.header}
      viewStyle={styles.view.header}
      shadowStyle={styles.shadow.header}
      textStyle={styles.text.header}
      extraIcons={
        onPressExtraHeaderIcon && [
          <Icon
            key="signout"
            name="signout"
            strokeWidth={1}
            size={scaleByAspectRatio(24)}
            fillColor={COLORS.RED._600}
            color={{ mono: COLORS.RED._600 }}
            onPress={onPressExtraHeaderIcon}
          />,
        ]
      }
    />
  );
};

export default SubHeader;

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
      width: '100%',
      height: scaleHeight(80),
      borderBottomWidth: scaleProportionally(1),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: scaleWidth(15),
      paddingLeft: scaleWidth(5),
    },
  });

  const shadow = StyleSheet.create<Record<StyleNames, CustomShadowStyle>>({
    [StyleNames.HEADER]: {
      elevation: 5,
      shadowColor: theme.color.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
  });

  const text = StyleSheet.create<Record<StyleNames, CustomTextStyle>>({
    [StyleNames.HEADER]: {
      fontSize: theme.common.font.sizes._20,
      fontFamily: theme.common.font.families.bold,
      letterSpacing: scaleProportionally(1.5),
    },
  });

  const view = StyleSheet.create<Record<StyleNames, CustomViewStyle>>({
    [StyleNames.HEADER]: {
      backgroundColor: theme.color.background,
      borderColor: theme.color.border,
    },
  });

  return { flex, shadow, text, view };
};
