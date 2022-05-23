import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../Utils/Constants';
import Groups from '../../../Screens/Groups/Groups';
import {GroupsProvider} from '../../../Providers/Groups/GroupsProvider';
import CreateGroup from '../../../Screens/Groups/CreateGroup';
import ViewGroup from '../../../Screens/Groups/ViewGroup';
import {GroupUsersProvider} from '../../../Providers/Groups/GroupUsersProvider';
import CreateGroupUser from '../../../Screens/Groups/GroupUsers/CreateGroupUser';

const Stack = createStackNavigator();

export const GroupsStack = ({store}) => {
  return (
    <GroupsProvider store={store}>
      <Stack.Navigator>
        <Stack.Screen name="Groups" options={STACK_OPTIONS}>
          {props => <Groups {...props} />}
        </Stack.Screen>
        <Stack.Screen name="CreateGroup" options={STACK_OPTIONS}>
          {props => <CreateGroup {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ViewGroup" options={STACK_OPTIONS}>
          {props => (
            <GroupUsersProvider>
              <ViewGroup {...props} />
            </GroupUsersProvider>
          )}
        </Stack.Screen>
        <Stack.Screen name="CreateGroupUser" options={STACK_OPTIONS}>
          {props => (
            <GroupUsersProvider>
              <CreateGroupUser {...props} />
            </GroupUsersProvider>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </GroupsProvider>
  );
};
