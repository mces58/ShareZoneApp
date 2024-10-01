import React, { FC, useCallback, useMemo, useRef, useState } from 'react';

import { useTheme } from 'styled-components/native';

import { useI18n } from 'src/contexts';
import { scaleByAspectRatio } from 'src/utils';

import SpacemanWithMoonSvg from 'assets/svgs/spaceman-with-moon.svg';
import Icon from 'src/assets/icons';
import { GradientButton } from 'src/components/buttons';
import { Container } from 'src/components/containers';
import { BaseForm } from 'src/components/forms';
import { BaseText, GradientText } from 'src/components/texts';
import { BaseToast, ToastTypes } from 'src/components/toasts';
import { Theme } from 'src/constants/styles';
import {
  RootNavigations,
  SignupScreenNavigation,
} from 'src/navigations/RootStackParamList';

import { Header, SocialMedia } from '../components';
import { createSignupFormFields } from '../feats';
import { SignupFunction } from '../functions';
import { createSignupStyles } from '../styles';
import { SignupValidation } from '../validations';

interface SignupProps {
  navigation: SignupScreenNavigation;
}

const Signup: FC<SignupProps> = ({ navigation }) => {
  const theme = useTheme() as Theme;
  const { t } = useI18n();
  const formRef = useRef<{ reset: () => void; submit: () => void }>(null);
  const validation = useMemo(() => new SignupValidation(t), [t]);
  const formFields = useMemo(
    () => createSignupFormFields({ t, theme, validation }),
    [t, theme, validation]
  );
  const styles = useMemo(() => createSignupStyles(theme), [theme]);
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: ToastTypes } | null>(null);

  const handleSignup = useCallback(async (data: unknown): Promise<void> => {
    await SignupFunction({ data, formRef, setLoading, setToast, t });
  }, []);

  const handleFormSubmit = useCallback((): void => {
    if (formRef.current) formRef.current.submit();
  }, []);

  return (
    <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
      <Header
        title={t('global.back')}
        theme={theme}
        onPressHeaderIcon={() => navigation.goBack()}
      />
      <Container flexStyle={styles.flex.main}>
        <Container flexStyle={styles.flex.form}>
          <GradientText
            text={t('screens.auth.signUp')}
            colors={theme.common.color.defaultGradient2}
            textStyle={styles.text.formHeader}
          />
          <BaseForm
            formFields={formFields}
            onSubmit={handleSignup}
            ref={formRef}
            inputStyle={{
              flex: styles.flex.formInput,
              shadow: styles.shadow.formInput,
              view: styles.view.formInput,
            }}
          />
          {toast && (
            <BaseToast
              downHeight={-75}
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
        </Container>
        <Container flexStyle={styles.flex.footer}>
          <Container flexStyle={styles.flex.footerImage}>
            <SpacemanWithMoonSvg
              width={scaleByAspectRatio(200)}
              height={scaleByAspectRatio(200)}
            />
          </Container>
          <Container flexStyle={styles.flex.footerAction}>
            <Container flexStyle={styles.flex.footerButtonContainer}>
              <GradientButton
                text={t('screens.auth.signUp')}
                colors={theme.common.color.defaultGradient2}
                onPress={handleFormSubmit}
                loading={loading}
                disabled={loading}
                flexStyle={styles.flex.button}
                shadowStyle={styles.shadow.button}
                textStyle={styles.text.button}
                viewStyle={styles.view.button}
              />
              <Container flexStyle={styles.flex.rowText}>
                <BaseText
                  text={t('screens.auth.alreadyHaveAnAccount')}
                  textStyle={styles.text.footer}
                />
                <GradientText
                  text={t('screens.auth.signIn')}
                  colors={theme.common.color.defaultGradient2}
                  onPress={() => {
                    if (!formRef.current) return;
                    navigation.navigate(RootNavigations.SIGNIN);
                    formRef.current.reset();
                  }}
                  textStyle={styles.text.link}
                />
              </Container>
            </Container>
            <SocialMedia text={t('screens.auth.followOn')} theme={theme} />
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Signup;
