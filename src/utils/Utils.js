import moment from 'moment';
import {useEffect, useMemo, useState} from 'react';
import Sound from 'react-native-sound';
import {NativeModules, Platform} from 'react-native';
import {LOCALE_BACKUP, STACK_OPTIONS, SUPPORTED_LOCALES} from './Constants';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';


export const SetAudio = (url, volume) => {
  const audio = useMemo(() => new Sound(url), [url]);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      audio.volume = volume;
      audio.muted = false;
      playing ? play() : pause();
    },
    [playing],
  );

  const play = () => {
    audio.play();
    setTimeout(() => setPlaying(false), audio.getDuration() * 1000);
  };

  const pause = () => {
    audio.pause();
    setPlaying(false);
  };


  return [playing, toggle];
};

export function convertTime(min) {
  const h = min / 60 | 0,
    m = min % 60 | 0;
  return `${(h < 10) ? '0' + h : h}:${(m < 10) ? '0' + m : m}`;
}

export const dropTime = () => moment(Date.now()).tz('Europe/Moscow').format('YYYY-MM-DDTHH:mm:ss');

export const serverTime = (datetime) => datetime
  ? moment(datetime).tz('Europe/Moscow').format()
  : null;

export function randomColor() {
  const colors = [
    '#FCB500',
    '#DC6D02',
    '#FD9A7E',
    '#FF6262',
    '#9CCC65',
    '#8AB6D6',
    '#2978B5',
    '#F8A488',
    '#5AA897',
    '#FF8882',
    '#FFC2B4',
    '#98DDCA',
    '#F05945',
    '#E9896A',
    '#F5C0C0',
    '#78C4D4',
    '#FFD384',
    '#E97878',
    '#D3E0DC',
    '#A7C5EB',
    '#FFA45B',
    '#9AD3BC',
    '#F4ABC4',
    '#519872',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}


export const validateNotify = (value) => {
  const re = /^[1-9]|[1-9][0-9]/;
  return re.test(String(value).toLowerCase());
};

export const validateInterval = (interval) => {
  // allow minimum 15 minutes
  if (parseInterval(interval) < 15) {
    return false;
  }

  const re = /\d\d:\d\d/;
  return re.test(String(interval).toLowerCase());
};

export const parseInterval = (interval) => {
  const [hours, minutes] = interval.split(':');
  return hours * 60 + parseInt(minutes);
};

export const validateVkId = (value) => {
  const re = /^[0-9]+$/;
  return re.test(String(value).toLowerCase());
};

export const validateDiscordWebhook = (value) => {
  if (!value) {
    return false;
  }

  return !value.startsWith('https://discord.com/api/webhooks');
};
export const validateTelegramUsername = (username) => username.startsWith('@') && username?.length > 5;

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const getDeviceLanguage = async () => {
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  return deviceLanguage.substring(0, 2);
};


export const isDateTimeValid = (datetime, format = 'DD/MM/YYYY HH:mm:ss') => moment(datetime, format, true).isValid();


export const drawerOptions = ({route}, screens: Array) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  return {...STACK_OPTIONS, swipeEnabled: !screens.includes(routeName)};
};

export const normalizeNotify = (value) => parseInt(value) || 1;
export const fromNow = (datetime) => moment.utc(datetime).local().startOf('seconds').fromNow();

export const safeLocale = async () => await AsyncStorage.getItem(LOCALE_BACKUP) || SUPPORTED_LOCALES.ru;
