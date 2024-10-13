import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import RenderHTML from 'react-native-render-html';

import { useAuth, useI18n } from 'src/contexts';
import {
  getTimeText,
  scaleByAspectRatio,
  scaleHeight,
  scaleProportionally,
  scaleWidth,
} from 'src/utils';

import Icon from 'src/assets/icons';
import { BottomSheet } from 'src/components/bottom-sheets';
import { Container } from 'src/components/containers';
import { Image } from 'src/components/images';
import { Text } from 'src/components/texts';
import { Video } from 'src/components/videos';
import { Theme } from 'src/constants/styles';
import {
  CustomFlexStyle,
  CustomImageStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
  Like,
  PostData,
} from 'src/constants/types';
import { HomeScreenNavigation } from 'src/navigations/RootStackParamList';
import { PostDetail } from 'src/screens/post';

import { LikeFunction, ShareFunction } from '../functions';

interface PostCardProps {
  isVideoVisible: boolean;
  navigation: HomeScreenNavigation;
  post: PostData;
  theme: Theme;
}

const PostCard: FC<PostCardProps> = ({ isVideoVisible, navigation, post, theme }) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const screenHeight = Dimensions.get('window').height;
  const timeText = getTimeText(post.created_at, t);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likes, setLikes] = useState<Like[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPostDetailBottomSheetVisible, setPostDetailBottomSheetVisible] =
    useState<boolean>(false);

  useEffect(() => {
    const likes = (post.post_likes ?? []).filter((like) => like.user_id === user?.id);
    setLikes(post.post_likes ?? []);
    setIsLike(likes.length > 0);
  }, [post.post_likes, user]);

  const handleLike = useCallback(async (): Promise<void> => {
    if (user) LikeFunction({ isLike, likes, post, setIsLike, setLikes, user });
  }, [isLike, likes]);

  const handleShare = useCallback(async (): Promise<void> => {
    ShareFunction({ post, setLoading });
  }, []);

  const handlePostDetailOpen = (): void => {
    setPostDetailBottomSheetVisible(true);
  };

  const handlePostDetailClose = (): void => {
    setPostDetailBottomSheetVisible(false);
  };

  return (
    <Container
      flexStyle={styles.flex.card}
      viewStyle={styles.view.card}
      shadowStyle={styles.shadow.small}
    >
      <Container flexStyle={styles.flex.cardHeader}>
        <Container flexStyle={styles.flex.profile}>
          <Image uri={post.user?.image} imageStyle={styles.image.avatar} />
          {post.user?.user_name && (
            <Text text={post.user.user_name} textStyle={styles.text.headerUserName} />
          )}
        </Container>
        <Icon name="three-dot" />
      </Container>
      <Container flexStyle={styles.flex.cardBody}>
        {post.file.includes('image') ? (
          <Image uri={post.file} imageStyle={styles.image.post} />
        ) : (
          <Video
            uri={post.file}
            isLooping
            shouldPlay={isVideoVisible && !isPostDetailBottomSheetVisible}
            useNativeControls={false}
            videoStyle={styles.image.post}
          />
        )}
      </Container>
      <Container flexStyle={styles.flex.cardFooter}>
        <Container flexStyle={styles.flex.icon}>
          <Container flexStyle={styles.flex.iconInteraction}>
            <Icon
              name="heart"
              size={scaleByAspectRatio(20)}
              fillColor={isLike ? theme.common.color.danger : undefined}
              color={{ mono: isLike ? theme.common.color.danger : undefined }}
              strokeWidth={1.8}
              onPress={handleLike}
            />
            {likes && likes.length > 0 && (
              <Text text={likes.length.toString()} color={theme.color.textMuted} />
            )}
          </Container>
          <Container flexStyle={styles.flex.iconInteraction}>
            <Icon
              name="comment"
              size={scaleByAspectRatio(20)}
              strokeWidth={1.8}
              onPress={handlePostDetailOpen}
            />
            {post.comments && post.comments.length > 0 && (
              <Text
                text={post.comments.length.toString()}
                color={theme.color.textMuted}
              />
            )}
          </Container>
          {loading ? (
            <ActivityIndicator size="small" color={theme.color.text} />
          ) : (
            <Icon
              name="share"
              size={scaleByAspectRatio(20)}
              strokeWidth={1.8}
              onPress={handleShare}
            />
          )}
        </Container>
        <Text
          text={timeText}
          textStyle={styles.text.timeAgo}
          color={theme.color.textMuted}
        />
      </Container>
      {post.body && (
        <Container flexStyle={styles.flex.postText}>
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
      <BottomSheet
        height={screenHeight * 0.8}
        content={
          <PostDetail
            navigation={navigation}
            postData={post}
            setIsVisible={setPostDetailBottomSheetVisible}
          />
        }
        isVisible={isPostDetailBottomSheetVisible}
        onSwipeDown={handlePostDetailClose}
      />
    </Container>
  );
};

export default PostCard;

const enum FlexStyles {
  CARD = 'card',
  CARD_HEADER = 'cardHeader',
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
}

const enum ShadowStyles {
  SMALL = 'small',
}

const enum TextStyles {
  HEADER_USER_NAME = 'headerUserName',
  TIME_AGO = 'timeAgo',
  FOOTER_USER_NAME = 'footerUserName',
}

const enum ViewStyles {
  CARD = 'card',
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
    [FlexStyles.CARD]: {
      width: '95%',
      paddingVertical: scaleHeight(10),
      gap: scaleProportionally(10),
      alignSelf: 'center',
    },
    [FlexStyles.CARD_HEADER]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: scaleWidth(10),
    },
    [FlexStyles.PROFILE]: {
      flexDirection: 'row',
      alignItems: 'center',
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
      paddingVertical: scaleHeight(5),
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
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleProportionally(5),
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
    [TextStyles.HEADER_USER_NAME]: {
      textTransform: 'capitalize',
      fontFamily: theme.common.font.families.bold,
      fontSize: theme.common.font.sizes._18,
    },
    [TextStyles.TIME_AGO]: {
      fontFamily: theme.common.font.families.medium,
      fontSize: theme.common.font.sizes._12,
    },
    [TextStyles.FOOTER_USER_NAME]: {
      textTransform: 'lowercase',
      textDecorationLine: 'underline',
      fontFamily: theme.common.font.families.bold,
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.CARD]: {
      backgroundColor: theme.color.card,
      borderRadius: scaleProportionally(10),
    },
  });

  return { flex, image, shadow, text, view };
};
