import React from 'react';
import { Alert } from 'react-native';

import { BaseButton } from 'src/components/buttons';
import { BaseContainer, Container } from 'src/components/containers';
import { BaseText } from 'src/components/texts';
import { useAuth } from 'src/contexts/auth-context';
import { supabase } from 'src/supabase/supabase';

const Home = (): JSX.Element => {
  const { setAuthData, user } = useAuth();

  console.log('user', user);

  const handleLogout = async (): Promise<void> => {
    setAuthData(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Sign out', error.message);
    }
  };

  return (
    <BaseContainer>
      <Container
        flexStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}
      >
        <BaseText text="Home" />
        <BaseButton
          text="Logout"
          onPress={handleLogout}
          flexStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
          viewStyle={{ backgroundColor: 'red', borderRadius: 20 }}
        />
      </Container>
    </BaseContainer>
  );
};

export default Home;
