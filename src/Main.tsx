import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import styled, { useTheme } from 'styled-components/native';

import { StatusBar } from 'expo-status-bar';

import { Theme } from './constants/styles/themes';
import { useAuth } from './contexts/auth-context';
import { MainScreenNavigation, NavigationRoutes } from './navigations/RootStackParamList';
import { supabase } from './supabase/supabase';

interface MainProps {
  navigation: MainScreenNavigation;
}

const Main: React.FC<MainProps> = ({ navigation }) => {
  const theme = useTheme() as Theme;
  const { setAuth } = useAuth();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth(session.user);

        const isNewUser = session.user.user_metadata.isNewUser;

        if (isNewUser) {
          setTimeout(() => {
            supabase.auth.updateUser({ data: { isNewUser: null } });
            navigation.navigate(NavigationRoutes.HOME);
          }, 2500);
        } else {
          navigation.navigate(NavigationRoutes.HOME);
        }
      } else {
        setAuth(null);
        navigation.navigate(NavigationRoutes.WELCOME);
      }
    });

    return (): void => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <Container>
      <StatusBar style="auto" />
      <ActivityIndicator color={theme.color.text} size="large" />
    </Container>
  );
};

export default Main;

const Container = styled.SafeAreaView<{ theme: Theme }>(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.color.background,
}));
