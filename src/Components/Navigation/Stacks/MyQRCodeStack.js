import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../utils/Constants';
import {MyQRCode} from '../../../Screens/MyQRCode/MyQRCode';

const Stack = createStackNavigator();

export const MyQRCodeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyQRCode" options={STACK_OPTIONS}>
        {props => <MyQRCode {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
