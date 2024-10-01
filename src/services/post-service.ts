import { supabase } from 'src/supabase';

import { FolderNames, PostData } from 'src/constants/types';

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
      .select('*, user:user_id(*)')
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
