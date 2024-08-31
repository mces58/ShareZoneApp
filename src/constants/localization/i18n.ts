import { I18n } from 'i18n-js';

import en from './en.json';
import { LANGUAGE_CODES } from './language-codes';
import { LOCAL_UNITS } from './local-units';
import tr from './tr.json';

const translations = {
  en,
  tr,
};

const i18n = new I18n(translations);

i18n.enableFallback = true;
i18n.locale = LOCAL_UNITS.languageCode ?? LANGUAGE_CODES.EN;

export default i18n;
