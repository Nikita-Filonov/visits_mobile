import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../utils/Constants';
import {Pairs} from '../../../Screens/Pairs/Pairs';

const Stack = createStackNavigator();

export const PairsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pairs" options={STACK_OPTIONS}>
        {props => <Pairs {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
