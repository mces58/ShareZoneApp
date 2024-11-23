import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, ViewToken } from 'react-native';

import { useAuth, useI18n } from 'src/contexts';
import { useTheme } from 'styled-components';

import { Container } from 'src/components/containers';
import { Text } from 'src/components/texts';
import { Theme } from 'src/constants/styles';
import { PostData } from 'src/constants/types';
import {
  ProfileNavigations,
  ProfileScreenNavigation,
} from 'src/navigations/profile/ProfileStackParamList';

import { DeletePostModal, Header, PostCard } from '../components';
import {
  DeletePostFunction,
  FetchPostsFunction,
  PostChannelFunction,
  SignoutFunction,
} from '../functions';
import { createProfileStyles } from '../styles';

interface ProfileProps {
  navigation: ProfileScreenNavigation;
}

const Profile: FC<ProfileProps> = ({ navigation }) => {
  const { setAuthData, user } = useAuth();
  const theme = useTheme() as Theme;
  const { t } = useI18n();
  const styles = useMemo(() => createProfileStyles(theme), [theme]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [limit, setLimit] = useState<number>(3);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [post, setPost] = useState<PostData | null>(null);
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

  useEffect(() => {
    PostChannelFunction({ setLimit, setPosts });
  }, []);

  const handleFetchPosts = useCallback(() => {
    if (user?.id)
      FetchPostsFunction({
        hasMore,
        limit,
        posts,
        setHasMore,
        setLimit,
        setPosts,
        userId: user.id,
      });
  }, [hasMore, limit, posts]);

  const handleSignOut = useCallback((): void => {
    SignoutFunction({ setAuthData, t });
  }, []);

  const handleDeletePost = useCallback(async (): Promise<void> => {
    if (post) await DeletePostFunction({ post, setPost, setShowOptions, t });
  }, [post]);

  return (
    <>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            theme={theme}
            isVideoVisible={viewableItems.includes(String(item.id))}
            onPressThreeDot={() => {
              setShowOptions(true);
              setPost(item);
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.flex.list, styles.view.list]}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        initialNumToRender={5}
        windowSize={5}
        maxToRenderPerBatch={5}
        onEndReached={handleFetchPosts}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <Header
            onPressEditProfile={() =>
              navigation.navigate(ProfileNavigations.PROFILE_EDIT)
            }
            onPressExtraHeaderIcon={handleSignOut}
            onPressHeaderIcon={() => navigation.goBack()}
            theme={theme}
          />
        }
        ListFooterComponent={
          <Container>
            {hasMore ? (
              <ActivityIndicator
                size={posts.length === 0 ? 'large' : 'small'}
                color={theme.color.text}
              />
            ) : (
              <Text
                text={
                  posts.length === 0
                    ? t('screens.profile.noPosts')
                    : t('screens.profile.noMorePosts')
                }
                textStyle={styles.text.listFooter}
                color={theme.color.textMuted}
              />
            )}
          </Container>
        }
      />
      {showOptions && (
        <DeletePostModal
          onClose={() => setShowOptions(false)}
          onConfirm={handleDeletePost}
          showOptions={showOptions}
          theme={theme}
        />
      )}
    </>
  );
};

export default Profile;
