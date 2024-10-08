import * as FileSystem from 'expo-file-system';

import { decode } from 'base64-arraybuffer';
import { supabase } from 'src/supabase';

import { BASE_FOLDER, FolderNames } from 'src/constants/types';

interface UploadFileOptions {
  fileUri: string;
  folderName: FolderNames;
  mimeType: string;
  encoding?: FileSystem.EncodingType;
}

export const uploadFile = async (
  options: UploadFileOptions
): Promise<
  | {
      fileName: string;
      folderName: FolderNames;
      fullPath: string;
      id: string;
      path: string;
    }
  | undefined
> => {
  const {
    fileUri,
    folderName,
    mimeType,
    encoding = FileSystem.EncodingType.Base64,
  } = options;

  try {
    const [, fileExtension] = mimeType.split('/');
    const timestamp = new Date().getTime();
    const filePath = `${folderName}/${timestamp}.${fileExtension}`;
    const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding });
    const fileData = decode(fileContent);

    const { data, error } = await supabase.storage
      .from(BASE_FOLDER)
      .upload(filePath, fileData, {
        contentType: mimeType,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw new Error(error.message);

    return {
      fileName: `${timestamp}.${fileExtension}`,
      folderName,
      fullPath: data.fullPath,
      id: data.id,
      path: data.path,
    };
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error('Error uploading file');
  }
};
