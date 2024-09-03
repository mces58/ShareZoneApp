import React, { useState } from 'react';

import styled from 'styled-components/native';

import ScreenContainer from 'src/components/containers/ScreenContainer';
import { COLORS } from 'src/constants/styles/colors';
import { Theme } from 'src/constants/styles/themes';
import {
  HomeScreenNavigation,
  NavigationRoutes,
} from 'src/navigations/RootStackParamList';
import {
  scaleFontSize,
  scaleHeight,
  scaleProportionally,
  scaleWidth,
} from 'src/utils/dimensions';

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
        <Touchable
          onPress={() => {
            navigation.navigate(NavigationRoutes.ABOUT, { count });
          }}
        >
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
