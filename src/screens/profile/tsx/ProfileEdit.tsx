import React, { FC, useCallback, useMemo, useRef, useState } from 'react';

import { useTheme } from 'styled-components/native';

import { useAuth, useI18n } from 'src/contexts';
import { scaleByAspectRatio } from 'src/utils';

import Icon from 'src/assets/icons';
import { Button } from 'src/components/buttons';
import { Container, Keyboard } from 'src/components/containers';
import { Form } from 'src/components/forms';
import { Image } from 'src/components/images';
import { Text } from 'src/components/texts';
import { Toast, ToastTypes } from 'src/components/toasts';
import { Theme } from 'src/constants/styles';
import { ProfileEditScreenNavigation } from 'src/navigations/profile/ProfileStackParamList';

import { SubHeader } from '../components';
import { createProfileEditFormFields } from '../feats';
import { ImagePickerFunction, UpdateUserFunction } from '../functions';
import { createProfileEditStyles } from '../styles';
import { ProfileEditValidation } from '../validations';

interface ProfileEditProps {
  navigation: ProfileEditScreenNavigation;
}

const ProfileEdit: FC<ProfileEditProps> = ({ navigation }) => {
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
  const [toast, setToast] = useState<{ message: string; type: ToastTypes } | null>(null);

  const handleImagePicker = useCallback(async (): Promise<void> => {
    if (user) await ImagePickerFunction({ setUserData, user });
  }, [user, setUserData]);

  const handleUpdateUser = useCallback(
    async (data: unknown): Promise<void> => {
      if (user)
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
    <Keyboard height={{ android: scaleByAspectRatio(250), ios: scaleByAspectRatio(50) }}>
      <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
        <SubHeader
          title={t('screens.profileEdit.title')}
          theme={theme}
          onPressHeaderIcon={() => navigation.goBack()}
        />
        <Image
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
          <Text
            text={t('screens.profileEdit.subTitle')}
            textStyle={styles.text.subheader}
          />
          <Form
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
              downHeight={50}
              message={toast.message}
              type={toast.type}
              icon={
                toast.type === ToastTypes.Error ? (
                  <Icon name="error" fillColor={theme.color.text} strokeWidth={0} />
                ) : (
                  <Icon name="check" fillColor={theme.color.text} strokeWidth={0} />
                )
              }
            />
          )}
          <Button
            text={t('global.save')}
            onPress={handleFormSubmit}
            loading={loading}
            disabled={loading}
            flexStyle={styles.flex.formButton}
            viewStyle={styles.view.formButton}
            shadowStyle={styles.shadow.normal}
            textStyle={styles.text.formButton}
          />
        </Container>
      </Container>
    </Keyboard>
  );
};

export default ProfileEdit;
