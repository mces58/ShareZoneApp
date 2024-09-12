import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export const enum NavigationRoutes {
  SIGNIN = 'Signin',
  SIGNUP = 'Signup',
  WELCOME = 'Welcome',
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  [NavigationRoutes.SIGNIN]: undefined;
  [NavigationRoutes.SIGNUP]: undefined;
  [NavigationRoutes.WELCOME]: undefined;
};

type SigninScreenProps = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.SIGNIN
>;
type SignupScreenProps = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.SIGNUP
>;
type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.WELCOME
>;

export type SigninScreenNavigation = SigninScreenProps['navigation'];
export type SignupScreenNavigation = SignupScreenProps['navigation'];
export type WelcomeScreenNavigation = WelcomeScreenProps['navigation'];

export type SigninScreenRoute = SigninScreenProps['route'];
export type SignupScreenRoute = SignupScreenProps['route'];
export type WelcomeScreenRoute = WelcomeScreenProps['route'];
