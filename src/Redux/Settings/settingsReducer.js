import {SETTINGS_INITIAL_STATE} from './initialState';
import {SET_COMMENT, SET_MONSTER, SET_THEME} from './actionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import {THEME_BACKUP} from '../../utils/Constants';


export const settingsReducer = (state = SETTINGS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MONSTER:
      return {...state, monster: action.payload};
    case SET_COMMENT:
      return {...state, comment: action.payload};
    case SET_THEME: {
      AsyncStorage.setItem(THEME_BACKUP, JSON.stringify(action.payload));
      return {...state, theme: action.payload};
    }
    default:
      return state;
  }
};
