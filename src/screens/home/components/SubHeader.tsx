import React, { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { scaleByAspectRatio, scaleHeight, scaleProportionally } from 'src/utils';

import Icon from 'src/assets/icons';
import { Header } from 'src/components/headers';
import { Image } from 'src/components/images';
import { Theme } from 'src/constants/styles';
import {
  CustomFlexStyle,
  CustomImageStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types';

interface SubHeaderProps {
  theme: Theme;
  title: string;
  uri: string | undefined;
  onPressNotificationHeaderIcon?: () => void;
  onPressPostHeaderIcon?: () => void;
  onPressProfileHeaderIcon?: () => void;
}

const SubHeader: FC<SubHeaderProps> = ({
  theme,
  title,
  uri,
  onPressNotificationHeaderIcon,
  onPressPostHeaderIcon,
  onPressProfileHeaderIcon,
}) => {
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Header
      title={title}
      icon={<Icon name="react" strokeWidth={0.75} size={scaleByAspectRatio(30)} />}
      flexStyle={styles.flex.header}
      viewStyle={styles.view.header}
      shadowStyle={styles.shadow.header}
      textStyle={styles.text.header}
      extraIcons={[
        <Icon
          key="heart"
          name="heart"
          strokeWidth={2}
          size={scaleByAspectRatio(22)}
          onPress={onPressNotificationHeaderIcon}
        />,
        <Icon
          key="add-square"
          name="add-square"
          strokeWidth={0}
          size={scaleByAspectRatio(22)}
          onPress={onPressPostHeaderIcon}
          fillColor={theme.color.text}
        />,
        <Image
          key="avatar"
          uri={uri}
          imageStyle={styles.image.header}
          onPress={onPressProfileHeaderIcon}
        />,
      ]}
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
  image: Record<StyleNames, CustomImageStyle>;
  shadow: Record<StyleNames, CustomShadowStyle>;
  text: Record<StyleNames, CustomTextStyle>;
  view: Record<StyleNames, CustomViewStyle>;
} => {
  const flex = StyleSheet.create<Record<StyleNames, CustomFlexStyle>>({
    [StyleNames.HEADER]: {
      width: '100%',
      height: scaleHeight(90),
      borderBottomWidth: scaleProportionally(1),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scaleProportionally(15),
    },
  });

  const image = StyleSheet.create<Record<StyleNames, CustomImageStyle>>({
    [StyleNames.HEADER]: {
      width: scaleByAspectRatio(35),
      height: scaleByAspectRatio(35),
      borderRadius: scaleByAspectRatio(35) / 2,
      borderColor: theme.color.border,
      borderWidth: scaleProportionally(1),
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
      fontSize: theme.common.font.sizes._32,
      fontFamily: theme.common.font.families.bold,
      letterSpacing: scaleProportionally(1.5),
      textDecorationLine: 'underline',
    },
  });

  const view = StyleSheet.create<Record<StyleNames, CustomViewStyle>>({
    [StyleNames.HEADER]: {
      borderColor: theme.color.border,
      backgroundColor: theme.color.background,
    },
  });

  return { flex, image, shadow, text, view };
};
