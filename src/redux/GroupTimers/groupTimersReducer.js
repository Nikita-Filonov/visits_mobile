import {GROUP_TIMERS_INITIAL_STATE} from './initialState';
import {SET_GROUP_TIMER, SET_GROUP_TIMERS_COMMENT_SHOWN, SET_GROUP_TIMERS_SORT} from './actionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import {GROUP_TIMERS_COMMENT_SHOWN_BACKUP} from '../../utils/Constants';


export const groupTimersReducer = (state = GROUP_TIMERS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_GROUP_TIMER:
      return {...state, groupTimer: action.payload};
    case SET_GROUP_TIMERS_SORT:
      return {...state, groupTimersSort: action.payload};
    case SET_GROUP_TIMERS_COMMENT_SHOWN: {
      AsyncStorage.setItem(GROUP_TIMERS_COMMENT_SHOWN_BACKUP, JSON.stringify(action.payload));
      return {...state, commentShown: action.payload};
    }
    default:
      return state;
  }
};
