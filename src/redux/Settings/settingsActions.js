import {SET_COMMENT, SET_MONSTER, SET_THEME} from './actionTypes';


export const setMonster = (state) => ({
  type: SET_MONSTER,
  payload: state,
});


export const setComment = (state) => ({
  type: SET_COMMENT,
  payload: state,
});

export const setTheme = (state) => ({
  type: SET_THEME,
  payload: state,
});
