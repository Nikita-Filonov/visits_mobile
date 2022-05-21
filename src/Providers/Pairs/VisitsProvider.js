import React, {useContext, useState} from 'react';
import {post} from '../../utils/Api/Fetch';
import {store} from '../../../index';
import {SET_USER_PAIR_VISIT} from '../../Redux/Pairs/actionTypes';
import {Visit} from '../../Models/Visits';

const VisitsContext = React.createContext(null);

const VisitsProvider = ({children}) => {
  const [request, setRequest] = useState(false);

  const createVisit = async (payload: Visit) => {
    console.log(JSON.stringify(payload));
    setRequest(true);
    const {error, json} = await post('api/v1/visits', payload);
    !error && store.dispatch({type: SET_USER_PAIR_VISIT, payload: json});
    setRequest(false);
  };

  return (
    <VisitsContext.Provider value={{request, createVisit}}>
      {children}
    </VisitsContext.Provider>
  );
};

const useVisits = () => {
  const event = useContext(VisitsContext);
  if (event == null) {
    throw new Error('useVisits() called outside of a VisitsProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return event;
};

export {VisitsProvider, useVisits};
