import React, {useContext, useState} from 'react';
import {get} from '../../utils/Api/Fetch';
import {store} from '../../../index';
import {SET_USER_PAIRS} from '../../Redux/Pairs/actionTypes';

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

  return (
    <UserPairsContext.Provider
      value={{
        load,
        request,
        getUserPairs,
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
