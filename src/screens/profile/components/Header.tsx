import React, { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useAuth, useI18n } from 'src/contexts';
import {
  scaleByAspectRatio,
  scaleHeight,
  scaleProportionally,
  scaleWidth,
} from 'src/utils';

import Icon from 'src/assets/icons';
import { Container } from 'src/components/containers';
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

import SubHeader from './SubHeader';

interface HeaderProps {
  onPressEditProfile: () => void;
  onPressExtraHeaderIcon: () => void;
  onPressHeaderIcon: () => void;
  theme: Theme;
}

const Header: FC<HeaderProps> = ({
  onPressEditProfile,
  onPressExtraHeaderIcon,
  onPressHeaderIcon,
  theme,
}) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
      <SubHeader
        title={t('screens.profile.title')}
        theme={theme}
        onPressHeaderIcon={onPressHeaderIcon}
        onPressExtraHeaderIcon={onPressExtraHeaderIcon}
      />
      <Image
        uri={user?.image}
        icon={
          <Icon
            name="edit"
            size={scaleByAspectRatio(30)}
            color={{ mono: theme.color.background }}
            fillColor={theme.color.text}
            onPress={onPressEditProfile}
          />
        }
        imageStyle={styles.image.avatar}
        shadowStyle={styles.shadow.small}
      />
      <Container flexStyle={styles.flex.title}>
        {user?.user_name && (
          <Text text={user.user_name} textStyle={styles.text.userName} />
        )}
        {user?.address && (
          <Text
            text={user.address}
            textStyle={styles.text.address}
            color={theme.color.textMuted}
          />
        )}
      </Container>
      <Container flexStyle={styles.flex.subTitle}>
        {user?.email && (
          <Container flexStyle={styles.flex.info} viewStyle={styles.view.info}>
            <Icon name="mail" />
            <Text text={user.email} textStyle={styles.text.info} />
          </Container>
        )}
        {user?.phone_number && (
          <Container flexStyle={styles.flex.info} viewStyle={styles.view.info}>
            <Icon name="phone" />
            <Text text={user.phone_number} textStyle={styles.text.info} />
          </Container>
        )}
        {user?.bio && (
          <Container flexStyle={styles.flex.info} viewStyle={styles.view.info}>
            <Icon name="info" strokeWidth={1.2} />
            <Container flexStyle={styles.flex.bio}>
              <Text text={user.bio} textStyle={styles.text.info} />
            </Container>
          </Container>
        )}
      </Container>
      <Text
        text={t('screens.profile.posts')}
        textStyle={styles.text.postHeader}
        color={theme.color.textMuted}
      />
    </Container>
  );
};

export default Header;

const enum FlexStyles {
  CONTAINER = 'container',
  TITLE = 'title',
  SUB_TITLE = 'subTitle',
  INFO = 'info',
  BIO = 'bio',
}

const enum ImageStyles {
  AVATAR = 'avatar',
}

const enum ShadowStyles {
  SMALL = 'small',
}

const enum TextStyles {
  USER_NAME = 'userName',
  ADDRESS = 'address',
  INFO = 'info',
  POST_HEADER = 'postHeader',
}

const enum ViewStyles {
  CONTAINER = 'container',
  INFO = 'info',
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
    [FlexStyles.CONTAINER]: {
      gap: scaleProportionally(10),
    },
    [FlexStyles.TITLE]: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    [FlexStyles.SUB_TITLE]: {
      gap: scaleProportionally(20),
    },
    [FlexStyles.INFO]: {
      width: '95%',
      alignSelf: 'center',
      flexDirection: 'row',
      gap: scaleProportionally(5),
      alignItems: 'center',
      paddingHorizontal: scaleWidth(10),
      paddingVertical: scaleHeight(5),
      borderWidth: 1,
    },
    [FlexStyles.BIO]: {
      flex: 1,
      flexWrap: 'wrap',
      overflow: 'hidden',
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
    [ShadowStyles.SMALL]: {
      elevation: 3,
      shadowColor: theme.color.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.USER_NAME]: {
      fontSize: theme.common.font.sizes._32,
      fontFamily: theme.common.font.families.bold,
      textAlign: 'center',
    },
    [TextStyles.ADDRESS]: {
      fontSize: theme.common.font.sizes._14,
      fontFamily: theme.common.font.families.medium,
      textAlign: 'center',
    },
    [TextStyles.INFO]: {
      fontSize: theme.common.font.sizes._16,
      fontFamily: theme.common.font.families.regular,
    },
    [TextStyles.POST_HEADER]: {
      fontSize: theme.common.font.sizes._24,
      fontFamily: theme.common.font.families.bold,
      textAlign: 'center',
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.CONTAINER]: {
      backgroundColor: theme.color.background,
    },
    [ViewStyles.INFO]: {
      borderRadius: scaleProportionally(10),
      borderColor: theme.color.border,
    },
  });

  return { flex, image, shadow, text, view };
};
