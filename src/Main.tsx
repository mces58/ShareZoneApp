import React from 'react';

import styled from 'styled-components/native';

import { StatusBar } from 'expo-status-bar';

import { LANGUAGE_CODES } from './constants/localization/language-codes';
import { FONTS } from './constants/styles/fonts';
import Button from 'src/components/Button';
import { Theme } from 'src/constants/styles/themes';
import { useI18n } from 'src/contexts/i18n-context';

const Main = (): JSX.Element => {
  const { locale, setLocale, t } = useI18n();

  return (
    <Container>
      <Button
        onPress={() => {
          setLocale(locale === LANGUAGE_CODES.EN ? LANGUAGE_CODES.TR : LANGUAGE_CODES.EN);
        }}
      />
      <StatusBar style="auto" />
      <Text>{t('hello')}</Text>
    </Container>
  );
};

export default Main;

const Container = styled.View<{ theme: Theme }>(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.backgroundColor,
}));

const Text = styled.Text<{ theme: Theme }>(({ theme }) => ({
  color: theme.textColor,
  fontSize: 20,
  fontFamily: FONTS.Poppins.Light,
}));
