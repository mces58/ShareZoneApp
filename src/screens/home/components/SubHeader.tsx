import React, { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import {
  scaleByAspectRatio,
  scaleHeight,
  scaleProportionally,
  scaleWidth,
} from 'src/utils';

import Icon from 'src/assets/icons';
import { Container } from 'src/components/containers';
import { Header } from 'src/components/headers';
import { Image } from 'src/components/images';
import { Text } from 'src/components/texts';
import { Theme } from 'src/constants/styles';
import {
  CustomFlexStyle,
  CustomImageStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types';

interface SubHeaderProps {
  notificationCount: number;
  theme: Theme;
  title: string;
  uri: string | undefined;
  onPressNotificationHeaderIcon?: () => void;
  onPressPostHeaderIcon?: () => void;
  onPressProfileHeaderIcon?: () => void;
}

const SubHeader: FC<SubHeaderProps> = ({
  notificationCount,
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
        <Container key="heart">
          {notificationCount > 0 && (
            <Container flexStyle={styles.flex.pill} viewStyle={styles.view.pill}>
              <Text
                text={notificationCount.toString()}
                textStyle={styles.text.pill}
                color={theme.common.color.light}
              />
            </Container>
          )}
          <Icon
            name="heart"
            strokeWidth={2}
            size={scaleByAspectRatio(22)}
            onPress={onPressNotificationHeaderIcon}
          />
        </Container>,
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

const enum FlexStyles {
  HEADER = 'header',
  PILL = 'pill',
}

const enum ImageStyles {
  HEADER = 'header',
}

const enum ShadowStyles {
  HEADER = 'header',
}

const enum TextStyles {
  HEADER = 'header',
  PILL = 'pill',
}

const enum ViewStyles {
  HEADER = 'header',
  PILL = 'pill',
}

const createStyles = (
  theme: Theme
): {
  flex: Record<FlexStyles, CustomFlexStyle>;
  image: Record<ImageStyles, CustomImageStyle>;
  shadow: Record<ShadowStyles, CustomShadowStyle>;
  text: Record<TextStyles, CustomTextStyle>;
  view: Record<ViewStyles, CustomViewStyle>;
} => {
  const flex = StyleSheet.create<Record<FlexStyles, CustomFlexStyle>>({
    [FlexStyles.HEADER]: {
      width: '100%',
      height: scaleHeight(90),
      borderBottomWidth: scaleProportionally(1),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scaleByAspectRatio(10),
    },
    [FlexStyles.PILL]: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: -scaleWidth(7),
      top: -scaleHeight(7),
      width: scaleByAspectRatio(17),
      height: scaleByAspectRatio(17),
      zIndex: 1,
    },
  });

  const image = StyleSheet.create<Record<ImageStyles, CustomImageStyle>>({
    [ImageStyles.HEADER]: {
      width: scaleByAspectRatio(35),
      height: scaleByAspectRatio(35),
      borderRadius: scaleByAspectRatio(35) / 2,
      borderColor: theme.color.border,
      borderWidth: scaleProportionally(1),
    },
  });

  const shadow = StyleSheet.create<Record<ShadowStyles, CustomShadowStyle>>({
    [ShadowStyles.HEADER]: {
      elevation: 5,
      shadowColor: theme.color.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.HEADER]: {
      fontSize: theme.common.font.sizes._32,
      fontFamily: theme.common.font.families.bold,
      letterSpacing: scaleProportionally(1.5),
      textDecorationLine: 'underline',
    },
    [TextStyles.PILL]: {
      fontSize: theme.common.font.sizes._12,
      fontFamily: theme.common.font.families.bold,
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.HEADER]: {
      borderColor: theme.color.border,
      backgroundColor: theme.color.background,
    },
    [ViewStyles.PILL]: {
      backgroundColor: theme.common.color.danger,
      borderRadius: scaleProportionally(17) / 2,
    },
  });

  return { flex, image, shadow, text, view };
};
