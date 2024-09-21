import React, { useCallback, useMemo, useRef, useState } from 'react';

import { useTheme } from 'styled-components/native';

import Header from './components/Header';
import { createProfileEditFormFields } from './feats/profile-edit-form';
import Icon from 'src/assets/icons';
import { BaseButton } from 'src/components/buttons';
import { Container, KeyboardContainer } from 'src/components/containers';
import BaseForm from 'src/components/forms/Base';
import BaseImage from 'src/components/images/Base';
import { BaseText } from 'src/components/texts';
import Toast, { ToastType } from 'src/components/toasts/Base';
import { Theme } from 'src/constants/styles/themes';
import { User } from 'src/constants/types/user';
import { useAuth } from 'src/contexts/auth-context';
import { useI18n } from 'src/contexts/i18n-context';
import { ProfileEditScreenNavigation } from 'src/navigations/profile/ProfileStackParamList';
import { updateUserById } from 'src/services/user-service';
import { scaleByAspectRatio } from 'src/utils/dimensions';
import { ProfileEditValidation } from 'src/validations/profile-edit';

import { createProfileEditStyles } from '../styles';

interface ProfileEditProps {
  navigation: ProfileEditScreenNavigation;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ navigation }) => {
  const { user, setUserData } = useAuth();
  const theme = useTheme() as Theme;
  const { t } = useI18n();
  const styles = useMemo(() => createProfileEditStyles(theme), [theme]);
  const formRef = useRef<{ reset: () => void; submit: () => void }>(null);
  const validation = useMemo(() => new ProfileEditValidation(t), [t]);
  const formFields = useMemo(
    () => createProfileEditFormFields({ t, theme, validation }),
    [t, theme, validation]
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const handleUpdateUser = useCallback(async (data: unknown): Promise<void> => {
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
      if (error instanceof Error) {
        setToast({
          message: t('toast.error.profileUpdated'),
          type: ToastType.Error,
        });
      } else setToast({ message: t('error.default'), type: ToastType.Error });
    } finally {
      if (formRef.current) formRef.current.reset();
      setLoading(false);
    }
  }, []);

  const handleFormSubmit = useCallback((): void => {
    if (formRef.current) {
      formRef.current.submit();
      formRef.current.reset();
    }
  }, []);

  return (
    <KeyboardContainer
      height={{ android: scaleByAspectRatio(250), ios: scaleByAspectRatio(50) }}
    >
      <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
        <Header
          title={t('profileEdit.title')}
          theme={theme}
          onPressHeaderIcon={() => navigation.goBack()}
        />
        <BaseImage
          uri={user?.image}
          icon={
            <Icon
              name="camera"
              size={scaleByAspectRatio(30)}
              color={{ mono: theme.color.background }}
              fillColor={theme.color.text}
            />
          }
          imageStyle={styles.image.avatar}
          shadowStyle={styles.shadow.small}
        />
        <Container flexStyle={styles.flex.form}>
          <BaseText text={t('profileEdit.subTitle')} textStyle={styles.text.subheader} />
          <BaseForm
            formFields={formFields}
            onSubmit={handleUpdateUser}
            ref={formRef}
            inputStyle={{
              flex: styles.flex.formInput,
              shadow: styles.shadow.small,
              view: styles.view.formInput,
            }}
          />
          {toast && (
            <Toast
              downHeight={0.25}
              message={toast.message}
              type={toast.type}
              duration={toast.type === ToastType.Error ? 2500 : 1500}
              icon={
                toast.type === ToastType.Error ? (
                  <Icon name="error" fillColor={theme.color.text} strokeWidth={0} />
                ) : (
                  <Icon name="check" fillColor={theme.color.text} strokeWidth={0} />
                )
              }
            />
          )}
          <BaseButton
            text={t('global.save')}
            onPress={handleFormSubmit}
            loading={loading}
            flexStyle={styles.flex.formButton}
            viewStyle={styles.view.formButton}
            shadowStyle={styles.shadow.normal}
            textStyle={styles.text.formButton}
          />
        </Container>
      </Container>
    </KeyboardContainer>
  );
};

export default ProfileEdit;
