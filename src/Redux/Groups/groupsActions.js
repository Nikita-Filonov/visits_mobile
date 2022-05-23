import {SET_GROUP} from './actionTypes';
import type {Group} from '../../Models/Group';

export const setGroup = (state: Group) => ({
  type: SET_GROUP,
  payload: state,
});
