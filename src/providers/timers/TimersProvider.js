import React, {useContext, useEffect, useState} from 'react';
import {useAuth} from '../AuthProvider';
import {get, patch, post, remove} from '../../utils/Api/Fetch';
import {SUPPORTED_ACTIONS, useAlerts} from '../AlertsProvider';
import {TIMERS_SORT_BACKUP} from '../../utils/Constants';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector} from 'react-redux';

const TimersContext = React.createContext(null);

const TimersProvider = ({children}) => {
  const {token} = useAuth();
  const {t} = useTranslation();
  const {setAlert, successTemplate} = useAlerts();
  const eventsApi = 'api/v1/events/';
  const [timers, setTimers] = useState([]);
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(false);

  const TIMER = t('components.alerts.instances.timer');
  const TIMERS = t('components.alerts.instances.timers');
  const timersSort = useSelector(state => state.timers.timersSort);

  useEffect(() => {
    (async () => {
      const order = await AsyncStorage.getItem(TIMERS_SORT_BACKUP);
      token && (await getTimers(order));
    })();
  }, [token]);

  const getTimers = async () => {
    const {error, json} = await get(
      timersSort ? eventsApi + `?order=${timersSort}` : eventsApi,
    );
    !error && setTimers(json);
    setLoad(false);
  };

  const createEvent = async payload => {
    setRequest(true);
    const {error, json} = await post(eventsApi, payload);
    !error && setTimers([...timers, json]);
    setAlert(
      error ? json : successTemplate(TIMER, SUPPORTED_ACTIONS.create_male),
    );
    setRequest(false);
  };

  const deleteEvent = async eventId => {
    setTimers(timers.filter(event => event.id !== eventId));
    const {error, json} = await remove(eventsApi + `${eventId}/`);
    setAlert(
      error ? json : successTemplate(TIMER, SUPPORTED_ACTIONS.delete_male),
    );
  };

  const updateEvent = async (eventId, payload) => {
    setRequest(true);
    const {error, json} = await patch(eventsApi + `${eventId}/`, payload);
    !error &&
      setTimers(events => [
        ...events.map(event => (event.id === eventId ? json : event)),
      ]);
    setAlert(
      error ? json : successTemplate(TIMER, SUPPORTED_ACTIONS.update_male),
    );
    setRequest(false);
  };

  const deleteTimers = async timersIds => {
    setTimers(timers.filter(timer => !timersIds.includes(timer.id)));
    const {error, json} = await remove(eventsApi, {timers: timersIds});
    setAlert(error ? json : successTemplate(TIMERS, SUPPORTED_ACTIONS.delete));
  };

  const updateEvents = async (timers, payload) => {
    const {error, json} = await patch(eventsApi, {
      timers,
      order: timersSort,
      ...payload,
    });
    !error && setTimers(json);
    setAlert(error ? json : successTemplate(TIMERS, SUPPORTED_ACTIONS.update));
  };

  return (
    <TimersContext.Provider
      value={{
        load,
        timers,
        request,
        getTimers,
        createEvent,
        deleteEvent,
        deleteTimers,
        updateEvent,
        updateEvents,
      }}>
      {children}
    </TimersContext.Provider>
  );
};

const useTimers = () => {
  const event = useContext(TimersContext);
  if (event == null) {
    throw new Error('useTimers() called outside of a TimersProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return event;
};

export {TimersProvider, useTimers};
