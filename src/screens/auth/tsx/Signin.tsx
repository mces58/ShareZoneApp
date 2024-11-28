import React, { FC, useCallback, useMemo, useRef, useState } from 'react';

import { useTheme } from 'styled-components/native';

import { useI18n } from 'src/contexts';
import { scaleByAspectRatio } from 'src/utils';

import SpacemanWithPlanetsSvg from 'assets/svgs/spaceman-with-planets.svg';
import Icon from 'src/assets/icons';
import { GradientButton } from 'src/components/buttons';
import { Container, Scroll } from 'src/components/containers';
import { Form } from 'src/components/forms';
import { GradientText, Text } from 'src/components/texts';
import { Toast, ToastTypes } from 'src/components/toasts';
import { Theme } from 'src/constants/styles';
import {
  RootNavigations,
  SigninScreenNavigation,
} from 'src/navigations/RootStackParamList';

import { SocialMedia, SubHeader } from '../components';
import { createSigninFormFields } from '../feats';
import { SigninFunction } from '../functions';
import { createSigninStyles } from '../styles';
import { SigninValidation } from '../validations';

interface SigninProps {
  navigation: SigninScreenNavigation;
}

const Signin: FC<SigninProps> = ({ navigation }) => {
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
  const [toast, setToast] = useState<{ message: string; type: ToastTypes } | null>(null);

  const handleSignin = useCallback(async (data: unknown): Promise<void> => {
    await SigninFunction({ data, formRef, setLoading, setToast, t });
  }, []);

  const handleFormSubmit = useCallback((): void => {
    if (formRef.current) formRef.current.submit();
  }, []);

  return (
    <Scroll>
      <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
        <SubHeader
          title={t('global.back')}
          theme={theme}
          onPressHeaderIcon={() => navigation.goBack()}
        />
        <Container flexStyle={styles.flex.main}>
          <Container flexStyle={styles.flex.form}>
            <GradientText
              text={t('screens.auth.signIn')}
              colors={theme.common.color.defaultGradient2}
              textStyle={styles.text.formHeader}
            />
            <Form
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
                downHeight={-75}
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
                  text={t('screens.auth.signIn')}
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
                  <Text
                    text={t('screens.auth.dontHaveAnAccount')}
                    textStyle={styles.text.footer}
                  />
                  <GradientText
                    text={t('screens.auth.signUp')}
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
              <SocialMedia text={t('screens.auth.followOn')} theme={theme} />
            </Container>
          </Container>
        </Container>
      </Container>
    </Scroll>
  );
};

export default Signin;
