import React, {useContext, useState} from 'react';
import {get, post, remove} from '../../Utils/Api/Fetch';
import {store} from '../../../index';
import {useAlerts} from '../AlertsProvider';
import {
  DELETE_GROUP_USER,
  SET_GROUP_USERS,
} from '../../Redux/Groups/actionTypes';
import {getEmailOrUsername} from '../../Utils/Helpers/Validators';

const GroupUsersContext = React.createContext(null);

const GroupUsersProvider = ({children}) => {
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(false);
  const {setAlert} = useAlerts();

  const getGroupUsers = async (groupId: number) => {
    setLoad(true);
    const {error, json} = await get('api/v1/group-users', {groupId});
    !error && store.dispatch({type: SET_GROUP_USERS, payload: json});
    setLoad(false);
  };

  const createGroupUser = async (
    groupId: number,
    emailOrUsername: string,
  ): Promise<boolean> => {
    setRequest(true);
    const payload = await getEmailOrUsername(emailOrUsername);

    const {error, json} = await post('api/v1/group-users', {
      groupId,
      ...payload,
    });

    !error
      ? store.dispatch({type: SET_GROUP_USERS, payload: json})
      : setAlert({
          message: `Пользователь "${emailOrUsername}" не найден`,
          level: 'error',
        });
    setRequest(false);

    return error;
  };

  const deleteGroupUser = async (groupUserId: number) => {
    setRequest(true);
    const {error} = await remove(`api/v1/group-users/${groupUserId}`);
    if (!error) {
      store.dispatch({type: DELETE_GROUP_USER, payload: {groupUserId}});
      setAlert({message: 'Студент успешно удален', level: 'success'});
    }
    setRequest(false);
  };

  return (
    <GroupUsersContext.Provider
      value={{
        load,
        request,
        getGroupUsers,
        createGroupUser,
        deleteGroupUser,
      }}>
      {children}
    </GroupUsersContext.Provider>
  );
};

const useGroupUsers = () => {
  const event = useContext(GroupUsersContext);
  if (event == null) {
    throw new Error('useGroupUsers() called outside of a GroupUsersProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return event;
};

export {GroupUsersProvider, useGroupUsers};
