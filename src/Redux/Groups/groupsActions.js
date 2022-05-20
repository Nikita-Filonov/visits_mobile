import {
  SET_CREATE_MEMBER_MODAL,
  SET_CREATE_ROLE_MODAL,
  SET_DEFAULT_GROUP_MODAL,
  SET_GROUP,
  SET_GROUP_SETTINGS,
  SET_MEMBER,
  SET_ROLE,
} from './actionTypes';


export const setGroup = (state) => ({
  type: SET_GROUP,
  payload: state,
});

export const setRole = (state) => ({
  type: SET_ROLE,
  payload: state,
});

export const setCreateRoleModal = (state) => ({
  type: SET_CREATE_ROLE_MODAL,
  payload: state,
});

export const setGroupSettings = (state) => ({
  type: SET_GROUP_SETTINGS,
  payload: state,
});

export const setMember = (state) => ({
  type: SET_MEMBER,
  payload: state,
});

export const setCreateMemberModal = (state) => ({
  type: SET_CREATE_MEMBER_MODAL,
  payload: state,
});

export const setDefaultGroupModal = (state) => ({
  type: SET_DEFAULT_GROUP_MODAL,
  payload: state,
});
