import React from 'react';

import { useTheme } from 'styled-components/native';

import SpacemanSvg from '../../assets/spaceman.svg';
import Icon from 'src/assets/icons';
import { GradientButton } from 'src/components/buttons';
import { BaseContainer, Container } from 'src/components/containers';
import { BaseText, GradientText } from 'src/components/texts';
import { Theme } from 'src/constants/styles/themes';
import { useI18n } from 'src/contexts/i18n-context';
import {
  NavigationRoutes,
  WelcomeScreenNavigation,
} from 'src/navigations/RootStackParamList';
import {
  scaleByAspectRatio,
  scaleHeight,
  scaleProportionally,
  scaleWidth,
} from 'src/utils/dimensions';

interface WelcomeProps {
  navigation: WelcomeScreenNavigation;
}

const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  const { t } = useI18n();
  const theme = useTheme() as Theme;

  return (
    <BaseContainer>
      <Container
        flexStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <SpacemanSvg width={scaleByAspectRatio(250)} height={scaleByAspectRatio(250)} />
        <Container
          flexStyle={{ gap: scaleProportionally(15), paddingHorizontal: scaleWidth(10) }}
        >
          <Container
            flexStyle={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: scaleProportionally(5),
              borderWidth: scaleProportionally(1.5),
              paddingVertical: scaleHeight(10),
            }}
            viewStyle={{
              backgroundColor: theme.color.background,
              borderRadius: scaleProportionally(10),
              borderColor: theme.common.color.primary,
            }}
            shadowStyle={{
              shadowColor: theme.common.color.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 3,
              shadowOpacity: 0.3,
              elevation: 5,
            }}
          >
            <Icon
              name="react"
              color={{
                isGradient: true,
                grads: theme.common.color.defaultGradient1,
              }}
              size={scaleByAspectRatio(40)}
              strokeWidth={0.75}
            />
            <GradientText
              text={t('app.name') + '!'}
              colors={theme.common.color.defaultGradient2}
              textStyle={{
                fontFamily: theme.common.font.families.bold,
                fontSize: theme.common.font.sizes._48,
                textDecorationLine: 'underline',
                letterSpacing: scaleProportionally(3),
              }}
            />
          </Container>
          <BaseText
            text={t('app.punchline')}
            textStyle={{
              fontFamily: theme.common.font.families.medium,
              fontSize: theme.common.font.sizes._20,
              textAlign: 'center',
              letterSpacing: scaleProportionally(1.5),
            }}
          />
        </Container>
        <GradientButton
          text={t('auth.getStarted')}
          colors={theme.common.color.defaultGradient2}
          onPress={() => navigation.navigate(NavigationRoutes.SIGNUP)}
          flexStyle={{
            alignSelf: 'center',
            width: '80%',
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
          icon={<Icon name="arrow" direction="right" />}
        />
        <Container
          flexStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleProportionally(5),
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
    </BaseContainer>
  );
};

export default Welcome;
