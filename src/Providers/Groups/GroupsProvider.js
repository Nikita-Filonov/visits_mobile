import React, {useContext, useEffect, useState} from 'react';
import {get} from '../../utils/Api/Fetch';
import {store} from '../../../index';
import {SET_GROUPS} from '../../Redux/Groups/actionTypes';

const GroupsContext = React.createContext(null);

const GroupsProvider = ({children}) => {
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

  return (
    <GroupsContext.Provider
      value={{
        load,
        request,
        getGroups,
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
