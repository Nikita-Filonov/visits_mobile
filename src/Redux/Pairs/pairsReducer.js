import {PAIRS_INITIAL_STATE} from './initialState';
import {
  DELETE_PAIR,
  DELETE_USER_PAIR,
  SET_PAIR,
  SET_PAIRS,
  SET_USER_PAIR,
  SET_USER_PAIR_VISIT,
  SET_USER_PAIRS,
  SET_USER_PAIRS_GROUP,
  SET_VISITS,
  UPDATE_PAIR,
} from './actionTypes';

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
    case SET_USER_PAIR:
      return {...state, userPair: action.payload};
    case SET_USER_PAIRS: {
      const userPairs = [...state.userPairs, ...action.payload].filter(
        (value, index, self) =>
          index === self.findIndex(userPair => userPair.id === value.id),
      );
      return {...state, userPairs};
    }
    case SET_USER_PAIR_VISIT: {
      const {userId} = action.payload;

      const userPairs = state.userPairs.map(userPair =>
        userPair.user.id === userId
          ? {...userPair, visit: action.payload}
          : userPair,
      );

      return {...state, userPairs};
    }
    case SET_VISITS:
      return {...state, visits: action.payload};
    case DELETE_PAIR: {
      const {pairId} = action.payload;
      return {...state, pairs: state.pairs.filter(pair => pair.id !== pairId)};
    }
    case UPDATE_PAIR: {
      // TODO переписать на множественное добавление
      // TODO при добавлении убирать дупликаты
      const {pairId, pair} = action.payload;
      return {
        ...state,
        pairs: state.pairs.map(p => (p.id === pairId ? pair : p)),
      };
    }
    case DELETE_USER_PAIR: {
      const {userPairId} = action.payload;
      return {
        ...state,
        userPairs: state.userPairs.filter(
          userPair => userPair.id !== userPairId,
        ),
      };
    }
    case SET_USER_PAIRS_GROUP:
      return {...state, userPairs: [...state.userPairs, ...action.payload]};
    default:
      return state;
  }
};
