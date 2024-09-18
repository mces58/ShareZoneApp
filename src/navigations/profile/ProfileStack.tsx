import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Profile, ProfileEdit } from 'src/screens/profile';

import { ProfileNavigations, ProfileStackParamList } from './ProfileStackParamList';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={ProfileNavigations.PROFILE}
    >
      <Stack.Screen name={ProfileNavigations.PROFILE} component={Profile} />
      <Stack.Screen name={ProfileNavigations.PROFILE_EDIT} component={ProfileEdit} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
