/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ProfileStackParamList } from '../profile/ProfileStackParamList';

export const enum RootNavigations {
  HOME = 'Home',
  MAIN = 'Main',
  NOTIFICATION = 'Notification',
  POST = 'Post',
  PROFILE_STACK = 'ProfileStack',
  SIGNIN = 'Signin',
  SIGNUP = 'Signup',
  WELCOME = 'Welcome',
}

export type RootStackParamList = {
  [RootNavigations.HOME]: undefined;
  [RootNavigations.MAIN]: undefined;
  [RootNavigations.NOTIFICATION]: undefined;
  [RootNavigations.POST]: undefined;
  [RootNavigations.PROFILE_STACK]: NavigatorScreenParams<ProfileStackParamList>;
  [RootNavigations.SIGNIN]: undefined;
  [RootNavigations.SIGNUP]: undefined;
  [RootNavigations.WELCOME]: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, RootNavigations.HOME>;
type MainScreenProps = NativeStackScreenProps<RootStackParamList, RootNavigations.MAIN>;
type NotificationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RootNavigations.NOTIFICATION
>;
type PostScreenProps = NativeStackScreenProps<RootStackParamList, RootNavigations.POST>;
type SigninScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RootNavigations.SIGNIN
>;
type SignupScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RootNavigations.SIGNUP
>;
type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RootNavigations.WELCOME
>;

export type HomeScreenNavigation = HomeScreenProps['navigation'];
export type MainScreenNavigation = MainScreenProps['navigation'];
export type NotificationScreenNavigation = NotificationScreenProps['navigation'];
export type PostScreenNavigation = PostScreenProps['navigation'];
export type SigninScreenNavigation = SigninScreenProps['navigation'];
export type SignupScreenNavigation = SignupScreenProps['navigation'];
export type WelcomeScreenNavigation = WelcomeScreenProps['navigation'];

export type HomeScreenRoute = HomeScreenProps['route'];
export type MainScreenRoute = MainScreenProps['route'];
export type NotificationScreenRoute = NotificationScreenProps['route'];
export type PostScreenRoute = PostScreenProps['route'];
export type SigninScreenRoute = SigninScreenProps['route'];
export type SignupScreenRoute = SignupScreenProps['route'];
export type WelcomeScreenRoute = WelcomeScreenProps['route'];
