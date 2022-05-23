import React, {useContext, useEffect, useState} from 'react';
import {get, patch, post, remove} from '../../Utils/Api/Fetch';
import {store} from '../../../index';
import {
  DELETE_GROUP,
  SET_GROUP,
  SET_GROUPS,
  UPDATE_GROUP,
} from '../../Redux/Groups/actionTypes';
import type {Group} from '../../Models/Group';
import {navigate} from '../../Components/Navigation/RootNavigation';
import {useAlerts} from '../AlertsProvider';

const GroupsContext = React.createContext(null);

const GroupsProvider = ({children}) => {
  const {setAlert} = useAlerts();
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(false);

  useEffect(() => {
    (async () => await getGroups())();
  }, []);

  const getGroups = async () => {
    setLoad(true);
    const {error, json} = await get('api/v1/groups');
    !error && store.dispatch({type: SET_GROUPS, payload: json});
    setLoad(false);
  };

  const createGroup = async (group: Group) => {
    setRequest(true);
    const {error, json} = await post('api/v1/groups', group);
    if (!error) {
      store.dispatch({type: SET_GROUPS, payload: json});
      store.dispatch({type: SET_GROUP, payload: json});
      navigate('ViewGroup', {isCreation: true});
    } else {
      setAlert({
        message: 'Ошибка при создании группы. Проверьте корректность полей',
        level: 'error',
      });
    }
    setRequest(false);
  };

  const deleteGroup = async (groupId: number) => {
    setRequest(true);
    const {error} = await remove(`api/v1/groups/${groupId}`);
    if (!error) {
      store.dispatch({type: DELETE_GROUP, payload: {groupId}});
      setAlert({message: 'Группа успешно удалена', level: 'success'});
    }
    setRequest(false);
  };

  const updateGroup = async (groupId: number, group: Group) => {
    setRequest(true);
    const {error, json} = await patch(`api/v1/groups/${groupId}`, group);
    if (!error) {
      store.dispatch({type: UPDATE_GROUP, payload: {groupId, group: json}});
      setAlert({message: 'Группа успешно обновлена', level: 'success'});
    }
    setRequest(false);
  };

  return (
    <GroupsContext.Provider
      value={{
        load,
        request,
        getGroups,
        createGroup,
        deleteGroup,
        updateGroup,
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
