import React, {useContext, useEffect, useState} from 'react';
import {SUPPORTED_ACTIONS, useAlerts} from './AlertsProvider';
import {get, patch, post, remove} from '../utils/api/Fetch';
import {DEFAULT_USER_SETTINGS} from '../utils/Constants';
import {safeLocale} from '../utils/Utils';
import {useTranslation} from 'react-i18next';
import {useAuth} from './AuthProvider';

const SettingsContext = React.createContext(null);

const SettingsProvider = ({children, store}) => {
  const {t} = useTranslation();
  const {token} = useAuth();
  const settingsApi = 'api/v1/settings/';
  const {setAlert, successTemplate} = useAlerts();
  const [request, setRequest] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_USER_SETTINGS);
  const [soundsLoad, setSoundsLoad] = useState(true);
  const [sounds, setSounds] = useState([]);

  const MONSTER = t('components.alerts.instances.monster');
  const MONSTERS = t('components.alerts.instances.monsters');

  useEffect(() => {
    (async () => token && await getSettings())();
  }, [token]);

  useEffect(() => {
    (async () => {
      const locale = await safeLocale();
      await updateSettings({locale}, true);
    })();
  }, []);

  const getSettings = async () => {
    const {error, json} = await get(settingsApi);
    !error && setSettings(json);
  };

  const updateSettings = async (payload, isLazy = false) => {
    setRequest(true);
    const {error, json} = await patch(settingsApi, payload);
    !error && setSettings(json);
    !isLazy && setAlert(error ? json : successTemplate(t('components.alerts.instances.settings'), SUPPORTED_ACTIONS.update));
    setRequest(false);
  };

  const getSounds = async () => {
    setSoundsLoad(true);
    const {error, json} = await get('api/v1/sounds/');
    !error && setSounds(json);
    setSoundsLoad(false);
  };

  const createMonster = async (payload) => {
    setRequest(true);
    const {error, json} = await post('api/v1/monsters/', payload);
    !error && setSettings({...settings, monsters: [json, ...settings.monsters]});
    setAlert(error ? json : successTemplate(MONSTER, SUPPORTED_ACTIONS.create_male));
    setRequest(false);
  };

  const deleteMonster = async (monsterId) => {
    const {error, json} = await remove(`api/v1/monsters/${monsterId}/`);
    !error && setSettings({
      ...settings,
      monsters: settings.monsters.filter(monster => monster.id !== monsterId),
    });
    setAlert(error ? json : successTemplate(MONSTER, SUPPORTED_ACTIONS.delete_male));
  };

  const updateMonster = async (monsterId, payload) => {
    setRequest(true);
    const {error, json} = await patch(`api/v1/monsters/${monsterId}/`, payload);
    !error && setSettings({
      ...settings,
      monsters: settings.monsters.map(monster => monster.id === monsterId ? json : monster),
    });
    setAlert(error ? json : successTemplate(MONSTER, SUPPORTED_ACTIONS.update_male));
    setRequest(false);
  };

  const importMonsters = async (payload) => {
    setRequest(true);
    const {error, json} = await post('api/v1/monsters/import/', payload);
    !error && setSettings(json);
    setAlert(error ? json : successTemplate(MONSTERS, SUPPORTED_ACTIONS.import));
    setRequest(false);
  };

  return (
    <SettingsContext.Provider
      value={{
        request,
        settings,
        sounds,
        soundsLoad,
        getSounds,
        updateSettings,
        createMonster,
        deleteMonster,
        updateMonster,
        importMonsters,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => {
  const event = useContext(SettingsContext);
  if (event == null) {
    throw new Error('useSettings() called outside of a SettingsProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return event;
};

export {SettingsProvider, useSettings};
