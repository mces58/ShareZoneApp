import React from 'react';
import { Text } from 'react-native';

import { BaseContainer } from 'src/components/containers';
import { SigninScreenNavigation } from 'src/navigations/RootStackParamList';

interface SigninProps {
  navigation: SigninScreenNavigation;
}

const Signin: React.FC<SigninProps> = () => {
  return (
    <BaseContainer>
      <Text>Signin</Text>
    </BaseContainer>
  );
};

export default Signin;
