import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../Utils/Constants';
import Groups from '../../../Screens/Groups/Groups';
import {GroupsProvider} from '../../../Providers/Groups/GroupsProvider';

const Stack = createStackNavigator();

export const GroupsStack = ({store}) => {
  return (
    <GroupsProvider store={store}>
      <Stack.Navigator>
        <Stack.Screen name="Groups" options={STACK_OPTIONS}>
          {props => <Groups {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </GroupsProvider>
  );
};
