import { ToastType } from 'src/components/toasts/Base';
import { ImageFolderNames } from 'src/constants/types/supabase';
import { User } from 'src/constants/types/user';
import { TranslationOptions } from 'src/contexts/i18n-context';
import { ProfileEditScreenNavigation } from 'src/navigations/profile/ProfileStackParamList';
import { getImageUri } from 'src/services/image-service';
import { uploadFile } from 'src/services/upload-file-service';
import { updateUserById } from 'src/services/user-service';
import { openGallery } from 'src/utils/image-picker';

interface ImagePickerParams {
  setUserData: (user: User) => void;
  user: User;
}

interface UpdateUserParams {
  data: unknown;
  formRef: React.MutableRefObject<{ reset: () => void; submit: () => void } | null>;
  navigation: ProfileEditScreenNavigation;
  setLoading: (loading: boolean) => void;
  setToast: (toast: { message: string; type: ToastType } | null) => void;
  setUserData: (data: User) => void;
  t: (key: string, options?: TranslationOptions) => string;
  user: User | null;
}

export const ImagePickerFunction = async ({
  setUserData,
  user,
}: ImagePickerParams): Promise<void> => {
  try {
    const { fileUri, mimeType } = await openGallery();
    setUserData({ ...user, image: fileUri });

    const uploadResponse = await uploadFile({
      fileUri,
      folderName: ImageFolderNames.PROFILE,
      mimeType,
    });

    if (!uploadResponse) throw new Error('Error uploading image');
    if (user.id === undefined) throw new Error('User not found');

    const image = getImageUri(ImageFolderNames.PROFILE, uploadResponse.fileName);
    const updatedUser = { ...user, image };
    const updateResponse = await updateUserById(user.id, updatedUser);

    if (updateResponse.success && updateResponse.data) setUserData(updateResponse.data);
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log('Error picking image');
  }
};

export const UpdateUserFunction = async ({
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
        type: ToastType.Error,
      });
      return;
    }

    if (user?.id === undefined) throw new Error('User not found');

    const res = await updateUserById(user.id, newUser);
    if (res.success && res.data) {
      setUserData(res.data);
      setToast({
        message: t('toast.success.profileUpdated'),
        type: ToastType.Success,
      });
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  } catch (error: unknown) {
    if (error instanceof Error)
      setToast({
        message: t('toast.error.profileUpdated'),
        type: ToastType.Error,
      });
    else setToast({ message: t('error.default'), type: ToastType.Error });
  } finally {
    if (formRef.current) formRef.current.reset();
    setLoading(false);
  }
};
