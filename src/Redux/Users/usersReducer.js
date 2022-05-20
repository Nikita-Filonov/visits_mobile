import {SET_USER} from './actionTypes';
import {USERS_INITIAL_STATE} from './initialState';

export const usersReducer = (state = USERS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.payload};
    default:
      return state;
  }
};
