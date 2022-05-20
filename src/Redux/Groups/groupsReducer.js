import {GROUPS_INITIAL_STATE} from './initialState';
import {
  CREATE_GROUP,
  DELETE_GROUPS,
  SET_CREATE_MEMBER_MODAL,
  SET_CREATE_ROLE_MODAL,
  SET_DEFAULT_GROUP_MODAL,
  SET_GROUP,
  SET_GROUP_MONSTERS,
  SET_GROUP_SETTINGS,
  SET_GROUPS,
  SET_MEMBER,
  SET_ROLE,
  UPDATE_GROUP,
} from './actionTypes';

export const groupsReducer = (state = GROUPS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_GROUP:
      return {...state, group: action.payload};
    case CREATE_GROUP:
      return {...state, groups: [...state.groups, action.payload]};
    case UPDATE_GROUP: {
      const {groupId, payload} = action.payload;
      return {...state, groups: state.groups.map(g => g.id === groupId ? payload : g)};
    }
    case DELETE_GROUPS: {
      const groups = state.groups.filter(g => !action.payload.includes(g.id));
      return {...state, groups};
    }
    case SET_GROUPS:
      return {...state, groups: action.payload};
    case SET_GROUP_SETTINGS:
      return {...state, groupSettings: action.payload};
    case SET_GROUP_MONSTERS: {
      return {...state, groupMonsters: action.payload};
    }
    case SET_ROLE:
      return {...state, role: action.payload};
    case SET_MEMBER:
      return {...state, member: action.payload};
    case SET_CREATE_MEMBER_MODAL:
      return {...state, createMemberModal: action.payload};
    case SET_CREATE_ROLE_MODAL:
      return {...state, createRoleModal: action.payload};
    case SET_DEFAULT_GROUP_MODAL:
      return {...state, defaultGroupModal: action.payload};
    default:
      return state;
  }
};
