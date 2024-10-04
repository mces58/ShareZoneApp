import React, { FC, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  ViewToken,
} from 'react-native';
import RenderHTML from 'react-native-render-html';

import moment from 'moment';
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
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
  PostData,
} from 'src/constants/types';

interface PostCardsProps {
  posts: PostData[];
  theme: Theme;
}

const PostCards: FC<PostCardsProps> = ({ posts, theme }) => {
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [viewableItems, setViewableItems] = useState<string[]>([]);
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const visibleIds = viewableItems.map((item) => String(item.item.id));
      setViewableItems(visibleIds);
    }
  );

  const renderPosts = (post: PostData): JSX.Element => {
    const createAt = moment(post.created_at).fromNow();
    const isVideoVisible = viewableItems.includes(post.id);

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
              shouldPlay={isVideoVisible}
              useNativeControls={false}
              videoStyle={styles.image.post}
            />
          )}
        </Container>
        <Container flexStyle={styles.flex.cardFooter}>
          <Container flexStyle={styles.flex.icon}>
            <Icon name="heart" size={scaleByAspectRatio(20)} strokeWidth={1.8} />
            <Icon name="comment" size={scaleByAspectRatio(20)} strokeWidth={1.8} />
            <Icon name="share" size={scaleByAspectRatio(20)} strokeWidth={1.8} />
          </Container>
          <Text
            text={createAt}
            textStyle={styles.text.createAt}
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
      </Container>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => renderPosts(item)}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flex.list}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
      initialNumToRender={10}
      windowSize={5}
      maxToRenderPerBatch={5}
      ListFooterComponent={
        <Container
          flexStyle={
            posts.length === 0 ? styles.flex.listFooterLoading : styles.flex.listFooter
          }
        >
          {posts.length > 1 ? (
            <ActivityIndicator
              size={posts.length === 0 ? 'large' : 'small'}
              color={theme.color.text}
            />
          ) : null}
        </Container>
      }
    />
  );
};

export default PostCards;

const enum FlexStyles {
  LIST = 'list',
  LIST_FOOTER = 'listFooter',
  LIST_FOOTER_LOADING = 'listFooterLoading',
  CARD = 'card',
  CARD_HEADER = 'cardHeader',
  PROFILE = 'profile',
  CARD_BODY = 'cardBody',
  CARD_FOOTER = 'cardFooter',
  ICON = 'icon',
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
  CREATE_AT = 'createAt',
  FOOTER_USER_NAME = 'footerUserName',
}

const enum ViewStyles {
  CARD = 'card',
}

const createStyles = (
  theme: Theme,
  deviceHeight: number = Dimensions.get('window').height
): {
  flex: Record<FlexStyles, CustomFlexStyle>;
  image: Record<ImageStyles, CustomImageStyle>;
  shadow: Record<ShadowStyles, CustomShadowStyle>;
  text: Record<TextStyles, CustomTextStyle>;
  view: Record<ViewStyles, CustomViewStyle>;
} => {
  const flex = StyleSheet.create<Record<FlexStyles, CustomFlexStyle>>({
    [FlexStyles.LIST]: {
      gap: scaleProportionally(15),
      paddingVertical: scaleHeight(15),
    },
    [FlexStyles.LIST_FOOTER]: {
      marginVertical: scaleHeight(5),
    },
    [FlexStyles.LIST_FOOTER_LOADING]: {
      marginTop: deviceHeight * 0.4,
    },
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
    [TextStyles.CREATE_AT]: {
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
    [FlexStyles.CARD]: {
      backgroundColor: theme.color.card,
      borderRadius: scaleProportionally(10),
    },
  });

  return { flex, image, shadow, text, view };
};
