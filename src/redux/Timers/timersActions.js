import {SET_TIMER, SET_TIMERS_COMMENT_SHOWN, SET_TIMERS_SORT} from './actionTypes';


export const setTimer = (state) => ({
  type: SET_TIMER,
  payload: state,
});

export const setTimersSort = (state) => ({
  type: SET_TIMERS_SORT,
  payload: state,
});

export const setTimersCommentShown = (state) => ({
  type: SET_TIMERS_COMMENT_SHOWN,
  payload: state,
});
