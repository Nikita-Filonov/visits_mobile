import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../utils/Constants';
import {SelfQRCode} from '../../../Screens/SelfQRCode/SelfQRCode';

const Stack = createStackNavigator();

export const SelfQRCodeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyQRCode" options={STACK_OPTIONS}>
        {props => <SelfQRCode {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
