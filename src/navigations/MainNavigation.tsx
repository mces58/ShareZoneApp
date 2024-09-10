import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Signin from 'src/screens/auth/Signin';
import Signup from 'src/screens/auth/Signup';
import Welcome from 'src/screens/welcome/Welcome';

import { NavigationRoutes, RootStackParamList } from './RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigation = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={NavigationRoutes.WELCOME}
        >
          <Stack.Screen name={NavigationRoutes.SIGNIN} component={Signin} />
          <Stack.Screen name={NavigationRoutes.SIGNUP} component={Signup} />
          <Stack.Screen name={NavigationRoutes.WELCOME} component={Welcome} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default MainNavigation;
