/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const enum ProfileNavigations {
  PROFILE = 'Profile',
  PROFILE_EDIT = 'ProfileEdit',
}

export type ProfileStackParamList = {
  [ProfileNavigations.PROFILE]: undefined;
  [ProfileNavigations.PROFILE_EDIT]: undefined;
};

type ProfileScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  ProfileNavigations.PROFILE
>;
type ProfileEditScreenProps = NativeStackScreenProps<
  ProfileStackParamList,
  ProfileNavigations.PROFILE_EDIT
>;

export type ProfileScreenNavigation = ProfileScreenProps['navigation'];
export type ProfileEditScreenNavigation = ProfileEditScreenProps['navigation'];

export type ProfileScreenRoute = ProfileScreenProps['route'];
export type ProfileEditScreenRoute = ProfileEditScreenProps['route'];
