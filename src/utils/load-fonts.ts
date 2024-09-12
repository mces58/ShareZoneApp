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
import { FONTS } from 'src/constants/styles/fonts';

export const loadFonts = async (): Promise<void> => {
  try {
    await Font.loadAsync({
      [FONTS.Poppins.Bold]: PoppinsBold,
      [FONTS.Poppins.Light]: PoppinsLight,
      [FONTS.Poppins.Medium]: PoppinsMedium,
      [FONTS.Poppins.Regular]: PoppinsRegular,
      [FONTS.Poppins.SemiBold]: PoppinsSemiBold,
      [FONTS.Nunito.Bold]: NunitoBold,
      [FONTS.Nunito.Light]: NunitoLight,
      [FONTS.Nunito.Medium]: NunitoMedium,
      [FONTS.Nunito.Regular]: NunitoRegular,
      [FONTS.Nunito.SemiBold]: NunitoSemiBold,
    });
  } catch (error) {
    console.error('Error loading fonts', error);
  }
};
