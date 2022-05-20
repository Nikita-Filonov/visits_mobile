import React, {useCallback, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {SUPPORTED_ACTIONS, useAlerts} from './AlertsProvider';
import {GoogleSignin} from '@react-native-community/google-signin';
import {DEFAULT_USER, GROUP_BACKUP, TOKEN_BACKUP} from '../utils/Constants';
import {get, patch, post} from '../utils/Api/Fetch';
import {useTranslation} from 'react-i18next';

const AuthContext = React.createContext(null);

const AuthProvider = ({children}) => {
  const userApi = 'api/v1/user';
  const {setAlert, successTemplate} = useAlerts();
  const {t} = useTranslation();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(DEFAULT_USER);
  const [request, setRequest] = useState(false);
  const [errors, setErrors] = useState({});

  const USER = t('components.alerts.instances.user');

  useEffect(() => {
    (async () => {
      const storedToken = await AsyncStorage.getItem(TOKEN_BACKUP);
      setToken(storedToken);
      token && (await getUser());
    })();
  }, [token]);

  const getUser = async (isLazy: boolean = false) => {
    const {error, json, code} = await get(`${userApi}/me/`);
    code === 401 && (await onLogout());
    !error && !isLazy && setUser(json);
    return {error, json};
  };

  const updateUser = useCallback(
    async payload => {
      setRequest(true);
      const {error, json} = await patch(userApi, payload);
      !error && setUser(json);
      setAlert(
        error ? json : successTemplate(USER, SUPPORTED_ACTIONS.update_male),
      );
      setRequest(false);
      return {error, json};
    },
    [token],
  );

  const changePassword = async payload => {
    setRequest(true);
    const {error, json} = await post('api/v1/change-password/', payload);
    if (!error) {
      setAlert(json);
      setErrors({});
    } else {
      setErrors(json);
    }
    setRequest(false);
  };

  const onLogout = async () => {
    await AsyncStorage.removeItem(TOKEN_BACKUP);
    setToken(null);
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem(GROUP_BACKUP);
  };

  const onLogin = async token => {
    setToken(token);
    await AsyncStorage.setItem(TOKEN_BACKUP, token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        errors,
        request,
        setUser,
        onLogin,
        onLogout,
        getUser,
        updateUser,
        changePassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const event = useContext(AuthContext);
  if (event == null) {
    throw new Error('useAuth() called outside of a AuthProvider?');
  }
  return event;
};

export {AuthProvider, useAuth};
