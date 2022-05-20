import React, {useContext, useState} from 'react';
import {SUPPORTED_ACTIONS, useAlerts} from './AlertsProvider';
import {useTranslation} from 'react-i18next';
import {get, remove} from '../utils/Api/Fetch';

const NotificationsContext = React.createContext(null);

const NotificationsProvider = ({children}) => {
  const {setAlert, successTemplate} = useAlerts();
  const {t} = useTranslation();
  const notificationsApi = 'api/v1/notifications/';
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [load, setLoad] = useState(true);

  const NOTIFICATION = t('components.alerts.instances.notification');
  const NOTIFICATIONS = t('components.alerts.instances.notifications');

  const getNotifications = async () => {
    setLoad(true);
    const {error, json} = await get(notificationsApi);
    !error && setNotifications(json);
    setUnread(0);
    setLoad(false);
  };

  const getNotificationsUnread = async () => {
    const {error, json} = await get(notificationsApi + 'unread/');
    !error && setUnread(json.count);
    setLoad(false);
  };

  const clearNotifications = async () => {
    setAlert(successTemplate(NOTIFICATIONS, SUPPORTED_ACTIONS.delete));
    setNotifications([]);
    setUnread(0);
    await remove(notificationsApi);
  };

  const deleteNotification = async notificationId => {
    const {error, json} = await remove(notificationsApi + `${notificationId}/`);
    setAlert(
      error ? json : successTemplate(NOTIFICATION, SUPPORTED_ACTIONS.delete_it),
    );
    !error &&
      setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  return (
    <NotificationsContext.Provider
      value={{
        load,
        unread,
        notifications,
        getNotifications,
        clearNotifications,
        deleteNotification,
        getNotificationsUnread,
      }}>
      {children}
    </NotificationsContext.Provider>
  );
};

const useNotifications = () => {
  const event = useContext(NotificationsContext);
  if (event == null) {
    throw new Error(
      'useNotifications() called outside of a NotificationsProvider?',
    );
  }
  return event;
};

export {NotificationsProvider, useNotifications};
