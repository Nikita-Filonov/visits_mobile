import ru from './ru.json';
import en from './en.json';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import {LANGUAGE_BACKUP, SUPPORTED_LOCALES} from '../Constants';
import {getDeviceLanguage} from '../Utils';

const resources = {
  en: {translation: en},
  ru: {translation: ru},
};

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    let locale = await AsyncStorage.getItem(LANGUAGE_BACKUP);

    if (!locale) {
      locale = await getDeviceLanguage();
    }

    if (!Object.keys(SUPPORTED_LOCALES).includes(locale)) {
      locale = 'ru-RU';
    }

    await AsyncStorage.setItem(LANGUAGE_BACKUP, locale);
    callback(locale);
  },
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    returnObjects: true,
    compatibilityJSON: 'v3',
  });

export default i18n;
