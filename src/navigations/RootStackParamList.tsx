import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export const enum NavigationRoutes {
  WELCOME = 'Welcome',
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  [NavigationRoutes.WELCOME]: undefined;
};

type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.WELCOME
>;

export type WelcomeScreenNavigation = WelcomeScreenProps['navigation'];

export type WelcomeScreenRoute = WelcomeScreenProps['route'];
