import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { RichEditor } from 'react-native-pell-rich-editor';

import { MediaTypeOptions } from 'expo-image-picker';

import { TranslationOptions } from 'src/contexts';
import { createPost } from 'src/services';
import { openGallery } from 'src/utils';

import { ToastTypes } from 'src/components/toasts';
import { User } from 'src/constants/types';

interface MediaPickerParams {
  setFile: Dispatch<
    SetStateAction<{ mimeType: string; type: string; uri: string } | null>
  >;
}

interface PostFunctionsParams {
  bodyRef: MutableRefObject<string>;
  editorRef: MutableRefObject<RichEditor | null>;
  file: { mimeType: string; type: string; uri: string } | null;
  setFile: Dispatch<
    SetStateAction<{ mimeType: string; type: string; uri: string } | null>
  >;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setToast: Dispatch<SetStateAction<{ message: string; type: ToastTypes } | null>>;
  t: (key: string, options?: TranslationOptions) => string;
  user: User;
}

const ImagePickerFunction = async ({ setFile }: MediaPickerParams): Promise<void> => {
  try {
    const { fileUri, mimeType, type } = await openGallery(MediaTypeOptions.Images);
    setFile({ mimeType, type, uri: fileUri });
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error picking image');
  }
};

const VideoPickerFunction = async ({ setFile }: MediaPickerParams): Promise<void> => {
  try {
    const { fileUri, mimeType, type } = await openGallery(MediaTypeOptions.Videos);
    setFile({ mimeType, type, uri: fileUri });
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error picking image');
  }
};

const PostFunctions = async ({
  bodyRef,
  editorRef,
  file,
  setFile,
  setLoading,
  setToast,
  t,
  user,
}: PostFunctionsParams): Promise<void> => {
  setLoading(true);

  try {
    if (!file) {
      setToast({ message: t('toast.error.selectFile'), type: ToastTypes.Error });
      setTimeout(() => setToast(null), 2500);
      return;
    }
    if (user.id === undefined) throw new Error('User not found');

    const res = await createPost({
      body: bodyRef.current,
      fileUri: file.uri,
      mimeType: file.mimeType,
      type: file.type,
      userId: user.id,
    });

    if (res.success && res.data) {
      setFile(null);
      bodyRef.current = '';
      editorRef.current?.setContentHTML('');
      setToast({ message: t('toast.success.postCreated'), type: ToastTypes.Success });
      setTimeout(() => setToast(null), 2500);
    }
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error posting');
  } finally {
    setLoading(false);
  }
};

export { ImagePickerFunction, VideoPickerFunction, PostFunctions };
