import React from 'react';

import styled from 'styled-components/native';

import ScreenContainer from 'src/components/containers/ScreenContainer';
import {
  AboutScreenNavigation,
  AboutScreenRoute,
  NavigationRoutes,
} from 'src/navigations/RootStackParamList';

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
        <Touchable onPress={() => navigation.navigate(NavigationRoutes.HOME)}>
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
});

const Title = styled.Text({
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 16,
});

const Touchable = styled.TouchableOpacity({
  backgroundColor: '#666',
  padding: 16,
  borderRadius: 8,
});
