import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../utils/Constants';
import Pairs from '../../../Screens/Pairs/Pairs';
import {PairsProvider} from '../../../Providers/PairsProvider';

const Stack = createStackNavigator();

export const PairsStack = () => {
  return (
    <PairsProvider>
      <Stack.Navigator>
        <Stack.Screen name="Pairs" options={STACK_OPTIONS}>
          {props => <Pairs {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </PairsProvider>
  );
};
