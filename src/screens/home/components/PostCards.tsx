import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  ViewToken,
} from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { useI18n } from 'src/contexts';
import { scaleHeight, scaleProportionally } from 'src/utils';

import { Container } from 'src/components/containers';
import { Text } from 'src/components/texts';
import { Theme } from 'src/constants/styles';
import { CustomFlexStyle, CustomTextStyle, PostData } from 'src/constants/types';
import { HomeScreenNavigation } from 'src/navigations/RootStackParamList';

import PostCard from './PostCard';

interface PostCardsProps {
  fetchPosts: () => void;
  hasMore: boolean;
  navigation: HomeScreenNavigation;
  posts: PostData[];
  theme: Theme;
}

const PostCards: FC<PostCardsProps> = ({
  fetchPosts,
  hasMore,
  navigation,
  posts,
  theme,
}) => {
  const { t } = useI18n();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [viewableItems, setViewableItems] = useState<string[]>([]);
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });
  const isFocused = useIsFocused();

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const visibleIds = viewableItems.map((item) => String(item.item.id));
      setViewableItems(visibleIds);
    }
  );

  // Reset viewable items when the screen is not focused
  useEffect(() => {
    if (!isFocused) {
      setViewableItems([]);
    }
  }, [isFocused]);

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          navigation={navigation}
          theme={theme}
          isVideoVisible={viewableItems.includes(String(item.id))}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flex.list}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
      initialNumToRender={5}
      windowSize={5}
      maxToRenderPerBatch={5}
      onEndReached={fetchPosts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        <Container
          flexStyle={
            posts.length === 0 ? styles.flex.listFooterLoading : styles.flex.listFooter
          }
        >
          {hasMore ? (
            <ActivityIndicator
              size={posts.length === 0 ? 'large' : 'small'}
              color={theme.color.text}
            />
          ) : (
            <Text
              text={
                posts.length === 0
                  ? t('screens.home.noPosts')
                  : t('screens.home.noMorePosts')
              }
              textStyle={styles.text.listFooter}
              color={theme.color.textMuted}
            />
          )}
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
}

const enum TextStyles {
  LIST_FOOTER = 'listFooter',
}

const createStyles = (
  theme: Theme,
  deviceHeight: number = Dimensions.get('window').height
): {
  flex: Record<FlexStyles, CustomFlexStyle>;
  text: Record<TextStyles, CustomTextStyle>;
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
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.LIST_FOOTER]: {
      fontFamily: theme.common.font.families.medium,
      fontSize: theme.common.font.sizes._12,
      textAlign: 'center',
    },
  });

  return { flex, text };
};
