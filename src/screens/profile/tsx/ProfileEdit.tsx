import React, { useCallback, useMemo, useRef } from 'react';

import { useTheme } from 'styled-components/native';

import { createProfileEditFormFields } from './feats/profile-edit-form';
import Icon from 'src/assets/icons';
import { BaseButton } from 'src/components/buttons';
import { Container, KeyboardContainer } from 'src/components/containers';
import BaseForm from 'src/components/forms/Base';
import BaseHeader from 'src/components/headers/Base';
import BaseImage from 'src/components/images/Base';
import { BaseText } from 'src/components/texts';
import { Theme } from 'src/constants/styles/themes';
import { useAuth } from 'src/contexts/auth-context';
import { useI18n } from 'src/contexts/i18n-context';
import { ProfileEditScreenNavigation } from 'src/navigations/profile/ProfileStackParamList';
import { scaleByAspectRatio } from 'src/utils/dimensions';
import { ProfileEditValidation } from 'src/validations/profile-edit';

import { createProfileEditStyles } from '../styles';

interface ProfileEditProps {
  navigation: ProfileEditScreenNavigation;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ navigation }) => {
  const { user } = useAuth();
  const theme = useTheme() as Theme;
  const { t } = useI18n();
  const styles = useMemo(() => createProfileEditStyles(theme), [theme]);
  const formRef = useRef<{ reset: () => void; submit: () => void }>(null);
  const validation = useMemo(() => new ProfileEditValidation(t), [t]);
  const formFields = useMemo(
    () => createProfileEditFormFields({ t, theme, validation }),
    [t, theme, validation]
  );

  const onSubmit = useCallback((data: unknown): void => {
    console.log(data);
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
        <BaseHeader
          title={t('profileEdit.title')}
          icon={
            <Icon
              name="short-arrow"
              direction="left"
              size={scaleByAspectRatio(26)}
              onPress={() => navigation.goBack()}
            />
          }
          flexStyle={styles.flex.header}
          viewStyle={styles.view.header}
          shadowStyle={styles.shadow.normal}
          textStyle={styles.text.header}
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
            onSubmit={onSubmit}
            ref={formRef}
            inputStyle={{
              flex: styles.flex.formInput,
              shadow: styles.shadow.small,
              view: styles.view.formInput,
            }}
          />
          <BaseButton
            text={t('global.save')}
            onPress={handleFormSubmit}
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
