import * as Font from 'expo-font';

import {
  NunitoBold,
  NunitoLight,
  NunitoMedium,
  NunitoRegular,
  NunitoSemiBold,
} from 'src/assets/fonts/nunito';
import {
  PoppinsBold,
  PoppinsLight,
  PoppinsMedium,
  PoppinsRegular,
  PoppinsSemiBold,
} from 'src/assets/fonts/poppins';

export const loadFonts = async (): Promise<void> => {
  try {
    await Font.loadAsync({
      'Poppins-Bold': PoppinsBold,
      'Poppins-Light': PoppinsLight,
      'Poppins-Medium': PoppinsMedium,
      'Poppins-Regular': PoppinsRegular,
      'Poppins-SemiBold': PoppinsSemiBold,
      'Nunito-Bold': NunitoBold,
      'Nunito-Light': NunitoLight,
      'Nunito-Medium': NunitoMedium,
      'Nunito-Regular': NunitoRegular,
      'Nunito-SemiBold': NunitoSemiBold,
    });
  } catch (error) {
    console.error('Error loading fonts', error);
  }
};
