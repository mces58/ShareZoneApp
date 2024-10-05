import { Dispatch, SetStateAction } from 'react';

import { likePost, unlikePost } from 'src/services';

import { PostData, User } from 'src/constants/types';

interface LikeParams {
  isLike: boolean;
  likes: PostData['post_likes'];
  post: PostData;
  setIsLike: Dispatch<SetStateAction<boolean>>;
  setLikes: Dispatch<SetStateAction<PostData['post_likes']>>;
  user: User;
}

const LikeFunction = async ({
  isLike,
  likes,
  post,
  setIsLike,
  setLikes,
  user,
}: LikeParams): Promise<void> => {
  try {
    if (isLike) {
      if (user.id === undefined) return;
      const res = await unlikePost(post.id, user.id);
      if (res.success) {
        setIsLike(false);
        setLikes(likes.filter((like) => like.user_id !== user.id));
      } else console.error('Error unliking post ', res.error);
    } else {
      if (user.id === undefined) return;
      const res = await likePost(post.id, user.id);
      if (res.success && res.data) {
        setIsLike(true);
        setLikes([...likes, res.data]);
      } else console.error('Error liking post ', res.error);
    }
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error liking post');
  }
};

export default LikeFunction;
