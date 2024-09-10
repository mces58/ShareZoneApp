import React, { useRef } from 'react';

import { useTheme } from 'styled-components/native';

import * as Yup from 'yup';

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
import {
  scaleByAspectRatio,
  scaleHeight,
  scaleProportionally,
} from 'src/utils/dimensions';

interface SignupProps {
  navigation: SignupScreenNavigation;
}

const Signup: React.FC<SignupProps> = ({ navigation }) => {
  const theme = useTheme() as Theme;
  const { t } = useI18n();
  const formRef = useRef<{ submit: () => void }>(null);

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
      placeholder: 'Username',
      type: 'text' as const,
      icon: (
        <Icon
          name="user"
          size={scaleByAspectRatio(18)}
          color={{ mono: theme.color.textMuted }}
        />
      ),
      validation: Yup.string()
        .required(t('form.required'))
        .min(3, t('form.userNameLength', { min: 3, max: 20 }))
        .max(20, 'Kullanıcı adı en fazla 20 karakter olmalı')
        .matches(
          /^[a-zA-Z0-9_]+$/,
          t('form.userNamePattern', { pattern: 'a-z, A-Z, 0-9' })
        ),
    },
    {
      name: 'email',
      placeholder: 'Email',
      type: 'text' as const,
      icon: (
        <Icon
          name="mail"
          size={scaleByAspectRatio(18)}
          color={{ mono: theme.color.textMuted }}
        />
      ),
      validation: Yup.string().required(t('form.required')).email(t('form.invalidEmail')),
    },
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password' as const,
      icon: (
        <Icon
          name="eyes"
          size={scaleByAspectRatio(18)}
          color={{ mono: theme.color.textMuted }}
        />
      ),
      validation: Yup.string()
        .required(t('form.required'))
        .min(6, t('form.passwordLength', { min: 6, max: 20 }))
        .max(20, t('form.passwordLength', { min: 6, max: 20 }))
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
          t('form.passwordPattern')
        ),
    },
  ];

  return (
    <BaseContainer>
      <Container
        flexStyle={{
          flex: 1,
        }}
      >
        <BaseHeader
          title={t('global.back')}
          flexStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: scaleHeight(100),
            paddingVertical: scaleHeight(20),
            paddingHorizontal: scaleHeight(10),
          }}
          viewStyle={{
            borderBottomLeftRadius: scaleProportionally(20),
            borderBottomRightRadius: scaleProportionally(20),
            backgroundColor: theme.color.background,
          }}
          shadowStyle={{
            elevation: 5,
            shadowColor: theme.color.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
          }}
          textStyle={{
            fontSize: theme.common.font.sizes._24,
            fontFamily: theme.common.font.families.bold,
          }}
          icon={
            <Icon
              name="short-arrow"
              direction="left"
              onPress={() => navigation.goBack()}
            />
          }
        />
        <Container
          flexStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingVertical: scaleHeight(30),
          }}
        >
          <Container
            flexStyle={{ width: '90%', alignSelf: 'center', gap: scaleHeight(30) }}
          >
            <GradientText
              colors={theme.common.color.defaultGradient2}
              text={t('auth.signUp')}
              textStyle={{
                fontFamily: theme.common.font.families.bold,
                fontSize: theme.common.font.sizes._32,
                textAlign: 'center',
                textTransform: 'uppercase',
                textDecorationLine: 'underline',
              }}
            />
            <BaseForm fields={fields} onSubmit={handleSubmit} ref={formRef} />
          </Container>
          <Container
            flexStyle={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Container
              flexStyle={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}
            >
              <SpacemanWithMoonSvg
                width={scaleByAspectRatio(200)}
                height={scaleByAspectRatio(200)}
              />
            </Container>
            <Container
              flexStyle={{
                width: '60%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: scaleProportionally(10),
                gap: scaleProportionally(12),
              }}
            >
              <GradientButton
                text={t('auth.signUp')}
                colors={theme.common.color.defaultGradient2}
                onPress={handleFormSubmit}
                flexStyle={{
                  alignSelf: 'center',
                  width: '100%',
                  height: scaleHeight(50),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                textStyle={{
                  fontFamily: theme.common.font.families.bold,
                  fontSize: theme.common.font.sizes._18,
                  letterSpacing: scaleProportionally(1.5),
                  textAlign: 'center',
                }}
                viewStyle={{
                  borderRadius: scaleProportionally(20),
                }}
                shadowStyle={{
                  shadowColor: theme.common.color.danger,
                  shadowOffset: { width: 0, height: 3 },
                  shadowRadius: 5,
                  shadowOpacity: 0.3,
                  elevation: 5,
                }}
              />
              <Container
                flexStyle={{
                  flexDirection: 'row',
                  gap: scaleProportionally(5),
                  alignItems: 'center',
                }}
              >
                <BaseText
                  text={t('auth.alreadyHaveAnAccount')}
                  textStyle={{
                    fontFamily: theme.common.font.families.bold,
                    fontSize: theme.common.font.sizes._14,
                  }}
                />
                <GradientText
                  text={t('auth.signIn')}
                  colors={theme.common.color.defaultGradient2}
                  textStyle={{
                    fontFamily: theme.common.font.families.bold,
                    fontSize: theme.common.font.sizes._14,
                    textDecorationLine: 'underline',
                  }}
                  onPress={() => navigation.navigate(NavigationRoutes.SIGNIN)}
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
