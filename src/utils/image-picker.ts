import {
  ImagePickerResult,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';

interface OpenGalleryResponse {
  fileUri: string;
  mimeType: string;
}

export const openGallery = async (): Promise<OpenGalleryResponse> => {
  const { status } = await requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') throw new Error('Permission not granted');

  const result: ImagePickerResult = await launchImageLibraryAsync({
    mediaTypes: MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (result.canceled) throw new Error('User cancelled image picker');

  const { uri, mimeType } = result.assets[0];

  if (!uri || !mimeType) throw new Error('Invalid image');

  return {
    fileUri: uri,
    mimeType,
  };
};