import AsyncStorage from '@react-native-community/async-storage';
import {DEFAULT_THEME_SETTINGS, THEME_BACKUP} from '../Utils/Constants';
import {SET_THEME} from './Settings/actionTypes';

export const setupReduxStore = async store => {
  const backup = await AsyncStorage.multiGet([THEME_BACKUP]);

  const theme = JSON.parse(backup[0][1]) || DEFAULT_THEME_SETTINGS;

  store.dispatch({type: SET_THEME, payload: theme});
};
