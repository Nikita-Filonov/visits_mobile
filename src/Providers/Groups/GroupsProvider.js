import React, {useContext, useEffect, useState} from 'react';
import {get, post} from '../../Utils/Api/Fetch';
import {store} from '../../../index';
import {SET_GROUP, SET_GROUPS} from '../../Redux/Groups/actionTypes';
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

  return (
    <GroupsContext.Provider
      value={{
        load,
        request,
        getGroups,
        createGroup,
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
