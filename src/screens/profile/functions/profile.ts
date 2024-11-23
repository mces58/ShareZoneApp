import { Dispatch, SetStateAction } from 'react';
import { Alert, ToastAndroid } from 'react-native';

import { TranslationOptions } from 'src/contexts';
import { deletePost, getPosts, getUserById } from 'src/services';
import { supabase } from 'src/supabase';

import { PostData, User } from 'src/constants/types';

interface SignoutParams {
  setAuthData: (user: User | null) => void;
  t: (key: string, options?: TranslationOptions) => string;
}

interface FetchPostsParams {
  hasMore: boolean;
  limit: number;
  posts: PostData[];
  setHasMore: Dispatch<SetStateAction<boolean>>;
  setLimit: Dispatch<SetStateAction<number>>;
  setPosts: Dispatch<SetStateAction<PostData[]>>;
  userId: string;
}

interface DeletePostParams {
  post: PostData;
  setPost: Dispatch<SetStateAction<PostData | null>>;
  setShowOptions: Dispatch<SetStateAction<boolean>>;
  t: (key: string, options?: TranslationOptions) => string;
}

const onSignout = async ({ setAuthData, t }: SignoutParams): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) Alert.alert(t('error.default'), error.message);
  else setAuthData(null);
};

const SignoutFunction = ({ setAuthData, t }: SignoutParams): void => {
  Alert.alert(t('global.confirm'), t('screens.profile.signout?'), [
    {
      text: t('global.cancel'),
      style: 'cancel',
    },
    {
      text: t('global.ok'),
      onPress: async (): Promise<void> => await onSignout({ setAuthData, t }),
      style: 'destructive',
    },
  ]);
};

const FetchPostsFunction = async ({
  hasMore,
  limit,
  setHasMore,
  setLimit,
  setPosts,
  posts,
  userId,
}: FetchPostsParams): Promise<void> => {
  try {
    if (!hasMore) return;

    const res = await getPosts(limit, userId);

    if (res.success && res.data) {
      if (res.data.length === posts.length) setHasMore(false);
      else setPosts(res.data);

      setLimit((prevLimit) => prevLimit + 3);
    }
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error fetching posts');
  }
};

const PostChannelFunction = async ({
  setLimit,
  setPosts,
}: {
  setLimit: Dispatch<SetStateAction<number>>;
  setPosts: Dispatch<SetStateAction<PostData[]>>;
}) => {
  try {
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
              setLimit((prevLimit) => prevLimit + 1);
            }
          }
          if (payload.eventType === 'DELETE' && payload.old.id) {
            setPosts((prev) => prev.filter((post) => post.id !== payload.old.id));
            setLimit((prevLimit) => prevLimit - 1);
          }
          if (payload.eventType === 'UPDATE' && payload.new.id) {
            const updatedPost = { ...payload.new };
            const res = await getUserById(updatedPost.user_id);
            if (res.success && res.data) {
              updatedPost.user = res.data;
              setPosts((prev) =>
                prev.map((post) =>
                  post.id === updatedPost.id ? ({ ...updatedPost } as PostData) : post
                )
              );
            }
          }
        }
      )
      .subscribe();

    return (): void => {
      supabase.removeChannel(post_channels);
    };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error fetching posts');
  }
};

const DeletePostFunction = async ({
  post,
  setPost,
  setShowOptions,
  t,
}: DeletePostParams): Promise<void> => {
  try {
    const res = await deletePost(post.id);

    if (res.success) {
      setPost(null);
      setShowOptions(false);
      ToastAndroid.show(t('toast.success.postDeleted'), ToastAndroid.SHORT);
    }
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error deleting post');
  }
};

export { FetchPostsFunction, PostChannelFunction, SignoutFunction, DeletePostFunction };
