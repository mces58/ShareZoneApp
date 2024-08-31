import { COLORS } from './colors';

export interface Theme {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
}

export const LightTheme: Theme = {
  backgroundColor: COLORS.GRAY._50,
  borderColor: COLORS.GRAY._500,
  textColor: COLORS.GRAY._900,
};

export const DarkTheme: Theme = {
  backgroundColor: COLORS.GRAY._900,
  borderColor: COLORS.GRAY._500,
  textColor: COLORS.GRAY._50,
};
