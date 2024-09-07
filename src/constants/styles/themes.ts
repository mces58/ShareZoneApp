import { COLORS } from './colors';

export interface Theme {
  backgroundColor: string;
  borderColor: string;
  shadowColor: string;
  textColor: string;
}

export const enum THEMES {
  LIGHT = 'light',
  DARK = 'dark',
}

export const LightTheme: Theme = {
  backgroundColor: COLORS.GRAY._50,
  borderColor: COLORS.GRAY._500,
  shadowColor: COLORS.ZINC._800,
  textColor: COLORS.GRAY._900,
};

export const DarkTheme: Theme = {
  backgroundColor: COLORS.GRAY._900,
  borderColor: COLORS.GRAY._500,
  shadowColor: COLORS.SLATE._50,
  textColor: COLORS.GRAY._50,
};
