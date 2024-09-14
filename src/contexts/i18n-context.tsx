import React, { createContext, ReactNode, useContext, useState } from 'react';

import { TranslateOptions } from 'i18n-js';

import i18n from 'src/constants/localization/i18n';
import { LANGUAGE_CODES } from 'src/constants/localization/languages';
import { LOCAL_UNITS } from 'src/constants/localization/local-units';

export type TranslationOptions = TranslateOptions;

interface I18nContextProps {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, options?: TranslationOptions) => string;
}

const I18nContext = createContext<I18nContextProps>({
  locale: LOCAL_UNITS.languageCode ?? LANGUAGE_CODES.EN,
  setLocale: () => {
    return;
  },
  t: (key, options) => i18n.t(key, options),
});

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<string>(i18n.locale);

  const changeLocale = (newLocale: string): void => {
    i18n.locale = newLocale;
    setLocale(newLocale);
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale: changeLocale,
        t: (key: string, options?: TranslationOptions) => i18n.t(key, options),
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextProps => useContext(I18nContext);
