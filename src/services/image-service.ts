import { supabase } from 'src/supabase';

import { BASE_IMAGE_FOLDER, ImageFolderNames } from 'src/constants/types';

export const getImageUri = (folderName: ImageFolderNames, fileName: string): string => {
  const {
    data: { publicUrl },
  } = supabase.storage.from(`${BASE_IMAGE_FOLDER}/${folderName}`).getPublicUrl(fileName);

  return publicUrl;
};
