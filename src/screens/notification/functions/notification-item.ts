import { Dispatch, SetStateAction } from 'react';

import { getPost } from 'src/services';

import { PostData } from 'src/constants/types';

interface PostFunctionParams {
  notification: { data: string };
  setCommentId: Dispatch<SetStateAction<string>>;
  setPost: Dispatch<SetStateAction<PostData | null>>;
}

const FetchPostsFunction = async ({
  notification,
  setCommentId,
  setPost,
}: PostFunctionParams): Promise<void> => {
  try {
    const { postId, commentId } = JSON.parse(notification.data);
    setCommentId(commentId);
    const res = await getPost(postId);
    if (res.success && res.data) setPost(res.data);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error fetching posts');
  }
};

export default FetchPostsFunction;
