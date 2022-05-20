import React, {useContext, useEffect, useState} from 'react';
import {get} from '../utils/Api/Fetch';
import {useAuth} from './AuthProvider';
import {store} from '../../index';
import {SET_PAIRS} from '../Redux/Pairs/actionTypes';

const PairsContext = React.createContext(null);

const PairsProvider = ({children}) => {
  const {token} = useAuth();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    (async () => token && (await getPairs()))();
  }, [token]);

  const getPairs = async () => {
    setLoad(true);
    const {error, json} = await get('api/v1/pairs/');
    !error && store.dispatch({type: SET_PAIRS, payload: json});
    setLoad(false);
  };

  return (
    <PairsContext.Provider
      value={{
        load,
        getPairs,
      }}>
      {children}
    </PairsContext.Provider>
  );
};

const usePairs = () => {
  const event = useContext(PairsContext);
  if (event == null) {
    throw new Error('usePairs() called outside of a PairsProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return event;
};

export {PairsProvider, usePairs};
