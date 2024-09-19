import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import styled, { useTheme } from 'styled-components/native';

import { StatusBar } from 'expo-status-bar';

import { Theme } from './constants/styles/themes';
import { useAuth } from './contexts/auth-context';
import { MainScreenNavigation, RootNavigations } from './navigations/RootStackParamList';
import { fetchUserById } from './services/user-service';
import { supabase } from './supabase/supabase';

interface MainProps {
  navigation: MainScreenNavigation;
}

const Main: React.FC<MainProps> = ({ navigation }) => {
  const theme = useTheme() as Theme;
  const { setAuthData, setUserData } = useAuth();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setAuthData(session.user);

        const res = await fetchUserById(session.user.id);
        if (res.success && res.data) setUserData(res.data);

        const isNewUser = session.user.user_metadata.isNewUser;
        if (isNewUser) {
          setTimeout(() => {
            supabase.auth.updateUser({ data: { isNewUser: null } });
            navigation.navigate(RootNavigations.HOME);
          }, 2500);
        } else {
          navigation.navigate(RootNavigations.HOME);
        }
      } else {
        setAuthData(null);
        navigation.navigate(RootNavigations.WELCOME);
      }
    });

    return (): void => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <Container>
      <StatusBar style="auto" backgroundColor={theme.color.background} />
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
