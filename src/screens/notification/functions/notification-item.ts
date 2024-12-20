import { Dispatch, SetStateAction } from 'react';

import { deleteNotification, getPost } from 'src/services';

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

const DeleteNotificationFunction = async (
  notificationId: string,
  setPostDetailBottomSheetVisible: Dispatch<SetStateAction<boolean>>
): Promise<void> => {
  try {
    setPostDetailBottomSheetVisible(true);
    await deleteNotification(notificationId);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error updating notification');
  }
};

export { FetchPostsFunction, DeleteNotificationFunction };
