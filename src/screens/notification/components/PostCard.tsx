import React, { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import RenderHTML from 'react-native-render-html';

import { useI18n } from 'src/contexts';
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
import { Video } from 'src/components/videos';
import { Theme } from 'src/constants/styles';
import {
  CustomFlexStyle,
  CustomImageStyle,
  CustomTextStyle,
  CustomViewStyle,
  PostData,
  User,
} from 'src/constants/types';

interface PostCardProps {
  post: PostData;
  sender: User;
  theme: Theme;
  user: User;
}

const PostCard: FC<PostCardProps> = ({ post, sender, theme, user }) => {
  const styles = useMemo(() => createStyles(theme, post.body), [theme]);
  const { t } = useI18n();

  return (
    <Container flexStyle={styles.flex.card} viewStyle={styles.view.card}>
      <Container flexStyle={styles.flex.cardHeader} viewStyle={styles.view.cardHeader}>
        <Container flexStyle={styles.flex.profile}>
          <Image uri={post.user?.image} imageStyle={styles.image.avatar} />
          {post.user?.user_name && (
            <Text
              text={
                post.user.user_name === user.user_name
                  ? t('global.you')
                  : post.user.user_name
              }
              textStyle={styles.text.headerUserName}
            />
          )}
        </Container>
      </Container>
      <Container flexStyle={styles.flex.cardBody}>
        {post.file.includes('image') ? (
          <Image uri={post.file} imageStyle={styles.image.post} />
        ) : (
          <Video
            uri={post.file}
            shouldPlay
            isLooping
            useNativeControls={false}
            videoStyle={styles.image.post}
          />
        )}
      </Container>
      <Container flexStyle={styles.flex.cardFooter}>
        <Container flexStyle={styles.flex.icon}>
          <Container flexStyle={styles.flex.iconInteraction}>
            <Image uri={sender.image} imageStyle={styles.image.smallCover} />
            <Icon name="heart" size={scaleByAspectRatio(20)} strokeWidth={1.8} />
            {post.post_likes && post.post_likes.length > 0 && (
              <Text
                text={post.post_likes.length.toString()}
                color={theme.color.textMuted}
              />
            )}
          </Container>
          <Container flexStyle={styles.flex.iconInteraction}>
            <Icon name="comment" size={scaleByAspectRatio(20)} strokeWidth={1.8} />
            {post.comments && post.comments.length > 0 && (
              <Text
                text={post.comments.length.toString()}
                color={theme.color.textMuted}
              />
            )}
          </Container>
        </Container>
      </Container>
      {post.body && (
        <Container flexStyle={styles.flex.postText} viewStyle={styles.view.cardBody}>
          {post.user?.user_name && (
            <Text
              text={post.user.user_name + ':'}
              textStyle={styles.text.footerUserName}
            />
          )}
          <RenderHTML
            source={{ html: post.body }}
            contentWidth={300}
            baseStyle={{ color: theme.color.text }}
          />
        </Container>
      )}
    </Container>
  );
};

export default PostCard;

const enum FlexStyles {
  CARD = 'card',
  CARD_HEADER = 'cardHeader',
  ICON_CONTAINER = 'iconContainer',
  PROFILE = 'profile',
  CARD_BODY = 'cardBody',
  CARD_FOOTER = 'cardFooter',
  ICON = 'icon',
  ICON_INTERACTION = 'iconInteraction',
  POST_TEXT = 'postText',
}

const enum ImageStyles {
  AVATAR = 'avatar',
  POST = 'post',
  SMALL_COVER = 'smallCover',
}

const enum TextStyles {
  HEADER_USER_NAME = 'headerUserName',
  FOOTER_USER_NAME = 'footerUserName',
}

const enum ViewStyles {
  CARD = 'card',
  CARD_HEADER = 'cardHeader',
  CARD_BODY = 'cardBody',
}

const createStyles = (
  theme: Theme,
  bodyText: string
): {
  flex: Record<FlexStyles, CustomFlexStyle>;
  image: Record<ImageStyles, CustomImageStyle>;
  text: Record<TextStyles, CustomTextStyle>;
  view: Record<ViewStyles, CustomViewStyle>;
} => {
  const flex = StyleSheet.create<Record<FlexStyles, CustomFlexStyle>>({
    [FlexStyles.CARD]: {
      width: '100%',
      paddingVertical: scaleHeight(0),
      alignSelf: 'center',
      borderWidth: 1,
    },
    [FlexStyles.CARD_HEADER]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: scaleWidth(10),
      paddingVertical: scaleHeight(10),
      borderBottomWidth: 1,
    },
    [FlexStyles.PROFILE]: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleProportionally(5),
    },
    [FlexStyles.ICON_CONTAINER]: {
      flexDirection: 'row',
      gap: scaleProportionally(5),
    },
    [FlexStyles.CARD_BODY]: {
      gap: scaleProportionally(10),
    },
    [FlexStyles.CARD_FOOTER]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: scaleWidth(10),
      paddingVertical: scaleHeight(10),
    },
    [FlexStyles.ICON]: {
      flexDirection: 'row',
      gap: scaleProportionally(10),
    },
    [FlexStyles.ICON_INTERACTION]: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: scaleProportionally(3),
    },
    [FlexStyles.POST_TEXT]: {
      paddingHorizontal: scaleWidth(10),
      paddingVertical: scaleHeight(10),
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleProportionally(5),
      borderTopWidth: 1,
    },
  });

  const image = StyleSheet.create<Record<ImageStyles, CustomImageStyle>>({
    [ImageStyles.AVATAR]: {
      width: scaleByAspectRatio(40),
      height: scaleByAspectRatio(40),
      borderRadius: scaleByAspectRatio(20),
    },
    [ImageStyles.POST]: {
      width: '100%',
      height: scaleHeight(300),
      borderBottomLeftRadius: bodyText ? 0 : scaleProportionally(10),
      borderBottomRightRadius: bodyText ? 0 : scaleProportionally(10),
    },
    [ImageStyles.SMALL_COVER]: {
      width: scaleByAspectRatio(20),
      height: scaleByAspectRatio(20),
      borderRadius: scaleByAspectRatio(10),
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.HEADER_USER_NAME]: {
      textTransform: 'capitalize',
      fontFamily: theme.common.font.families.bold,
      fontSize: theme.common.font.sizes._18,
    },
    [TextStyles.FOOTER_USER_NAME]: {
      textTransform: 'lowercase',
      textDecorationLine: 'underline',
      fontFamily: theme.common.font.families.bold,
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.CARD]: {
      backgroundColor: theme.color.overlay,
      borderRadius: scaleProportionally(10),
      borderColor: theme.color.border,
    },
    [ViewStyles.CARD_HEADER]: {
      borderColor: theme.color.border,
    },
    [ViewStyles.CARD_BODY]: {
      borderColor: theme.color.border,
    },
  });

  return { flex, image, text, view };
};
