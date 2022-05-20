import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {SUPPORTED_ACTIONS, useAlerts} from '../AlertsProvider';
import {
  SET_GROUP_MONSTERS,
  SET_GROUP_SETTINGS,
} from '../../redux/Groups/actionTypes';
import {useAuth} from '../AuthProvider';
import {get, patch} from '../../utils/Api/Fetch';
import {useTranslation} from 'react-i18next';

const GroupSettingsContext = React.createContext(null);

const GroupSettingsProvider = ({children, store}) => {
  const {token} = useAuth();
  const {t} = useTranslation();
  const {setAlert, successTemplate} = useAlerts();
  const groupsApi = 'api/v1/groups/';
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(false);

  const GROUP_SETTINGS = t('components.alerts.instances.groupSettings');
  const group = useSelector(state => state.groups.group);

  useEffect(() => {
    (async () => {
      if (token && group?.id) {
        await getGroupSettings(group.id);
        await getGroupMonsters(group.id);
      }
    })();
  }, [token, group?.id]);

  const getGroupSettings = async (groupId: number, isLazy: boolean = false) => {
    setLoad(prevState => prevState);
    const {json, error} = await get(groupsApi + `${groupId}/settings/`);
    !error &&
      !isLazy &&
      store.dispatch({type: SET_GROUP_SETTINGS, payload: json});
    error && !isLazy && setAlert(json);
    setLoad(false);
    return {json, error};
  };

  const updateGroupSettings = async (groupId, payload) => {
    setRequest(true);
    const {json, error} = await patch(
      groupsApi + `${groupId}/settings/`,
      payload,
    );
    !error && store.dispatch({type: SET_GROUP_SETTINGS, payload: json});
    setAlert(
      error ? json : successTemplate(GROUP_SETTINGS, SUPPORTED_ACTIONS.update),
    );
    setRequest(false);
  };

  const getGroupMonsters = async groupId => {
    const {json, error} = await get(groupsApi + `${groupId}/monsters/`);
    !error && store.dispatch({type: SET_GROUP_MONSTERS, payload: json});
    error && setAlert(json);
  };

  return (
    <GroupSettingsContext.Provider
      value={{
        load,
        request,
        getGroupSettings,
        updateGroupSettings,
      }}>
      {children}
    </GroupSettingsContext.Provider>
  );
};

const useGroupSettings = () => {
  const event = useContext(GroupSettingsContext);
  if (event == null) {
    throw new Error(
      'useGroupSettings() called outside of a GroupSettingsProvider?',
    );
  }
  return event;
};

export {GroupSettingsProvider, useGroupSettings};
