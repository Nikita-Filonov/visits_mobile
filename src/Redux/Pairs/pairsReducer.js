import {PAIRS_INITIAL_STATE} from './initialState';
import {SET_PAIR} from './actionTypes';

export const pairsReducer = (state = PAIRS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PAIR:
      return {...state, character: action.payload};
    default:
      return state;
  }
};
