import React from 'react';

import { useTheme } from 'styled-components/native';

import SpacemanLogo from '../../assets/spaceman.svg';
import Icon from 'src/assets/icons';
import { GradientButton } from 'src/components/buttons';
import { BaseContainer, Container } from 'src/components/containers';
import { BaseText, GradientText } from 'src/components/texts';
import { COLORS } from 'src/constants/styles/colors';
import { FONTS } from 'src/constants/styles/fonts';
import { Theme } from 'src/constants/styles/themes';
import { useI18n } from 'src/contexts/i18n-context';
import {
  NavigationRoutes,
  WelcomeScreenNavigation,
} from 'src/navigations/RootStackParamList';
import {
  scaleByAspectRatio,
  scaleFontSize,
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
        <SpacemanLogo width={scaleByAspectRatio(250)} height={scaleByAspectRatio(250)} />
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
              backgroundColor: theme.backgroundColor,
              borderRadius: scaleProportionally(10),
              borderColor: COLORS.BLUE._300,
            }}
            shadowStyle={{
              shadowColor: COLORS.BLUE._300,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 5,
              shadowOpacity: 0.3,
              elevation: 5,
            }}
          >
            <Icon
              name="react"
              color={{
                isGradient: true,
                grads: [COLORS.GREEN._400, COLORS.SKY._400, COLORS.VIOLET._500],
              }}
              size={scaleByAspectRatio(40)}
              strokeWidth={0.75}
            />
            <GradientText
              text={t('app.name') + '!'}
              colors={[COLORS.INDIGO._500, COLORS.ORANGE._400, COLORS.RED._500]}
              textStyle={{
                fontFamily: FONTS.Nunito.Bold,
                fontSize: scaleFontSize(45),
                textDecorationLine: 'underline',
                letterSpacing: scaleProportionally(3),
              }}
            />
          </Container>
          <BaseText
            text={t('app.punchline')}
            textStyle={{
              fontFamily: FONTS.Nunito.Medium,
              fontSize: scaleFontSize(20),
              textAlign: 'center',
              letterSpacing: scaleProportionally(1.5),
            }}
          />
        </Container>
        <GradientButton
          text={t('auth.welcome.getStarted')}
          colors={[COLORS.INDIGO._500, COLORS.ORANGE._400, COLORS.RED._500]}
          onPress={() => navigation.navigate(NavigationRoutes.SIGNUP)}
          flexStyle={{
            alignSelf: 'center',
            width: '80%',
            height: scaleHeight(50),
            alignItems: 'center',
            justifyContent: 'center',
          }}
          textStyle={{
            fontFamily: FONTS.Nunito.Bold,
            fontSize: scaleFontSize(18),
            letterSpacing: scaleProportionally(1.5),
            textAlign: 'center',
          }}
          viewStyle={{
            borderRadius: scaleProportionally(20),
          }}
          shadowStyle={{
            shadowColor: COLORS.RED._500,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 5,
            shadowOpacity: 0.3,
            elevation: 5,
          }}
          icon={<Icon name="arrow" direction="right" strokeWidth={1.3} />}
        />
        <Container
          flexStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleProportionally(5),
          }}
        >
          <BaseText
            text={t('auth.welcome.alreadyHaveAnAccount')}
            textStyle={{
              fontFamily: FONTS.Nunito.Bold,
              fontSize: scaleFontSize(16),
            }}
          />
          <GradientText
            text={t('auth.welcome.signIn')}
            colors={[COLORS.INDIGO._500, COLORS.ORANGE._400, COLORS.RED._500]}
            textStyle={{
              fontFamily: FONTS.Nunito.Bold,
              fontSize: scaleFontSize(16),
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
