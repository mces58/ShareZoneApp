import React, { useMemo } from 'react';

import { useTheme } from 'styled-components/native';

import { useI18n } from 'src/contexts';
import { scaleByAspectRatio } from 'src/utils';

import SpacemanSvg from 'assets/svgs/spaceman.svg';
import Icon from 'src/assets/icons';
import { GradientButton } from 'src/components/buttons';
import { BaseContainer, Container } from 'src/components/containers';
import { BaseText, GradientText } from 'src/components/texts';
import { Theme } from 'src/constants/styles';
import {
  RootNavigations,
  WelcomeScreenNavigation,
} from 'src/navigations/RootStackParamList';

import { createWelcomeStyles } from '../styles';

interface WelcomeProps {
  navigation: WelcomeScreenNavigation;
}

const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  const { t } = useI18n();
  const theme = useTheme() as Theme;
  const styles = useMemo(() => createWelcomeStyles(theme), [theme]);

  return (
    <BaseContainer>
      <Container flexStyle={styles.flex.container}>
        <SpacemanSvg width={scaleByAspectRatio(250)} height={scaleByAspectRatio(250)} />
        <Container flexStyle={styles.flex.header}>
          <Container
            flexStyle={styles.flex.app}
            shadowStyle={styles.shadow.app}
            viewStyle={styles.view.app}
          >
            <Icon
              name="react"
              color={{
                isGradient: true,
                grads: theme.common.color.defaultGradient1,
              }}
              size={scaleByAspectRatio(40)}
              animated={{ rotate: true, scale: true }}
              strokeWidth={0.75}
            />
            <GradientText
              text={t('app.name') + '!'}
              colors={theme.common.color.defaultGradient2}
              textStyle={styles.text.title}
            />
          </Container>
          <BaseText text={t('app.punchline')} textStyle={styles.text.subtitle} />
        </Container>
        <GradientButton
          text={t('auth.getStarted')}
          colors={theme.common.color.defaultGradient2}
          onPress={() => navigation.navigate(RootNavigations.SIGNUP)}
          icon={<Icon name="arrow" direction="right" />}
          flexStyle={styles.flex.button}
          shadowStyle={styles.shadow.button}
          textStyle={styles.text.button}
          viewStyle={styles.view.button}
        />
        <Container flexStyle={styles.flex.footer}>
          <BaseText
            text={t('auth.alreadyHaveAnAccount')}
            textStyle={styles.text.footer}
          />
          <GradientText
            text={t('auth.signIn')}
            colors={theme.common.color.defaultGradient2}
            onPress={() => navigation.navigate(RootNavigations.SIGNIN)}
            textStyle={styles.text.link}
          />
        </Container>
      </Container>
    </BaseContainer>
  );
};

export default Welcome;
