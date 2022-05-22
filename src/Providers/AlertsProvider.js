import React, {useContext, useState} from 'react';
import {Snackbar} from 'react-native-paper';
import {Alert} from 'react-native';
import I18n from '../Utils/Locales/i18n';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const colors = {
  success: '#43A047',
  warning: '#FF9800',
  danger: '#D32F2F',
  error: '#D32F2F',
};

export const SUPPORTED_ACTIONS = {
  import: 'import',
  delete: 'delete',
  update: 'update',
  delete_it: 'delete_it',
  delete_male: 'delete_male',
  update_male: 'update_male',
  create_male: 'create_male',
  enable_male: 'enable_male',
  invited_male: 'invited_male',
  disable_male: 'disable_male',
  restored_male: 'restored_male',
  delete_female: 'delete_female',
  update_female: 'update_female',
  create_female: 'create_female',
};

const AlertContext = React.createContext(null);

const AlertProvider = ({children}) => {
  const {t} = useTranslation();
  const [alert, setAlert] = useState(false);

  const theme = useSelector(state => state.settings.theme);

  const setConfirmModal = ({action, content}) =>
    Alert.alert(
      content.title,
      content.description,
      [
        {
          text: I18n.t('common.cancel'),
          style: 'cancel',
        },
        {
          text: content.confirmButton,
          onPress: action,
        },
      ],
      {cancelable: false},
    );

  const successTemplate = (instance: string, type: string) => ({
    message: t('components.alerts.success', {
      action: t(`components.alerts.successActions.${type}`),
      instance: instance,
    }),
    level: 'success',
  });

  return (
    <AlertContext.Provider value={{setAlert, setConfirmModal, successTemplate}}>
      {children}
      {theme?.snackbar?.show && (
        <Snackbar
          visible={alert.message}
          onDismiss={() => setAlert({})}
          duration={4000}
          style={{backgroundColor: colors[alert.level]}}
          theme={{colors: {accent: 'white'}}}
          action={{
            label: t('common.close'),
            onPress: () => {
              setAlert({});
            },
          }}>
          {alert.message}
        </Snackbar>
      )}
    </AlertContext.Provider>
  );
};

const useAlerts = () => {
  const event = useContext(AlertContext);
  if (event == null) {
    throw new Error('useAlerts() called outside of a EventsProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return event;
};

export {AlertProvider, useAlerts};
