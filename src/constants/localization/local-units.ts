import { getCalendars, getLocales } from 'expo-localization';

const {
  currencyCode,
  currencySymbol,
  decimalSeparator,
  digitGroupingSeparator,
  languageCode,
  languageTag,
  measurementSystem,
  regionCode,
  temperatureUnit,
  textDirection,
} = getLocales()[0];

const { calendar, firstWeekday, timeZone, uses24hourClock } = getCalendars()[0];

export const LOCAL_UNITS = {
  currencyCode,
  currencySymbol,
  decimalSeparator,
  digitGroupingSeparator,
  languageCode,
  languageTag,
  measurementSystem,
  regionCode,
  temperatureUnit,
  textDirection,
  calendar,
  firstWeekday,
  timeZone,
  uses24hourClock,
};
