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

export { FetchPostsFunction, PostChannelFunction };
