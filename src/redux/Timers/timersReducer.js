import {SET_TIMER, SET_TIMERS_COMMENT_SHOWN, SET_TIMERS_SORT} from './actionTypes';
import {TIMERS_INITIAL_STATE} from './initialState';
import AsyncStorage from '@react-native-community/async-storage';
import {TIMERS_COMMENT_SHOWN_BACKUP} from '../../utils/Constants';

export const timersReducer = (state = TIMERS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TIMER:
      return {...state, timer: action.payload};
    case SET_TIMERS_SORT:
      return {...state, timersSort: action.payload};
    case SET_TIMERS_COMMENT_SHOWN: {
      AsyncStorage.setItem(TIMERS_COMMENT_SHOWN_BACKUP, JSON.stringify(action.payload));
      return {...state, commentShown: action.payload};
    }
    default:
      return state;
  }
};
