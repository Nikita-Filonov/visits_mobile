import React, {useCallback, useContext, useMemo} from 'react';
import {useSelector} from "react-redux";
import {useAuth} from "../AuthProvider";


const GroupPermissionsContext = React.createContext(null);

const GroupPermissionsProvider = ({children}) => {
  const {user} = useAuth();

  const group = useSelector(state => state.groups.group);

  const me = useMemo(() => group?.members?.find(m => m?.user?.id === user?.id), [user?.id, group]);
  const isAllowedSafe = useCallback(
    (actions) => {
      const permissions = me?.role?.scope;

      if (group?.creator?.id === user?.id) {
        return true;
      }

      if (!permissions || permissions.length === 0) {
        return;
      }

      return actions?.some(a => permissions.includes(a));
    },
    [me, user?.id]
  )

  const isAllowed = (actions) => isAllowedSafe(actions);

  return (
    <GroupPermissionsContext.Provider value={{isAllowed}}>
      {children}
    </GroupPermissionsContext.Provider>
  );
};

const useGroupPermissions = () => {
  const event = useContext(GroupPermissionsContext);
  if (event == null) {
    throw new Error('usePermissions() called outside of a GroupPermissionsProvider?');
  }
  return event;
};

export {GroupPermissionsProvider, useGroupPermissions};
