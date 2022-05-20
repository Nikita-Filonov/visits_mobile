import {combineReducers} from 'redux';
import {groupsReducer} from './Groups/groupsReducer';
import {usersReducer} from './Users/usersReducer';
import {settingsReducer} from './Settings/settingsReducer';

export default combineReducers({
  groups: groupsReducer,
  users: usersReducer,
  settings: settingsReducer,
});
