import React, {useContext, useState} from 'react';
import {get, post, remove} from '../../Utils/Api/Fetch';
import {store} from '../../../index';
import {
  DELETE_USER_PAIR,
  SET_USER_PAIR,
  SET_USER_PAIR_VISIT,
  SET_USER_PAIRS,
  SET_USER_PAIRS_GROUP,
  SET_VISITS,
} from '../../Redux/Pairs/actionTypes';
import {Visit} from '../../Models/Visits';
import {useAlerts} from '../AlertsProvider';
import {getEmailOrUsername} from '../../Utils/Helpers/Validators';

const UserPairsContext = React.createContext(null);

const UserPairsProvider = ({children}) => {
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(false);
  const {setAlert} = useAlerts();

  const getUserPairs = async (pairId: number) => {
    setLoad(true);
    const {error, json} = await get('api/v1/user-pairs', {pairId});
    !error && store.dispatch({type: SET_USER_PAIRS, payload: json});
    setLoad(false);
  };

  const getUserPairForLearner = async (
    pairId: number,
    userId: number,
  ): Promise<boolean> => {
    const {error, json} = await get('api/v1/user-pairs', {pairId, userId});
    !error &&
      json[0] &&
      store.dispatch({type: SET_USER_PAIR, payload: json[0]});

    return true;
  };

  const createUserPair = async (
    pairId: number,
    emailOrUsername: string,
  ): Promise<boolean> => {
    setRequest(true);

    const payload = await getEmailOrUsername(emailOrUsername);

    const {error, json} = await post('api/v1/user-pairs', {pairId, ...payload});

    !error && store.dispatch({type: SET_USER_PAIRS, payload: json});
    setRequest(false);

    return error;
  };

  const createUserPairGroups = async (
    pairId: number,
    groups: Array<number>,
  ) => {
    setRequest(true);
    const {error, json} = await post('api/v1/user-pairs/groups', {
      pairId,
      groups,
    });
    !error && store.dispatch({type: SET_USER_PAIRS_GROUP, payload: json});
    setRequest(false);
  };

  const deleteUserPair = async (userPairId: number) => {
    setRequest(true);
    const {error} = await remove(`api/v1/user-pairs/${userPairId}`);
    if (!error) {
      store.dispatch({type: DELETE_USER_PAIR, payload: {userPairId}});
      setAlert({message: 'Студент успешно удален', level: 'success'});
    }
    setRequest(false);
  };

  const createVisit = async (payload: Visit) => {
    setRequest(true);
    const {error, json} = await post('api/v1/visits', payload);
    !error && store.dispatch({type: SET_USER_PAIR_VISIT, payload: json});
    setRequest(false);
  };

  const getVisits = async (pairId: number, userId: number) => {
    setLoad(true);
    const {error, json} = await get('api/v1/visits', {pairId, userId});
    !error && store.dispatch({type: SET_VISITS, payload: json});
    setLoad(false);
  };

  return (
    <UserPairsContext.Provider
      value={{
        load,
        request,
        getUserPairs,
        createUserPair,
        createVisit,
        getVisits,
        getUserPairForLearner,
        deleteUserPair,
        createUserPairGroups,
      }}>
      {children}
    </UserPairsContext.Provider>
  );
};

const useUserPairs = () => {
  const event = useContext(UserPairsContext);
  if (event == null) {
    throw new Error('useUserPairs() called outside of a UserPairsProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return event;
};

export {UserPairsProvider, useUserPairs};
