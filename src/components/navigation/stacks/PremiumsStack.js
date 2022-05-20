import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../utils/Constants';
import {Premiums} from '../../../screens/premiums/Premiums';
import {PremiumsProvider} from '../../../providers/PremiumsProvider';
import {PremiumsInfo} from '../../../screens/premiums/PremiumsInfo';

const Stack = createStackNavigator();

export const PremiumsStack = () => {
  return (
    <PremiumsProvider>
      <Stack.Navigator>
        <Stack.Screen name="Premiums" options={STACK_OPTIONS}>
          {props => <Premiums {...props}/>}
        </Stack.Screen>
        <Stack.Screen name="PremiumsInfo" options={STACK_OPTIONS}>
          {props => <PremiumsInfo {...props}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </PremiumsProvider>
  );
};
