import React from 'react';
import {Welcome} from '../../../Screens/Login/Welcome';
import {Login} from '../../../Screens/Login/Login';
import Registration from '../../../Screens/Login/Registration';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../Utils/Constants';
import ConfirmEmail from '../../../Screens/Login/ConfirmEmail';

const Stack = createStackNavigator();

export const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" options={STACK_OPTIONS}>
        {props => <Welcome {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Login" options={STACK_OPTIONS}>
        {props => <Login {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Registration" options={STACK_OPTIONS}>
        {props => <Registration {...props} />}
      </Stack.Screen>
      <Stack.Screen name="ConfirmEmail" options={STACK_OPTIONS}>
        {props => <ConfirmEmail {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
