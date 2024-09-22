import React, { useCallback, useMemo, useRef, useState } from 'react';

import { useTheme } from 'styled-components/native';

import Icon from 'src/assets/icons';
import { BaseButton } from 'src/components/buttons';
import { Container, KeyboardContainer } from 'src/components/containers';
import BaseForm from 'src/components/forms/Base';
import BaseImage from 'src/components/images/Base';
import { BaseText } from 'src/components/texts';
import Toast, { ToastType } from 'src/components/toasts/Base';
import { Theme } from 'src/constants/styles/themes';
import { useAuth } from 'src/contexts/auth-context';
import { useI18n } from 'src/contexts/i18n-context';
import { ProfileEditScreenNavigation } from 'src/navigations/profile/ProfileStackParamList';
import { scaleByAspectRatio } from 'src/utils/dimensions';

import { Header } from '../components';
import { createProfileEditFormFields } from '../feats';
import { ImagePickerFunction, UpdateUserFunction } from '../functions';
import { createProfileEditStyles } from '../styles';
import { ProfileEditValidation } from '../validations';

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

  const handleImagePicker = useCallback(async (): Promise<void> => {
    if (user) {
      await ImagePickerFunction({ setUserData, user });
    }
  }, [user, setUserData]);

  const handleUpdateUser = useCallback(
    async (data: unknown): Promise<void> => {
      if (user) {
        await UpdateUserFunction({
          data,
          formRef,
          navigation,
          setLoading,
          setToast,
          setUserData,
          t,
          user,
        });
      }
    },
    [user, setUserData, t, navigation]
  );

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
              onPress={handleImagePicker}
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
