import AsyncStorage from '@react-native-community/async-storage';
import {
  DEFAULT_GROUP_BACKUP,
  DEFAULT_THEME_SETTINGS,
  GROUP_TIMERS_COMMENT_SHOWN_BACKUP,
  GROUP_TIMERS_SORT_BACKUP,
  THEME_BACKUP,
  TIMERS_COMMENT_SHOWN_BACKUP,
  TIMERS_SORT_BACKUP,
} from '../utils/Constants';
import {
  SET_GROUP_TIMERS_COMMENT_SHOWN,
  SET_GROUP_TIMERS_SORT,
} from './GroupTimers/actionTypes';
import {SET_TIMERS_COMMENT_SHOWN, SET_TIMERS_SORT} from './Timers/actionTypes';
import {get} from '../utils/api/Fetch';
import {SET_GROUP} from './Groups/actionTypes';
import {navigate} from '../components/Navigation/RootNavigation';
import {TIMERS_INITIAL_STATE} from './Timers/initialState';
import {GROUP_TIMERS_INITIAL_STATE} from './GroupTimers/initialState';
import {SET_THEME} from './Settings/actionTypes';

export const setupDefaultGroup = async store => {
  const defaultGroup = JSON.parse(
    await AsyncStorage.getItem(DEFAULT_GROUP_BACKUP),
  );
  if (!defaultGroup?.id) {
    return;
  }

  const {json, error} = await get('api/v1/groups/');
  if (error || json?.length === 0) {
    return;
  }

  const isGroupExists = json.some(item => defaultGroup.id === item.id);

  if (isGroupExists) {
    store.dispatch({type: SET_GROUP, payload: defaultGroup});
    setTimeout(() => navigate('Groups', {screen: 'GroupTimers'}), 1000);
  } else {
    await AsyncStorage.removeItem(DEFAULT_GROUP_BACKUP);
  }
};

export const setupReduxStore = async store => {
  const backup = await AsyncStorage.multiGet([
    GROUP_TIMERS_SORT_BACKUP,
    TIMERS_SORT_BACKUP,
    TIMERS_COMMENT_SHOWN_BACKUP,
    GROUP_TIMERS_COMMENT_SHOWN_BACKUP,
    THEME_BACKUP,
  ]);

  const groupTimersSort =
    backup[0][1] || GROUP_TIMERS_INITIAL_STATE.groupTimersSort;
  const timersSort = backup[1][1] || TIMERS_INITIAL_STATE.timersSort;
  const timersCommentShown =
    JSON.parse(backup[2][1]) || TIMERS_INITIAL_STATE.commentShown;
  const groupTimersCommentShown =
    JSON.parse(backup[3][1]) || GROUP_TIMERS_INITIAL_STATE.commentShown;
  const theme = JSON.parse(backup[4][1]) || DEFAULT_THEME_SETTINGS;

  store.dispatch({type: SET_THEME, payload: theme});
  store.dispatch({type: SET_TIMERS_SORT, payload: timersSort});
  store.dispatch({type: SET_GROUP_TIMERS_SORT, payload: groupTimersSort});
  store.dispatch({type: SET_TIMERS_COMMENT_SHOWN, payload: timersCommentShown});
  store.dispatch({
    type: SET_GROUP_TIMERS_COMMENT_SHOWN,
    payload: groupTimersCommentShown,
  });
};
