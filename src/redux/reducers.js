import {combineReducers} from 'redux';
import {timersReducer} from './Timers/timersReducer';
import {groupsReducer} from './Groups/groupsReducer';
import {groupTimersReducer} from './GroupTimers/groupTimersReducer';
import {settingsReducer} from './Settings/settingsReducer';
import {usersReducer} from './Users/usersReducer';


export default combineReducers({
  timers: timersReducer,
  groups: groupsReducer,
  groupTimers: groupTimersReducer,
  settings: settingsReducer,
  users: usersReducer,
});
