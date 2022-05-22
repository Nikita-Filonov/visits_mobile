import React, {useContext, useEffect, useState} from 'react';
import {get, post} from '../../Utils/Api/Fetch';
import {useAuth} from '../AuthProvider';
import {store} from '../../../index';
import {SET_PAIR, SET_PAIRS} from '../../Redux/Pairs/actionTypes';
import type {Pair} from '../../Models/Pairs';
import {navigate} from '../../Components/Navigation/RootNavigation';

const PairsContext = React.createContext(null);

const PairsProvider = ({children}) => {
  const {token} = useAuth();
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(false);

  useEffect(() => {
    (async () => token && (await getPairs()))();
  }, [token]);

  const getPairs = async () => {
    setLoad(true);
    const {error, json} = await get('api/v1/pairs');
    !error && store.dispatch({type: SET_PAIRS, payload: json});
    setLoad(false);
  };

  const createPair = async (pair: Pair) => {
    setRequest(true);
    const {error, json} = await post('api/v1/pairs', pair);

    if (!error) {
      store.dispatch({type: SET_PAIRS, payload: json});
      store.dispatch({type: SET_PAIR, payload: json});
      navigate('ViewPair', {isCreation: true});
    }
    setRequest(false);
  };

  return (
    <PairsContext.Provider
      value={{
        load,
        request,
        getPairs,
        createPair,
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
