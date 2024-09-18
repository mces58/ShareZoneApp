import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from 'src/Main';

import ProfileStack from './profile/ProfileStack';
import { Signin, Signup } from 'src/screens/auth';
import { Home } from 'src/screens/home';
import { Notification } from 'src/screens/notification';
import { Post } from 'src/screens/post';
import { Welcome } from 'src/screens/welcome';

import { RootNavigations, RootStackParamList } from './RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={RootNavigations.MAIN}
        >
          <Stack.Screen name={RootNavigations.HOME} component={Home} />
          <Stack.Screen name={RootNavigations.MAIN} component={Main} />
          <Stack.Screen name={RootNavigations.NOTIFICATION} component={Notification} />
          <Stack.Screen name={RootNavigations.POST} component={Post} />
          <Stack.Screen name={RootNavigations.PROFILE_STACK} component={ProfileStack} />
          <Stack.Screen name={RootNavigations.SIGNIN} component={Signin} />
          <Stack.Screen name={RootNavigations.SIGNUP} component={Signup} />
          <Stack.Screen name={RootNavigations.WELCOME} component={Welcome} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default RootNavigation;
