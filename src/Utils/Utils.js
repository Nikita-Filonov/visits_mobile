import {NativeModules, Platform} from 'react-native';
import {LOCALE_BACKUP, STACK_OPTIONS, SUPPORTED_LOCALES} from './Constants';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

export const getDeviceLanguage = async () => {
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  return deviceLanguage.substring(0, 2);
};

export const drawerOptions = ({route}, screens: Array) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  return {...STACK_OPTIONS, swipeEnabled: !screens.includes(routeName)};
};

export const safeLocale = async () =>
  (await AsyncStorage.getItem(LOCALE_BACKUP)) || SUPPORTED_LOCALES.ru;
