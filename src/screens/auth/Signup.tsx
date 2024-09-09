import React from 'react';
import { Text } from 'react-native';

import { BaseContainer } from 'src/components/containers';
import { SignupScreenNavigation } from 'src/navigations/RootStackParamList';

interface SignupProps {
  navigation: SignupScreenNavigation;
}

const Signup: React.FC<SignupProps> = () => {
  return (
    <BaseContainer>
      <Text>Signup</Text>
    </BaseContainer>
  );
};

export default Signup;
