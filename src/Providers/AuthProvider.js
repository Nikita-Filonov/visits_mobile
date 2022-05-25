import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {DEFAULT_USER, TOKEN_BACKUP} from '../Utils/Constants';
import {get} from '../Utils/Api/Fetch';
import type {User} from '../Models/User';

const AuthContext = React.createContext(null);

const AuthProvider = ({children}) => {
  const userApi = 'api/v1/user';
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(DEFAULT_USER);

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

  const getUsersQuery = async (
    email: string,
    username: string,
    limit: number = 10,
  ): Promise<User> => {
    const {error, json} = await get(`${userApi}/query`, {
      limit,
      email,
      username,
    });
    return error ? [] : json;
  };

  const onLogout = async () => {
    await AsyncStorage.removeItem(TOKEN_BACKUP);
    setToken(null);
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
        setUser,
        onLogin,
        onLogout,
        getUser,
        getUsersQuery,
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
