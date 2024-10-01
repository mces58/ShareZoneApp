import React, { FC, useEffect, useMemo, useState } from 'react';

import { useTheme } from 'styled-components/native';

import { useAuth, useI18n } from 'src/contexts';
import { getPosts, getUserById } from 'src/services';
import { supabase } from 'src/supabase';

import { Container } from 'src/components/containers';
import { Theme } from 'src/constants/styles';
import { PostData } from 'src/constants/types';
import { ProfileNavigations } from 'src/navigations/profile/ProfileStackParamList';
import {
  HomeScreenNavigation,
  RootNavigations,
} from 'src/navigations/RootStackParamList';

import { PostCards, SubHeader } from '../components';
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

  let limit = 0;

  useEffect(() => {
    const post_channels = supabase
      .channel('posts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        async (payload) => {
          if (payload.eventType === 'INSERT' && payload.new.id) {
            const newPost = { ...payload.new };
            const res = await getUserById(newPost.user_id);
            if (res.success && res.data) {
              newPost.user = res.data;
              setPosts((prev) => [{ ...newPost } as PostData, ...prev]);
            }
          }
        }
      )
      .subscribe();

    fetchPosts();

    return (): void => {
      supabase.removeChannel(post_channels);
    };
  }, []);

  const fetchPosts = async (): Promise<void> => {
    limit += 10;
    const res = await getPosts(limit);
    if (res.success && res.data) {
      setPosts(res.data);
    }
  };

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
      <Container flexStyle={styles.flex.body}>
        <PostCards posts={posts} theme={theme} />
      </Container>
    </Container>
  );
};

export default Home;
