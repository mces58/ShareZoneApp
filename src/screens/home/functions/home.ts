import { Dispatch, SetStateAction } from 'react';

import { getPosts, getUserById } from 'src/services';
import { supabase } from 'src/supabase';

import { PostData } from 'src/constants/types';

interface FunctionParams {
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setPosts: Dispatch<SetStateAction<PostData[]>>;
}

const FetchPostsFunction = async ({
  limit,
  setLimit,
  setPosts,
}: FunctionParams): Promise<void> => {
  try {
    const res = await getPosts(limit);
    if (res.success && res.data) {
      setPosts(res.data);
      setLimit((prevLimit) => prevLimit + 10);
    }
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error fetching posts');
  }
};

const PostChannelFunction = async ({ limit, setLimit, setPosts }: FunctionParams) => {
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

    await FetchPostsFunction({ limit, setLimit, setPosts });

    return (): void => {
      supabase.removeChannel(post_channels);
    };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error fetching posts');
  }
};

export default PostChannelFunction;
