import React, {useContext, useState} from 'react';
import {get, post} from '../../Utils/Api/Fetch';
import {store} from '../../../index';
import {
  SET_USER_PAIR,
  SET_USER_PAIR_VISIT,
  SET_USER_PAIRS,
  SET_VISITS,
} from '../../Redux/Pairs/actionTypes';
import {Visit} from '../../Models/Visits';

const UserPairsContext = React.createContext(null);

const UserPairsProvider = ({children}) => {
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(false);

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
    email: string,
  ): Promise<boolean> => {
    setRequest(true);
    const {error, json} = await post('api/v1/user-pairs', {pairId, email});
    !error && store.dispatch({type: SET_USER_PAIRS, payload: json});
    setRequest(false);

    return error;
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
