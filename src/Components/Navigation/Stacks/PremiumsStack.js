import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../utils/Constants';
import {Premiums} from '../../../Screens/premiums/Premiums';
import {PremiumsProvider} from '../../../Providers/PremiumsProvider';
import {PremiumsInfo} from '../../../Screens/premiums/PremiumsInfo';

const Stack = createStackNavigator();

export const PremiumsStack = () => {
  return (
    <PremiumsProvider>
      <Stack.Navigator>
        <Stack.Screen name="Premiums" options={STACK_OPTIONS}>
          {props => <Premiums {...props} />}
        </Stack.Screen>
        <Stack.Screen name="PremiumsInfo" options={STACK_OPTIONS}>
          {props => <PremiumsInfo {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </PremiumsProvider>
  );
};
