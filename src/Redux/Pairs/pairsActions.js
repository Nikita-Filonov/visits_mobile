import {SET_PAIR, SET_USER_PAIR} from './actionTypes';
import type {Pair} from '../../Models/Pairs';
import type {UserPair} from '../../Models/UserPair';

export const setPair = (state: Pair) => ({
  type: SET_PAIR,
  payload: state,
});

export const setUserPair = (state: UserPair) => ({
  type: SET_USER_PAIR,
  payload: state,
});
