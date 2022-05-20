import {SET_PAIR} from './actionTypes';
import type {Pair} from '../../Models/Pairs';

export const setPair = (state: Pair) => ({
  type: SET_PAIR,
  payload: state,
});
