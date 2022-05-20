import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SUPPORTED_ACTIONS, useAlerts} from '../AlertsProvider';
import {useAuth} from '../AuthProvider';
import {
  CREATE_GROUP,
  DELETE_GROUPS,
  SET_GROUP,
  SET_GROUPS,
  UPDATE_GROUP,
} from '../../redux/Groups/actionTypes';
import {get, patch, post, remove} from '../../utils/Api/Fetch';
import {GROUP_BACKUP} from '../../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';

const GroupsContext = React.createContext(null);

const GroupsProvider = ({children, store}) => {
  const groupsApi = 'api/v1/groups/';
  const {token} = useAuth();
  const {setAlert, successTemplate} = useAlerts();
  const {t} = useTranslation();
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(false);

  const ROLE = t('components.alerts.instances.role');
  const GROUP = t('components.alerts.instances.group');
  const MEMBER = t('components.alerts.instances.member');

  useEffect(() => {
    (async () => token && (await getGroups()))();
  }, [token]);

  const updateGroupState = (payload, groupId) => {
    store.dispatch({type: UPDATE_GROUP, payload: {groupId, payload}});
    store.dispatch({type: SET_GROUP, payload});
  };

  const getGroups = async () => {
    setLoad(true);
    const {error, json} = await get(groupsApi);
    !error && store.dispatch({type: SET_GROUPS, payload: json});
    setLoad(false);
  };

  const getGroup = async groupId => {
    setLoad(true);
    const {error, json} = await get(groupsApi + `${groupId}/`);
    !error && updateGroupState(json, groupId);
    error && setAlert(json);
    setLoad(false);
  };

  const createGroup = async payload => {
    setRequest(true);
    const {error, json} = await post(groupsApi, payload);
    !error && store.dispatch({type: CREATE_GROUP, payload: json});
    setAlert(
      error ? json : successTemplate(GROUP, SUPPORTED_ACTIONS.create_female),
    );
    setRequest(false);
  };

  const updateGroup = async (groupId, payload) => {
    setRequest(true);
    const {error, json} = await patch(groupsApi + `${groupId}/`, payload);
    setAlert(
      error ? json : successTemplate(GROUP, SUPPORTED_ACTIONS.update_female),
    );
    !error && updateGroupState(json, groupId);
    setRequest(false);
  };

  const deleteGroup = async groupId => {
    const {error, json} = await remove(groupsApi + `${groupId}/`);
    setAlert(
      error ? json : successTemplate(GROUP, SUPPORTED_ACTIONS.delete_female),
    );
    !error && store.dispatch({type: DELETE_GROUPS, payload: [groupId]});
    !error && (await AsyncStorage.removeItem(GROUP_BACKUP));
  };

  const inviteMember = async (groupId, payload) => {
    setRequest(true);
    const {error, json} = await post(
      groupsApi + `${groupId}/members/`,
      payload,
    );
    setAlert(
      error ? json : successTemplate(MEMBER, SUPPORTED_ACTIONS.invited_male),
    );
    !error && updateGroupState(json, groupId);
    setRequest(false);
  };

  const removeMember = async (groupId, memberId) => {
    const {error, json} = await remove(
      groupsApi + `${groupId}/members/${memberId}/`,
    );
    setAlert(
      error ? json : successTemplate(MEMBER, SUPPORTED_ACTIONS.delete_male),
    );
    !error && updateGroupState(json, groupId);
  };

  const updateMember = async (groupId, memberId, payload) => {
    setRequest(true);
    const {error, json} = await patch(
      groupsApi + `${groupId}/members/${memberId}/`,
      payload,
    );
    setAlert(
      error ? json : successTemplate(MEMBER, SUPPORTED_ACTIONS.update_male),
    );
    !error && updateGroupState(json, groupId);
    setRequest(false);
  };

  const mailInvitation = async (groupId, payload) => {
    setRequest(true);
    const {json} = await post(groupsApi + `${groupId}/members/mail/`, payload);
    setAlert(json);
    setRequest(false);
  };

  const createRole = async (groupId, payload) => {
    setRequest(true);
    const {error, json} = await post(groupsApi + `${groupId}/roles/`, payload);
    !error && updateGroupState(json, groupId);
    setAlert(
      error ? json : successTemplate(ROLE, SUPPORTED_ACTIONS.create_female),
    );
    setRequest(false);
  };

  const updateRole = async (groupId, roleId, payload) => {
    setRequest(true);
    const {error, json} = await patch(
      groupsApi + `${groupId}/roles/${roleId}/`,
      payload,
    );
    !error && updateGroupState(json, groupId);
    setAlert(
      error ? json : successTemplate(ROLE, SUPPORTED_ACTIONS.update_female),
    );
    setRequest(false);
  };

  const deleteRole = async (groupId, roleId) => {
    setRequest(true);
    const {error, json} = await remove(
      groupsApi + `${groupId}/roles/${roleId}/`,
    );
    !error && updateGroupState(json, groupId);
    setAlert(
      error ? json : successTemplate(ROLE, SUPPORTED_ACTIONS.delete_female),
    );
    setRequest(false);
  };

  return (
    <GroupsContext.Provider
      value={{
        load,
        request,
        getGroup,
        createGroup,
        updateGroup,
        deleteGroup,
        inviteMember,
        removeMember,
        updateMember,
        createRole,
        updateRole,
        deleteRole,
        mailInvitation,
      }}>
      {children}
    </GroupsContext.Provider>
  );
};

const useGroups = () => {
  const event = useContext(GroupsContext);
  if (event == null) {
    throw new Error('useGroups() called outside of a GroupsProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return event;
};

export {GroupsProvider, useGroups};
