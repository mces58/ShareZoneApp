import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import About from 'src/screens/About';
import Home from 'src/screens/Home';

import { NavigationRoutes, RootStackParamList } from './RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigation = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={NavigationRoutes.HOME} component={Home} />
          <Stack.Screen name={NavigationRoutes.ABOUT} component={About} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default MainNavigation;
