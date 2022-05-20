import {combineReducers} from 'redux';
import {groupsReducer} from './Groups/groupsReducer';
import {usersReducer} from './Users/usersReducer';
import {settingsReducer} from './Settings/settingsReducer';
import {pairsReducer} from './Pairs/pairsReducer';

export default combineReducers({
  groups: groupsReducer,
  users: usersReducer,
  settings: settingsReducer,
  pairs: pairsReducer,
});
