import {combineReducers} from 'redux';
import {groupsReducer} from './Groups/groupsReducer';
import {usersReducer} from './Users/usersReducer';

export default combineReducers({
  groups: groupsReducer,
  users: usersReducer,
});
