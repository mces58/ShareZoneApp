import React, { FC, useMemo } from 'react';

import { useTheme } from 'styled-components/native';

import { useI18n } from 'src/contexts';
import { scaleByAspectRatio } from 'src/utils';

import SpacemanSvg from 'assets/svgs/spaceman.svg';
import Icon from 'src/assets/icons';
import { GradientButton } from 'src/components/buttons';
import { Container, Wrapper } from 'src/components/containers';
import { GradientText, Text } from 'src/components/texts';
import { Theme } from 'src/constants/styles';
import {
  RootNavigations,
  WelcomeScreenNavigation,
} from 'src/navigations/RootStackParamList';

import { createWelcomeStyles } from '../styles';

interface WelcomeProps {
  navigation: WelcomeScreenNavigation;
}

const Welcome: FC<WelcomeProps> = ({ navigation }) => {
  const { t } = useI18n();
  const theme = useTheme() as Theme;
  const styles = useMemo(() => createWelcomeStyles(theme), [theme]);

  return (
    <Wrapper>
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
          <Container flexStyle={styles.flex.subContainer}>
            <Text text={t('app.punchline')} textStyle={styles.text.subtitle} />
          </Container>
        </Container>
        <GradientButton
          text={t('screens.auth.getStarted')}
          colors={theme.common.color.defaultGradient2}
          onPress={() => navigation.navigate(RootNavigations.SIGNUP)}
          icon={<Icon name="arrow" direction="right" />}
          flexStyle={styles.flex.button}
          shadowStyle={styles.shadow.button}
          textStyle={styles.text.button}
          viewStyle={styles.view.button}
        />
        <Container flexStyle={styles.flex.footer}>
          <Text
            text={t('screens.auth.alreadyHaveAnAccount')}
            textStyle={styles.text.footer}
          />
          <GradientText
            text={t('screens.auth.signIn')}
            colors={theme.common.color.defaultGradient2}
            onPress={() => navigation.navigate(RootNavigations.SIGNIN)}
            textStyle={styles.text.link}
          />
        </Container>
      </Container>
    </Wrapper>
  );
};

export default Welcome;
