import {SET_PAIR, SET_USER_PAIR} from './actionTypes';
import type {Pair} from '../../Models/Pairs';

export const setPair = (state: Pair) => ({
  type: SET_PAIR,
  payload: state,
});

export const setUserPair = state => ({
  type: SET_USER_PAIR,
  payload: state,
});
