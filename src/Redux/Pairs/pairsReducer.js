import {PAIRS_INITIAL_STATE} from './initialState';
import {SET_PAIR, SET_PAIRS, SET_USER_PAIRS} from './actionTypes';

export const pairsReducer = (state = PAIRS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PAIRS: {
      if (action.payload?.id) {
        return {...state, pairs: [...state.pairs, action.payload]};
      }
      return {...state, pairs: action.payload};
    }
    case SET_PAIR:
      return {...state, pair: action.payload};
    case SET_USER_PAIRS: {
      if (action.payload?.id) {
        return {...state, userPairs: [...state.userPairs, action.payload]};
      }

      return {...state, userPairs: action.payload};
    }
    default:
      return state;
  }
};
