import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export const enum NavigationRoutes {
  ABOUT = 'About',
  HOME = 'Home',
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  [NavigationRoutes.ABOUT]: { count: number };
  [NavigationRoutes.HOME]: undefined;
};

type AboutScreenProps = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.ABOUT
>;
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, NavigationRoutes.HOME>;

export type AboutScreenNavigation = AboutScreenProps['navigation'];
export type HomeScreenNavigation = HomeScreenProps['navigation'];

export type AboutScreenRoute = AboutScreenProps['route'];
export type HomeScreenRoute = HomeScreenProps['route'];
