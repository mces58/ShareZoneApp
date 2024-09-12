/* eslint-disable @typescript-eslint/member-ordering */
import { scaleFontSize } from 'src/utils/dimensions';

import { COLORS } from './colors';
import { FONTS } from './fonts';

export interface Theme {
  color: {
    background: string;
    border: string;
    shadow: string;
    text: string;
    textMuted: string;
  };
  common: {
    color: {
      primary: string;
      secondary: string;
      success: string;
      danger: string;
      warning: string;
      info: string;
      light: string;
      dark: string;
      defaultGradient1: string[];
      defaultGradient2: string[];
    };
    font: {
      families: {
        bold: string;
        light: string;
        medium: string;
        regular: string;
        semiBold: string;
      };
      sizes: {
        _10: number;
        _12: number;
        _14: number;
        _16: number;
        _18: number;
        _20: number;
        _24: number;
        _32: number;
        _48: number;
      };
    };
  };
}

export const enum THEMES {
  LIGHT = 'light',
  DARK = 'dark',
}

const common = {
  color: {
    primary: COLORS.BLUE._500,
    secondary: COLORS.ORANGE._500,
    success: COLORS.GREEN._500,
    danger: COLORS.RED._500,
    warning: COLORS.YELLOW._500,
    info: COLORS.CYAN._500,
    light: COLORS.GRAY._100,
    dark: COLORS.GRAY._800,
    defaultGradient1: [COLORS.GREEN._400, COLORS.SKY._400, COLORS.VIOLET._500],
    defaultGradient2: [COLORS.INDIGO._500, COLORS.ORANGE._400, COLORS.RED._500],
  },
  font: {
    families: {
      bold: FONTS.Nunito.Bold,
      light: FONTS.Nunito.Light,
      medium: FONTS.Nunito.Medium,
      regular: FONTS.Nunito.Regular,
      semiBold: FONTS.Nunito.SemiBold,
    },
    sizes: {
      _10: scaleFontSize(10),
      _12: scaleFontSize(12),
      _14: scaleFontSize(14),
      _16: scaleFontSize(16),
      _18: scaleFontSize(18),
      _20: scaleFontSize(20),
      _24: scaleFontSize(24),
      _32: scaleFontSize(32),
      _48: scaleFontSize(48),
    },
  },
};

export const LightTheme: Theme = {
  color: {
    background: COLORS.GRAY._100,
    border: COLORS.GRAY._500,
    shadow: COLORS.ZINC._800,
    text: COLORS.GRAY._900,
    textMuted: COLORS.GRAY._500,
  },
  common: common,
};

export const DarkTheme: Theme = {
  color: {
    background: COLORS.GRAY._800,
    border: COLORS.GRAY._500,
    shadow: COLORS.SLATE._50,
    text: COLORS.GRAY._50,
    textMuted: COLORS.GRAY._300,
  },
  common: common,
};
