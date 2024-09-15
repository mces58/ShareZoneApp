import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export const enum NavigationRoutes {
  HOME = 'Home',
  MAIN = 'Main',
  SIGNIN = 'Signin',
  SIGNUP = 'Signup',
  WELCOME = 'Welcome',
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  [NavigationRoutes.HOME]: undefined;
  [NavigationRoutes.MAIN]: undefined;
  [NavigationRoutes.SIGNIN]: undefined;
  [NavigationRoutes.SIGNUP]: undefined;
  [NavigationRoutes.WELCOME]: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, NavigationRoutes.HOME>;
type MainScreenProps = NativeStackScreenProps<RootStackParamList, NavigationRoutes.MAIN>;
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

export type HomeScreenNavigation = HomeScreenProps['navigation'];
export type MainScreenNavigation = MainScreenProps['navigation'];
export type SigninScreenNavigation = SigninScreenProps['navigation'];
export type SignupScreenNavigation = SignupScreenProps['navigation'];
export type WelcomeScreenNavigation = WelcomeScreenProps['navigation'];

export type HomeScreenRoute = HomeScreenProps['route'];
export type MainScreenRoute = MainScreenProps['route'];
export type SigninScreenRoute = SigninScreenProps['route'];
export type SignupScreenRoute = SignupScreenProps['route'];
export type WelcomeScreenRoute = WelcomeScreenProps['route'];
