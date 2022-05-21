import {GROUPS_INITIAL_STATE} from './initialState';
import {SET_GROUP, SET_GROUPS} from './actionTypes';

export const groupsReducer = (state = GROUPS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_GROUP:
      return {...state, group: action.payload};
    case SET_GROUPS:
      return {...state, groups: action.payload};
    default:
      return state;
  }
};
