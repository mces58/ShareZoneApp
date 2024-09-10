import React from 'react';

import { useTheme } from 'styled-components/native';

import SpacemanWithPlanetsSvg from '../../../assets/spaceman-with-planets.svg';
import Icon from 'src/assets/icons';
import { BaseContainer, Container } from 'src/components/containers';
import BaseHeader from 'src/components/headers/Base';
import { Theme } from 'src/constants/styles/themes';
import { useI18n } from 'src/contexts/i18n-context';
import { SigninScreenNavigation } from 'src/navigations/RootStackParamList';
import {
  scaleByAspectRatio,
  scaleHeight,
  scaleProportionally,
} from 'src/utils/dimensions';

interface SigninProps {
  navigation: SigninScreenNavigation;
}

const Signin: React.FC<SigninProps> = ({ navigation }) => {
  const theme = useTheme() as Theme;
  const { t } = useI18n();
  return (
    <BaseContainer>
      <Container flexStyle={{ flex: 1 }}>
        <BaseHeader
          title={t('auth.signIn')}
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
        <SpacemanWithPlanetsSvg
          width={scaleByAspectRatio(250)}
          height={scaleByAspectRatio(250)}
        />
      </Container>
    </BaseContainer>
  );
};

export default Signin;
