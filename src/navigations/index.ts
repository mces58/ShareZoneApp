/* eslint-disable @typescript-eslint/member-ordering */
import {
  ProfileEditScreenNavigation,
  ProfileEditScreenRoute,
  ProfileScreenNavigation,
  ProfileScreenRoute,
} from './profile/ProfileStackParamList';
import RootNavigation from './root/RootNavigation';
import {
  HomeScreenNavigation,
  HomeScreenRoute,
  MainScreenNavigation,
  MainScreenRoute,
  NotificationScreenNavigation,
  NotificationScreenRoute,
  PostScreenNavigation,
  PostScreenRoute,
  SigninScreenNavigation,
  SigninScreenRoute,
  SignupScreenNavigation,
  SignupScreenRoute,
  WelcomeScreenNavigation,
  WelcomeScreenRoute,
} from './root/RootStackParamList';

export { RootNavigation };

export interface NavigationProps {
  Root: {
    HOME: HomeScreenNavigation;
    MAIN: MainScreenNavigation;
    NOTIFICATION: NotificationScreenNavigation;
    POST: PostScreenNavigation;
    SIGNIN: SigninScreenNavigation;
    SIGNUP: SignupScreenNavigation;
    WELCOME: WelcomeScreenNavigation;
  };
  Profile: {
    PROFILE: ProfileScreenNavigation;
    PROFILE_EDIT: ProfileEditScreenNavigation;
  };
}

export interface RouteProps {
  Root: {
    HOME: HomeScreenRoute;
    MAIN: MainScreenRoute;
    NOTIFICATION: NotificationScreenRoute;
    POST: PostScreenRoute;
    SIGNIN: SigninScreenRoute;
    SIGNUP: SignupScreenRoute;
    WELCOME: WelcomeScreenRoute;
  };
  Profile: {
    PROFILE: ProfileScreenRoute;
    PROFILE_EDIT: ProfileEditScreenRoute;
  };
}
