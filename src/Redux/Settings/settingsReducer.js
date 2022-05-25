import {SETTINGS_INITIAL_STATE} from './initialState';
import {SET_THEME} from './actionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import {THEME_BACKUP} from '../../Utils/Constants';

export const settingsReducer = (state = SETTINGS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_THEME: {
      AsyncStorage.setItem(THEME_BACKUP, JSON.stringify(action.payload));
      return {...state, theme: action.payload};
    }
    default:
      return state;
  }
};
