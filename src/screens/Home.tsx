import React, { useState } from 'react';

import styled from 'styled-components/native';

import ScreenContainer from 'src/components/containers/ScreenContainer';
import {
  HomeScreenNavigation,
  NavigationRoutes,
} from 'src/navigations/RootStackParamList';

interface HomeProps {
  navigation: HomeScreenNavigation;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [count, setCount] = useState<number>(0);

  return (
    <ScreenContainer>
      <Container>
        <Title>Home</Title>
        <Title>{count}</Title>
        <Touchable onPress={() => setCount(count + 1)}>
          <Title>Increment</Title>
        </Touchable>
        <Touchable onPress={() => navigation.navigate(NavigationRoutes.ABOUT, { count })}>
          <Title>About</Title>
        </Touchable>
      </Container>
    </ScreenContainer>
  );
};

export default Home;

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
