import { supabase } from 'src/supabase';

import { BASE_FOLDER, FolderNames } from 'src/constants/types';

export const getImageUri = (folderName: FolderNames, fileName: string): string => {
  const {
    data: { publicUrl },
  } = supabase.storage.from(`${BASE_FOLDER}/${folderName}`).getPublicUrl(fileName);

  return publicUrl;
};
