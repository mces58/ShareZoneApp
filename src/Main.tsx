import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import styled from 'styled-components/native';

import { StatusBar } from 'expo-status-bar';

import Button from 'src/components/Button';
import { loadFonts } from 'src/utils/load-fonts';

const Main = (): JSX.Element => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#0000ff" />
      </Container>
    );
  }

  return (
    <Container>
      <Button />
      <StatusBar style="auto" />
    </Container>
  );
};

export default Main;

const Container = styled.View({
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
});
