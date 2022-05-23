import React, {useContext, useEffect, useState} from 'react';
import {get, patch, post, remove} from '../../Utils/Api/Fetch';
import {useAuth} from '../AuthProvider';
import {store} from '../../../index';
import {
  DELETE_PAIR,
  SET_PAIR,
  SET_PAIRS,
  UPDATE_PAIR,
} from '../../Redux/Pairs/actionTypes';
import type {Pair} from '../../Models/Pairs';
import {navigate} from '../../Components/Navigation/RootNavigation';
import {useAlerts} from '../AlertsProvider';

const PairsContext = React.createContext(null);

const PairsProvider = ({children}) => {
  const {token} = useAuth();
  const {setAlert} = useAlerts();
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
    } else {
      setAlert({
        message: 'Ошибка при создании пары. Проверьте корректность полей',
        level: 'error',
      });
    }
    setRequest(false);
  };

  const deletePair = async (pairId: number) => {
    setRequest(true);
    const {error} = await remove(`api/v1/pairs/${pairId}`);
    if (!error) {
      store.dispatch({type: DELETE_PAIR, payload: {pairId}});
      setAlert({message: 'Пара успешно удалена', level: 'success'});
    }
    setRequest(false);
  };

  const updatePair = async (pairId: number, pair: Pair) => {
    setRequest(true);
    const {error, json} = await patch(`api/v1/pairs/${pairId}`, pair);
    if (!error) {
      store.dispatch({type: UPDATE_PAIR, payload: {pairId, pair: json}});
      setAlert({message: 'Пара успешно обновлена', level: 'success'});
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
        deletePair,
        updatePair,
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
