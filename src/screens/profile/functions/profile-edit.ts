import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { MediaTypeOptions } from 'expo-image-picker';

import { TranslationOptions } from 'src/contexts';
import { getImageUri, updateUserById, uploadFile } from 'src/services';
import { openGallery } from 'src/utils';

import { ToastTypes } from 'src/components/toasts';
import { FolderNames, User } from 'src/constants/types';
import { ProfileEditScreenNavigation } from 'src/navigations/profile/ProfileStackParamList';

interface ImagePickerParams {
  setUserData: (user: User) => void;
  user: User;
}

interface UpdateUserParams {
  data: unknown;
  formRef: MutableRefObject<{ reset: () => void; submit: () => void } | null>;
  navigation: ProfileEditScreenNavigation;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setToast: Dispatch<SetStateAction<{ message: string; type: ToastTypes } | null>>;
  setUserData: (data: User) => void;
  t: (key: string, options?: TranslationOptions) => string;
  user: User | null;
}

const ImagePickerFunction = async ({
  setUserData,
  user,
}: ImagePickerParams): Promise<void> => {
  try {
    const { fileUri, mimeType } = await openGallery(MediaTypeOptions.Images);
    setUserData({ ...user, image: fileUri });

    const uploadResponse = await uploadFile({
      fileUri,
      folderName: FolderNames.PROFILE,
      mimeType,
    });

    if (!uploadResponse) throw new Error('Error uploading image');
    if (user.id === undefined) throw new Error('User not found');

    const image = getImageUri(FolderNames.PROFILE, uploadResponse.fileName);
    const updatedUser = { ...user, image };
    const updateResponse = await updateUserById(user.id, updatedUser);

    if (updateResponse.success && updateResponse.data) setUserData(updateResponse.data);
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error picking image');
  }
};

const UpdateUserFunction = async ({
  data,
  formRef,
  navigation,
  setLoading,
  setToast,
  setUserData,
  t,
  user,
}: UpdateUserParams): Promise<void> => {
  const newUser = data as User;

  setLoading(true);
  setToast(null);

  try {
    const isFormEmpty = Object.values(newUser).every(
      (value) => value === undefined || value === ''
    );
    if (isFormEmpty) {
      setToast({
        message: t('toast.error.emptyForm'),
        type: ToastTypes.Error,
      });
      return;
    }

    if (user?.id === undefined) throw new Error('User not found');

    const res = await updateUserById(user.id, newUser);
    if (res.success && res.data) {
      setUserData(res.data);
      setToast({
        message: t('toast.success.profileUpdated'),
        type: ToastTypes.Success,
      });
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      setToast({
        message: t('toast.error.profileUpdated'),
        type: ToastTypes.Error,
      });
    else setToast({ message: t('error.default'), type: ToastTypes.Error });
  } finally {
    if (formRef.current) formRef.current.reset();
    setLoading(false);
  }
};

export { ImagePickerFunction, UpdateUserFunction };
