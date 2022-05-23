import {GROUPS_INITIAL_STATE} from './initialState';
import {
  DELETE_GROUP_USER,
  SET_GROUP,
  SET_GROUP_USERS,
  SET_GROUPS,
} from './actionTypes';

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
    case DELETE_GROUP_USER: {
      const {groupUserId} = action.payload;
      return {
        ...state,
        groupUsers: state.groupUsers.filter(
          groupUser => groupUser.id !== groupUserId,
        ),
      };
    }
    default:
      return state;
  }
};
