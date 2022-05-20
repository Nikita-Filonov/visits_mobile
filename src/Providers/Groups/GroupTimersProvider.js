import React, {useContext, useState} from 'react';
import {SUPPORTED_ACTIONS, useAlerts} from '../AlertsProvider';
import {useTranslation} from 'react-i18next';
import {get, patch, post, remove} from '../../utils/Api/Fetch';
import {useSelector} from 'react-redux';

const GroupTimersContext = React.createContext(null);

const GroupTimersProvider = ({children}) => {
  const {setAlert, successTemplate} = useAlerts();
  const {t} = useTranslation();
  const groupsApi = 'api/v1/groups/';
  const [events, setEvents] = useState([]);
  const [load, setLoad] = useState(true);
  const [history, setHistory] = useState([]);
  const [loadHistory, setLoadHistory] = useState(true);
  const [request, setRequest] = useState(false);

  const TIMER = t('components.alerts.instances.timer');
  const TIMERS = t('components.alerts.instances.timers');
  const groupTimersSort = useSelector(
    state => state.groupTimers.groupTimersSort,
  );

  const getEvents = async groupId => {
    setLoad(state => state);
    const url = groupsApi + `${groupId}/timers/`;
    const {error, json} = await get(
      groupTimersSort ? url + `?order=${groupTimersSort}` : url,
    );
    !error && setEvents(json);
    error && setAlert(json);
    setLoad(false);
  };

  const createEvent = async (groupId, payload) => {
    setRequest(true);
    const {error, json} = await post(groupsApi + `${groupId}/timers/`, payload);
    setAlert(
      error ? json : successTemplate(TIMER, SUPPORTED_ACTIONS.create_male),
    );
    !error && setEvents([...events, json]);
    setRequest(false);
  };

  const deleteEvent = async (groupId, eventId) => {
    const {error, json} = await remove(
      groupsApi + `${groupId}/timers/${eventId}/`,
    );
    setAlert(
      error ? json : successTemplate(TIMER, SUPPORTED_ACTIONS.delete_male),
    );
    !error && setEvents(events.filter(event => event.id !== eventId));
  };

  const updateGroupTimer = async (groupId, eventId, payload) => {
    setRequest(true);
    const {error, json} = await patch(
      groupsApi + `${groupId}/timers/${eventId}/`,
      payload,
    );
    setAlert(
      error ? json : successTemplate(TIMER, SUPPORTED_ACTIONS.update_male),
    );
    !error &&
      setEvents(events => [
        ...events.map(event => (event.id === eventId ? json : event)),
      ]);
    setRequest(false);
  };

  const importEvents = async (groupId, timers) => {
    setRequest(true);
    const {error, json} = await post(groupsApi + `${groupId}/timers/import/`, {
      timers,
      order: groupTimersSort,
    });
    setAlert(error ? json : successTemplate(TIMERS, SUPPORTED_ACTIONS.import));
    !error && setEvents(json);
    setRequest(false);
  };

  const getTimerHistory = async (groupId, timerId) => {
    setLoadHistory(true);
    const {error, json} = await get(
      groupsApi + `${groupId}/timers/history/${timerId}/`,
    );
    !error && setHistory(json);
    error && setAlert(json);
    setLoadHistory(false);
  };

  const getGroupHistory = async groupId => {
    setLoadHistory(true);
    const {error, json} = await get(groupsApi + `${groupId}/timers/history/`);
    !error && setHistory(json);
    error && setAlert(json);
    setLoadHistory(false);
  };

  const restoreTimer = async (groupId, historyId) => {
    const {error, json} = await post(
      groupsApi + `${groupId}/timers/restore/${historyId}/`,
    );
    setAlert(
      error ? json : successTemplate(TIMER, SUPPORTED_ACTIONS.restored_male),
    );
    if (error) {
      return;
    }

    const isTimerPresent = events.some(timer => timer.id === json.id);
    isTimerPresent
      ? setEvents(events => [
          ...events.map(event => (event.id === json.id ? json : event)),
        ])
      : setEvents([...events, json]);
  };

  const deleteGroupTimers = async (groupId, timersIds) => {
    const {error, json} = await remove(groupsApi + `${groupId}/timers/`, {
      timers: timersIds,
    });
    setAlert(error ? json : successTemplate(TIMERS, SUPPORTED_ACTIONS.delete));
    !error && setEvents(events.filter(timer => !timersIds.includes(timer.id)));
  };

  const updateGroupTimers = async (groupId, timers, payload) => {
    const safePayload = {timers, order: groupTimersSort, ...payload};
    const {error, json} = await patch(
      groupsApi + `${groupId}/timers/`,
      safePayload,
    );
    setAlert(error ? json : successTemplate(TIMERS, SUPPORTED_ACTIONS.update));
    !error && setEvents(json);
  };

  return (
    <GroupTimersContext.Provider
      value={{
        load,
        events,
        history,
        loadHistory,
        setLoad,
        request,
        getEvents,
        createEvent,
        deleteEvent,
        updateGroupTimer,
        importEvents,
        getTimerHistory,
        getGroupHistory,
        restoreTimer,
        deleteGroupTimers,
        updateGroupTimers,
      }}>
      {children}
    </GroupTimersContext.Provider>
  );
};

const useGroupTimers = () => {
  const event = useContext(GroupTimersContext);
  if (event == null) {
    throw new Error(
      'useGroupTimers() called outside of a GroupTimersProvider?',
    );
  }
  return event;
};

export {GroupTimersProvider, useGroupTimers};
