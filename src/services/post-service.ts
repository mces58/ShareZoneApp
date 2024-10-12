import { supabase } from 'src/supabase';

import { Comment, FolderNames, Like, PostData } from 'src/constants/types';

import { getImageUri } from './image-service';
import { uploadFile } from './upload-file-service';

interface CreatePostParams {
  body: string;
  fileUri: string;
  mimeType: string;
  type: string;
  userId: string;
}

export const createPost = async ({
  body,
  fileUri,
  mimeType,
  type,
  userId,
}: CreatePostParams): Promise<{
  data: PostData | null;
  success: boolean;
  error?: Error;
}> => {
  try {
    const uploadResponse = await uploadFile({
      fileUri,
      folderName: type === 'image' ? FolderNames.POST_IMAGE : FolderNames.POST_VIDEO,
      mimeType,
    });

    if (!uploadResponse) throw new Error('Failed to upload file');

    const imageUri = getImageUri(
      type === 'image' ? FolderNames.POST_IMAGE : FolderNames.POST_VIDEO,
      uploadResponse.fileName
    );

    const { data, error } = await supabase
      .from('posts')
      .upsert({
        body,
        user_id: userId,
        file: imageUri,
      })
      .select('*')
      .single();

    if (error) throw error instanceof Error ? error : new Error(String(error));

    return {
      success: true,
      data,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error : new Error('Unknown error occurred');
    return {
      success: false,
      data: null,
      error: errorMessage,
    };
  }
};

export const getPosts = async (
  limit = 10
): Promise<{
  data: PostData[] | null;
  success: boolean;
  error?: Error;
}> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*, user:user_id(*), post_likes(*), comments(*, user:user_id(*))')
      .limit(limit)
      .order('created_at', { ascending: false });

    if (error) throw error instanceof Error ? error : new Error(String(error));

    return {
      success: true,
      data,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error : new Error('Unknown error occurred');
    return {
      success: false,
      data: null,
      error: errorMessage,
    };
  }
};

export const likePost = async (
  post_id: string,
  user_id: string
): Promise<{
  data: Like | null;
  success: boolean;
  error?: Error;
}> => {
  try {
    const { data, error } = await supabase
      .from('post_likes')
      .insert({
        post_id,
        user_id,
      })
      .select('*')
      .single();

    if (error) throw error instanceof Error ? error : new Error(String(error));

    return {
      success: true,
      data,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error : new Error('Unknown error occurred');
    return {
      success: false,
      data: null,
      error: errorMessage,
    };
  }
};

export const unlikePost = async (
  post_id: string,
  user_id: string
): Promise<{
  success: boolean;
  error?: Error;
}> => {
  try {
    const { error } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', post_id)
      .eq('user_id', user_id);

    if (error) throw error instanceof Error ? error : new Error(String(error));

    return {
      success: true,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error : new Error('Unknown error occurred');
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const getPost = async (
  postId: string
): Promise<{
  data: PostData | null;
  success: boolean;
  error?: Error;
}> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*, user:user_id(*), post_likes(*), comments(*, user:user_id(*))')
      .eq('id', postId)
      .single();

    if (error) throw error instanceof Error ? error : new Error(String(error));

    return {
      success: true,
      data,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error : new Error('Unknown error occurred');
    return {
      success: false,
      data: null,
      error: errorMessage,
    };
  }
};

export const createNewComment = async (
  user_id: string,
  post_id: string,
  text: string
): Promise<{
  data: Comment | null;
  success: boolean;
  error?: Error;
}> => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        user_id,
        post_id,
        text,
      })
      .select('*, user:user_id(*)')
      .single();

    if (error) throw error instanceof Error ? error : new Error(String(error));

    return {
      success: true,
      data,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error : new Error('Unknown error occurred');
    return {
      success: false,
      data: null,
      error: errorMessage,
    };
  }
};

export const deleteComment = async (
  commentId: string
): Promise<{
  success: boolean;
  error?: Error;
}> => {
  try {
    const { error } = await supabase.from('comments').delete().eq('id', commentId);

    if (error) throw error instanceof Error ? error : new Error(String(error));

    return {
      success: true,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error : new Error('Unknown error occurred');
    return {
      success: false,
      error: errorMessage,
    };
  }
};
