import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Linking } from 'react-native';

import { useTheme } from 'styled-components/native';

import { createSigninFormFields } from './feats/signin-form';
import SpacemanWithPlanetsSvg from 'assets/svgs/spaceman-with-planets.svg';
import Icon from 'src/assets/icons';
import { GradientButton } from 'src/components/buttons';
import { Container } from 'src/components/containers';
import BaseForm from 'src/components/forms/Base';
import BaseHeader from 'src/components/headers/Base';
import { BaseText, GradientText } from 'src/components/texts';
import Toast, { ToastType } from 'src/components/toasts/Base';
import { Theme } from 'src/constants/styles/themes';
import { SigninData } from 'src/constants/types/user';
import { useI18n } from 'src/contexts/i18n-context';
import {
  RootNavigations,
  SigninScreenNavigation,
} from 'src/navigations/root/RootStackParamList';
import { supabase } from 'src/supabase/supabase';
import { scaleByAspectRatio } from 'src/utils/dimensions';
import { SigninValidation } from 'src/validations/signin';

import { createSigninStyles } from '../styles';

interface SigninProps {
  navigation: SigninScreenNavigation;
}

const Signin: React.FC<SigninProps> = ({ navigation }) => {
  const theme = useTheme() as Theme;
  const { t } = useI18n();
  const formRef = useRef<{ reset: () => void; submit: () => void }>(null);
  const validation = useMemo(() => new SigninValidation(t), [t]);
  const formFields = useMemo(
    () => createSigninFormFields({ t, theme, validation }),
    [t, theme, validation]
  );
  const styles = useMemo(() => createSigninStyles(theme), [theme]);
  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const handleSignin = useCallback(async (data: unknown): Promise<void> => {
    const { email, password } = data as SigninData;
    setLoading(true);
    setToast(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);
    } catch (err: unknown) {
      if (err instanceof Error)
        setToast({
          message: t('error.auth.invalidLoginCredentials'),
          type: ToastType.Error,
        });
      else setToast({ message: t('error.default'), type: ToastType.Error });
    } finally {
      if (formRef.current) formRef.current.reset();
      setLoading(false);
    }
  }, []);

  const handleFormSubmit = useCallback((): void => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  return (
    <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
      <BaseHeader
        title={t('global.back')}
        icon={
          <Icon name="short-arrow" direction="left" onPress={() => navigation.goBack()} />
        }
        flexStyle={styles.flex.header}
        shadowStyle={styles.shadow.header}
        textStyle={styles.text.header}
        viewStyle={styles.view.header}
      />
      <Container flexStyle={styles.flex.main}>
        <Container flexStyle={styles.flex.form}>
          <GradientText
            text={t('auth.signIn')}
            colors={theme.common.color.defaultGradient2}
            textStyle={styles.text.formHeader}
          />
          <BaseForm
            formFields={formFields}
            onSubmit={handleSignin}
            ref={formRef}
            inputStyle={{
              flex: styles.flex.formInput,
              shadow: styles.shadow.formInput,
              view: styles.view.formInput,
            }}
          />
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              icon={<Icon name="error" fillColor={theme.color.text} strokeWidth={0} />}
            />
          )}
        </Container>
        <Container flexStyle={styles.flex.footer}>
          <Container flexStyle={styles.flex.footerImage}>
            <SpacemanWithPlanetsSvg
              width={scaleByAspectRatio(190)}
              height={scaleByAspectRatio(190)}
            />
          </Container>
          <Container flexStyle={styles.flex.footerAction}>
            <Container flexStyle={styles.flex.footerButtonContainer}>
              <GradientButton
                text={t('auth.signIn')}
                colors={theme.common.color.defaultGradient2}
                onPress={handleFormSubmit}
                loading={loading}
                flexStyle={styles.flex.button}
                shadowStyle={styles.shadow.button}
                textStyle={styles.text.button}
                viewStyle={styles.view.button}
              />
              <Container flexStyle={styles.flex.rowText}>
                <BaseText
                  text={t('auth.dontHaveAnAccount')}
                  textStyle={styles.text.footer}
                />
                <GradientText
                  text={t('auth.signUp')}
                  colors={theme.common.color.defaultGradient2}
                  onPress={() => {
                    if (!formRef.current) return;
                    navigation.navigate(RootNavigations.SIGNUP);
                    formRef.current.reset();
                  }}
                  textStyle={styles.text.link}
                />
              </Container>
            </Container>
            <Container flexStyle={styles.flex.follow}>
              <BaseText text={t('auth.followOn') + ':'} textStyle={styles.text.follow} />
              <Icon
                name="github"
                size={scaleByAspectRatio(18)}
                color={{ isGradient: true, grads: theme.common.color.defaultGradient1 }}
                onPress={() => Linking.openURL('https://github.com/mces58')}
              />
              <Icon
                name="instagram"
                size={scaleByAspectRatio(18)}
                color={{
                  isGradient: true,
                  grads: theme.common.color.defaultGradient1,
                }}
                onPress={() => Linking.openURL('https://www.instagram.com/mces58')}
              />
              <Icon
                name="linkedin"
                size={scaleByAspectRatio(18)}
                color={{ isGradient: true, grads: theme.common.color.defaultGradient1 }}
                onPress={() => Linking.openURL('https://www.linkedin.com/in/mces58')}
              />
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default Signin;
