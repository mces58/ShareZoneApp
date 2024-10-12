import { Dispatch, SetStateAction } from 'react';
import { Share } from 'react-native';

import { likePost, unlikePost } from 'src/services';
import { downloadFile, stripHtmlTags } from 'src/utils';

import { Like, PostData, User } from 'src/constants/types';

interface LikeParams {
  isLike: boolean;
  likes: Like[] | undefined;
  post: PostData;
  setIsLike: Dispatch<SetStateAction<boolean>>;
  setLikes: Dispatch<SetStateAction<PostData['post_likes']>>;
  user: User;
}

interface ShareParams {
  post: PostData;
  setLoading: Dispatch<SetStateAction<boolean>>;
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
        setLikes(likes ? likes.filter((like) => like.user_id !== user.id) : []);
      } else console.error('Error unliking post ', res.error);
    } else {
      if (user.id === undefined) return;
      const res = await likePost(post.id, user.id);
      if (res.success && res.data) {
        setIsLike(true);
        setLikes([...(likes || []), res.data]);
      } else console.error('Error liking post ', res.error);
    }
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error liking post');
  }
};

const ShareFunction = async ({ post, setLoading }: ShareParams): Promise<void> => {
  try {
    const content: { message: string; url: string } = {
      message: stripHtmlTags(post.body),
      url: post.file,
    };

    if (post.file) {
      setLoading(true);
      const url = await downloadFile(post.file);
      setLoading(false);
      content.url = url;
    }

    if (post.body !== '') Share.share({ message: content.message, url: content.url });
    else Share.share({ url: content.url });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error sharing post');
  }
};

export { LikeFunction, ShareFunction };
