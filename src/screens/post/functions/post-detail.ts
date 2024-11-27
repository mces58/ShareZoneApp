import { Dispatch, SetStateAction } from 'react';

import {
  createNewComment,
  deleteComment,
  deletePost,
  getPost,
  getUserById,
  sendNotification,
} from 'src/services';
import { supabase } from 'src/supabase';

import { Comment, PostData, User } from 'src/constants/types';

interface GetPostParams {
  postId: string;
  setPost: Dispatch<SetStateAction<PostData | null>>;
}

interface NewCommentParams {
  post: PostData | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setText: Dispatch<SetStateAction<string>>;
  text: string;
  user: User;
}

interface DeleteCommentParams {
  comment: Comment;
  setPost: Dispatch<SetStateAction<PostData | null>>;
}

interface DeletePostParams {
  post: PostData;
  setIsVisible: (isVisible: boolean) => void;
  setPost: Dispatch<SetStateAction<PostData | null>>;
}

const FetchPostFunction = async ({ postId, setPost }: GetPostParams): Promise<void> => {
  try {
    const res = await getPost(postId);
    if (res.success) setPost(res.data);
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error posting');
  }
};

const NewCommentFunction = async ({
  post,
  setLoading,
  setText,
  text,
  user,
}: NewCommentParams): Promise<void> => {
  try {
    if (user.id === undefined) throw new Error('User not found');
    if (post?.id === undefined) throw new Error('Post not found');

    setLoading(true);

    const data = {
      user_id: user.id,
      post_id: post.id,
      text,
    };
    const res = await createNewComment(data.user_id, data.post_id, data.text);

    if (res.success) {
      setLoading(false);
      setText('');

      if (user.id !== post.user_id) {
        const notify = {
          data: JSON.stringify({ postId: post.id, commentId: res.data?.id }),
          receiverId: post.user_id,
          senderId: user.id,
          title: 'screens.notifications.notifyMessage.comment',
        };
        await sendNotification(notify);
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error commenting');
  }
};

const DeleteCommentFunction = async ({
  comment,
  setPost,
}: DeleteCommentParams): Promise<void> => {
  try {
    const res = await deleteComment(comment.id);

    if (res.success) {
      setPost((prev) => {
        if (prev === null) return prev;
        return {
          ...prev,
          comments: (prev.comments ?? []).filter((c) => c.id !== comment.id),
        };
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error deleting comment');
  }
};

const DeletePostFunction = async ({
  post,
  setIsVisible,
  setPost,
}: DeletePostParams): Promise<void> => {
  try {
    const res = await deletePost(post.id);

    if (res.success) {
      setPost(null);
      setIsVisible(false);
    }
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error deleting post');
  }
};

const CommentChannelFunction = async ({
  setPost,
}: {
  setPost: Dispatch<SetStateAction<PostData | null>>;
}) => {
  try {
    const comment_channel = supabase
      .channel('comments')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
        },
        async (payload) => {
          const newComment = { ...payload.new };
          const res = await getUserById(newComment.user_id);
          newComment.user = res.success && res.data ? res.data : null;

          const formattedComment = {
            id: newComment.id,
            post_id: newComment.post_id,
            text: newComment.text,
            created_at: newComment.created_at,
            user_id: newComment.user_id,
            user: newComment.user,
          };

          setPost((prev) => {
            if (prev === null) return prev;
            return {
              ...prev,
              comments: [formattedComment, ...(prev.comments ?? [])],
            };
          });
        }
      )
      .subscribe();

    return (): void => {
      supabase.removeChannel(comment_channel);
    };
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error subscribing to comments');
  }
};

export {
  FetchPostFunction,
  NewCommentFunction,
  DeleteCommentFunction,
  DeletePostFunction,
  CommentChannelFunction,
};
