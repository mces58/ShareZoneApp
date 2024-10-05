import React, { FC, useEffect, useMemo, useState } from 'react';

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

  useEffect(() => {
    PostChannelFunction({ setLimit, setPosts });
  }, []);

  return (
    <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
      <SubHeader
        title={t('app.name')}
        theme={theme}
        uri={user?.image}
        onPressNotificationHeaderIcon={() =>
          navigation.navigate(RootNavigations.NOTIFICATION)
        }
        onPressPostHeaderIcon={() => navigation.navigate(RootNavigations.POST)}
        onPressProfileHeaderIcon={() =>
          navigation.navigate(RootNavigations.PROFILE_STACK, {
            screen: ProfileNavigations.PROFILE,
          })
        }
      />
      <PostCards
        posts={posts}
        theme={theme}
        fetchPosts={() =>
          FetchPostsFunction({ hasMore, limit, posts, setHasMore, setLimit, setPosts })
        }
        hasMore={hasMore}
      />
    </Container>
  );
};

export default Home;
