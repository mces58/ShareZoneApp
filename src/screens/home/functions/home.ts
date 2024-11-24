import { Dispatch, SetStateAction } from 'react';

import { getPosts, getUserById } from 'src/services';
import { supabase } from 'src/supabase';

import { PostData } from 'src/constants/types';

interface FunctionParams {
  hasMore: boolean;
  limit: number;
  posts: PostData[];
  setHasMore: Dispatch<SetStateAction<boolean>>;
  setLimit: Dispatch<SetStateAction<number>>;
  setPosts: Dispatch<SetStateAction<PostData[]>>;
}

const FetchPostsFunction = async ({
  hasMore,
  limit,
  setHasMore,
  setLimit,
  setPosts,
  posts,
}: FunctionParams): Promise<void> => {
  try {
    if (!hasMore) return;

    const res = await getPosts(limit);
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
  setNotificationCount,
  setPosts,
  user,
}: {
  setLimit: Dispatch<SetStateAction<number>>;
  setNotificationCount: Dispatch<SetStateAction<number>>;
  setPosts: Dispatch<SetStateAction<PostData[]>>;
  user: { id: string };
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

    const notification_channels = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        async (payload) => {
          if (payload.new.id && payload.new.receiver_id === user.id)
            setNotificationCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return (): void => {
      supabase.removeChannel(post_channels);
      supabase.removeChannel(notification_channels);
    };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error fetching posts');
  }
};

export { FetchPostsFunction, PostChannelFunction };
