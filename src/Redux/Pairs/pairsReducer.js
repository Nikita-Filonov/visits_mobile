import {PAIRS_INITIAL_STATE} from './initialState';
import {SET_PAIR, SET_PAIRS} from './actionTypes';

export const pairsReducer = (state = PAIRS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PAIRS:
      return {...state, pairs: action.payload};
    case SET_PAIR:
      return {...state, pair: action.payload};
    default:
      return state;
  }
};
