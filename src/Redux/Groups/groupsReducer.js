import {GROUPS_INITIAL_STATE} from './initialState';
import {SET_GROUP, SET_GROUP_USERS, SET_GROUPS} from './actionTypes';

export const groupsReducer = (state = GROUPS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_GROUP:
      return {...state, group: action.payload};
    case SET_GROUPS: {
      if (action.payload?.id) {
        return {...state, groups: [...state.groups, action.payload]};
      }

      return {...state, groups: action.payload};
    }
    case SET_GROUP_USERS: {
      if (action.payload?.id) {
        return {...state, groupUsers: [...state.groupUsers, action.payload]};
      }

      return {...state, groupUsers: action.payload};
    }
    default:
      return state;
  }
};
