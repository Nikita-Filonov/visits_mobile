import React, {useCallback, useContext, useEffect, useState} from 'react';
import {get} from '../utils/Api/Fetch';
import {useAuth} from './AuthProvider';

const PermissionsContext = React.createContext(null);

const PermissionsProvider = ({children}) => {
  const {token} = useAuth();
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    (async () => token && (await getMyPermissions()))();
  }, [token]);

  const getMyPermissions = async () => {
    const {json, error} = await get('api/v1/permissions/me');
    !error && setPermissions(json);
  };

  const isAllowed = useCallback(
    (actions: Array<string>) => {
      const safePermissions = permissions?.map(p => p.scope);

      if (!safePermissions || safePermissions?.length === 0) {
        return;
      }

      return actions?.some(a => safePermissions.includes(a));
    },
    [permissions],
  );

  return (
    <PermissionsContext.Provider value={{isAllowed}}>
      {children}
    </PermissionsContext.Provider>
  );
};

const usePermissions = () => {
  const event = useContext(PermissionsContext);
  if (event == null) {
    throw new Error(
      'usePermissions() called outside of a PermissionsProvider?',
    ); // an alert is not placed because this is an error for the developer not the user
  }
  return event;
};

export {PermissionsProvider, usePermissions};
