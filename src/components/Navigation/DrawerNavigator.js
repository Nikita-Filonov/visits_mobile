import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerHeader} from './DrawerHeader';
import {DISABLE_SWIPE} from '../../utils/Constants';
import {drawerOptions} from '../../utils/Utils';
import {PairsStack} from './Stacks/PairsStack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const DrawerNavigator = ({store}) => (
  <Drawer.Navigator
    drawerType={'front'}
    initialRouteName="Timers"
    drawerContent={props => <DrawerHeader {...props} />}>
    <Stack.Screen
      name="Pairs"
      options={({route}) => drawerOptions({route}, DISABLE_SWIPE.timers)}>
      {props => <PairsStack {...props} />}
    </Stack.Screen>
  </Drawer.Navigator>
);
