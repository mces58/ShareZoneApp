import React from 'react';

import styled from 'styled-components/native';

import ScreenContainer from 'src/components/containers/ScreenContainer';
import { COLORS } from 'src/constants/styles/colors';
import { Theme } from 'src/constants/styles/themes';
import {
  AboutScreenNavigation,
  AboutScreenRoute,
  NavigationRoutes,
} from 'src/navigations/RootStackParamList';
import {
  scaleFontSize,
  scaleHeight,
  scaleProportionally,
  scaleWidth,
} from 'src/utils/dimensions';

interface AboutProps {
  navigation: AboutScreenNavigation;
  route: AboutScreenRoute;
}

const About: React.FC<AboutProps> = ({ navigation, route }) => {
  return (
    <ScreenContainer>
      <Container>
        <Title>About</Title>
        <Title>{route.params.count}</Title>
        <Touchable
          onPress={() => {
            navigation.navigate(NavigationRoutes.HOME);
          }}
        >
          <Title>Home</Title>
        </Touchable>
      </Container>
    </ScreenContainer>
  );
};

export default About;

const Container = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16,
});

const Title = styled.Text<{ theme: Theme }>(({ theme }) => ({
  fontSize: scaleFontSize(20),
  color: theme.textColor,
}));

const Touchable = styled.TouchableOpacity({
  width: scaleWidth(100),
  height: scaleHeight(40),
  backgroundColor: COLORS.BLUE._500,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: scaleProportionally(10),
});
