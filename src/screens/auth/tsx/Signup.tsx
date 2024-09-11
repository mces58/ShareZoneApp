import React, { useRef } from 'react';
import { Linking } from 'react-native';

import { useTheme } from 'styled-components/native';

import SpacemanWithMoonSvg from 'assets/svgs/spaceman-with-moon.svg';
import Icon from 'src/assets/icons';
import { GradientButton } from 'src/components/buttons';
import { BaseContainer, Container } from 'src/components/containers';
import BaseForm from 'src/components/forms/Base';
import BaseHeader from 'src/components/headers/Base';
import { BaseText, GradientText } from 'src/components/texts';
import { Theme } from 'src/constants/styles/themes';
import { SignupData } from 'src/constants/types/user';
import { useI18n } from 'src/contexts/i18n-context';
import {
  NavigationRoutes,
  SignupScreenNavigation,
} from 'src/navigations/RootStackParamList';
import { scaleByAspectRatio } from 'src/utils/dimensions';
import { SignupValidation } from 'src/validations/signup';

import { createSignupStyles } from '../styles';

interface SignupProps {
  navigation: SignupScreenNavigation;
}

const Signup: React.FC<SignupProps> = ({ navigation }) => {
  const theme = useTheme() as Theme;
  const { t } = useI18n();
  const formRef = useRef<{ submit: () => void }>(null);
  const signupValidation = new SignupValidation(t);
  const styles = createSignupStyles(theme);

  const handleSubmit = (data: unknown): void => {
    const signupData = data as SignupData;
    console.log(signupData);
  };
  const handleFormSubmit = (): void => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const fields = [
    {
      name: 'userName',
      placeholder: t('form.input.userName'),
      type: 'text' as const,
      icon: (
        <Icon
          name="user"
          size={scaleByAspectRatio(18)}
          color={{ mono: theme.color.textMuted }}
        />
      ),
      validation: signupValidation.getUserNameValidation(),
    },
    {
      name: 'email',
      placeholder: t('form.input.email'),
      type: 'text' as const,
      icon: (
        <Icon
          name="mail"
          size={scaleByAspectRatio(18)}
          color={{ mono: theme.color.textMuted }}
        />
      ),
      validation: signupValidation.getEmailValidation(),
    },
    {
      name: 'password',
      placeholder: t('form.input.password'),
      type: 'password' as const,
      icon: (
        <Icon
          name="eyes"
          size={scaleByAspectRatio(18)}
          color={{ mono: theme.color.textMuted }}
        />
      ),
      validation: signupValidation.getPasswordValidation(),
    },
  ];

  return (
    <BaseContainer>
      <Container flexStyle={styles.flex.container}>
        <BaseHeader
          title={t('global.back')}
          icon={
            <Icon
              name="short-arrow"
              direction="left"
              onPress={() => navigation.goBack()}
            />
          }
          flexStyle={styles.flex.header}
          shadowStyle={styles.shadow.header}
          textStyle={styles.text.header}
          viewStyle={styles.view.header}
        />
        <Container flexStyle={styles.flex.main}>
          <Container flexStyle={styles.flex.form}>
            <GradientText
              text={t('auth.signUp')}
              colors={theme.common.color.defaultGradient2}
              textStyle={styles.text.formHeader}
            />
            <BaseForm fields={fields} onSubmit={handleSubmit} ref={formRef} />
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
                  text={t('auth.signUp')}
                  colors={theme.common.color.defaultGradient2}
                  onPress={handleFormSubmit}
                  flexStyle={styles.flex.button}
                  shadowStyle={styles.shadow.button}
                  textStyle={styles.text.button}
                  viewStyle={styles.view.button}
                />
                <Container flexStyle={styles.flex.rowText}>
                  <BaseText
                    text={t('auth.alreadyHaveAnAccount')}
                    textStyle={styles.text.footer}
                  />
                  <GradientText
                    text={t('auth.signIn')}
                    colors={theme.common.color.defaultGradient2}
                    onPress={() => navigation.navigate(NavigationRoutes.SIGNIN)}
                    textStyle={styles.text.link}
                  />
                </Container>
              </Container>
              <Container flexStyle={styles.flex.follow}>
                <BaseText
                  text={t('auth.followOn') + ':'}
                  textStyle={styles.text.follow}
                />

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
    </BaseContainer>
  );
};

export default Signup;
