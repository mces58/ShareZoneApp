import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from 'src/Main';

import { Signin, Signup } from 'src/screens/auth';
import { Home } from 'src/screens/home';
import { Notification } from 'src/screens/notification';
import { Post } from 'src/screens/post';
import { Profile } from 'src/screens/profile';
import { Welcome } from 'src/screens/welcome';

import { NavigationRoutes, RootStackParamList } from './RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigation = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={NavigationRoutes.MAIN}
        >
          <Stack.Screen name={NavigationRoutes.HOME} component={Home} />
          <Stack.Screen name={NavigationRoutes.MAIN} component={Main} />
          <Stack.Screen name={NavigationRoutes.NOTIFICATION} component={Notification} />
          <Stack.Screen name={NavigationRoutes.POST} component={Post} />
          <Stack.Screen name={NavigationRoutes.PROFILE} component={Profile} />
          <Stack.Screen name={NavigationRoutes.SIGNIN} component={Signin} />
          <Stack.Screen name={NavigationRoutes.SIGNUP} component={Signup} />
          <Stack.Screen name={NavigationRoutes.WELCOME} component={Welcome} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default MainNavigation;
