import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../utils/Constants';
import Pairs from '../../../Screens/Pairs/Pairs';
import CreatePair from '../../../Screens/Pairs/CreatePair';
import ViewPair from '../../../Screens/Pairs/ViewPair';
import {PairsProvider} from '../../../Providers/Pairs/PairsProvider';
import {UserPairsProvider} from '../../../Providers/Pairs/UserPairsProvider';

const Stack = createStackNavigator();

export const PairsStack = () => {
  return (
    <PairsProvider>
      <Stack.Navigator>
        <Stack.Screen name="Pairs" options={STACK_OPTIONS}>
          {props => <Pairs {...props} />}
        </Stack.Screen>
        <Stack.Screen name="CreatePair" options={STACK_OPTIONS}>
          {props => <CreatePair {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ViewPair" options={STACK_OPTIONS}>
          {props => (
            <UserPairsProvider>
              <ViewPair {...props} />
            </UserPairsProvider>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </PairsProvider>
  );
};