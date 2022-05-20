import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../utils/Constants';
import Timers from '../../../screens/timers/Timers';
import {TimersProvider} from '../../../providers/timers/TimersProvider';
import CreateTimer from '../../../screens/timers/CreateTimer';

const Stack = createStackNavigator();

export const TimersStack = () => {
  return (
    <TimersProvider>
      <Stack.Navigator>
        <Stack.Screen name="Timers" options={STACK_OPTIONS}>
          {props => <Timers {...props}/>}
        </Stack.Screen>
        <Stack.Screen name="CreateTimer" options={STACK_OPTIONS}>
          {props => <CreateTimer {...props}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </TimersProvider>
  );
};
