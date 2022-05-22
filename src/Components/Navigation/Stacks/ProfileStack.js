import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../Utils/Constants';
import {ProfileSettings} from '../../../Screens/Profile/ProfileSettings';
import {Profile} from '../../../Screens/Profile/Profile';
import {ChangePassword} from '../../../Screens/Profile/ChangePassword';

const Stack = createStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileSettings" options={STACK_OPTIONS}>
        {props => <ProfileSettings {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Profile" options={STACK_OPTIONS}>
        {props => <Profile {...props} />}
      </Stack.Screen>
      <Stack.Screen name="ChangePassword" options={STACK_OPTIONS}>
        {props => <ChangePassword {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
