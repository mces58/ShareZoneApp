import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { useTheme } from 'styled-components/native';

import { useAuth, useI18n } from 'src/contexts';

import { Container } from 'src/components/containers';
import { Theme } from 'src/constants/styles';
import { PostData } from 'src/constants/types';
import { ProfileNavigations } from 'src/navigations/profile/ProfileStackParamList';
import {
  HomeScreenNavigation,
  RootNavigations,
} from 'src/navigations/RootStackParamList';

import { PostCards, SubHeader } from '../components';
import { FetchPostsFunction, PostChannelFunction } from '../functions';
import { createHomeStyles } from '../styles';

interface HomeProps {
  navigation: HomeScreenNavigation;
}

const Home: FC<HomeProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const theme = useTheme() as Theme;
  const styles = useMemo(() => createHomeStyles(theme), [theme]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [limit, setLimit] = useState<number>(3);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [notificationCount, setNotificationCount] = useState<number>(0);

  useEffect(() => {
    if (user?.id)
      PostChannelFunction({
        setLimit,
        setNotificationCount,
        setPosts,
        user: { id: user.id },
      });
  }, []);

  const handleFetchPosts = useCallback(() => {
    FetchPostsFunction({ hasMore, limit, posts, setHasMore, setLimit, setPosts });
  }, [hasMore, limit, posts]);

  return (
    <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
      <SubHeader
        notificationCount={notificationCount}
        title={t('app.name')}
        theme={theme}
        uri={user?.image}
        onPressNotificationHeaderIcon={() => {
          navigation.navigate(RootNavigations.NOTIFICATION);
          setNotificationCount(0);
        }}
        onPressPostHeaderIcon={() => navigation.navigate(RootNavigations.POST, {})}
        onPressProfileHeaderIcon={() =>
          navigation.navigate(RootNavigations.PROFILE_STACK, {
            screen: ProfileNavigations.PROFILE,
          })
        }
      />
      <PostCards
        posts={posts}
        navigation={navigation}
        theme={theme}
        fetchPosts={handleFetchPosts}
        hasMore={hasMore}
      />
    </Container>
  );
};

export default Home;
