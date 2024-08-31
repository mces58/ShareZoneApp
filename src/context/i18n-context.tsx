import React, { createContext, ReactNode, useContext, useState } from 'react';

import i18n from 'src/constants/localization/i18n';
import { LANGUAGE_CODES } from 'src/constants/localization/language-codes';
import { LOCAL_UNITS } from 'src/constants/localization/local-units';

interface I18nContextProps {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextProps>({
  locale: LOCAL_UNITS.languageCode ?? LANGUAGE_CODES.EN,
  setLocale: () => {
    return;
  },
  t: (key) => i18n.t(key),
});

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<string>(i18n.locale);

  const changeLocale = (newLocale: string): void => {
    i18n.locale = newLocale;
    setLocale(newLocale);
  };

  return (
    <I18nContext.Provider
      value={{ locale, setLocale: changeLocale, t: (key: string) => i18n.t(key) }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextProps => useContext(I18nContext);
