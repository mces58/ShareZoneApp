import * as FileSystem from 'expo-file-system';

const getLocalFilePath = (fileUrl: string): string => {
  const filename = fileUrl.split('/').pop();
  return `${FileSystem.documentDirectory}${filename}`;
};

export const downloadFile = async (fileUrl: string): Promise<string> => {
  try {
    const { uri } = await FileSystem.downloadAsync(fileUrl, getLocalFilePath(fileUrl));

    return uri;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
};
