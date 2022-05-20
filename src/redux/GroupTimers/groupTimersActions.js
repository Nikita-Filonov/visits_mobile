import {SET_GROUP_TIMER, SET_GROUP_TIMERS_COMMENT_SHOWN, SET_GROUP_TIMERS_SORT} from './actionTypes';


export const setGroupTimer = (state) => ({
  type: SET_GROUP_TIMER,
  payload: state,
});

export const setGroupTimersSort = (state) => ({
  type: SET_GROUP_TIMERS_SORT,
  payload: state,
});

export const setGroupTimersCommentShown = (state) => ({
  type: SET_GROUP_TIMERS_COMMENT_SHOWN,
  payload: state,
});
