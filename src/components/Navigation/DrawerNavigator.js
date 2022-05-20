import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerHeader} from './DrawerHeader';
import {TimersStack} from './stacks/TimersStack';
import {DISABLE_SWIPE, STACK_OPTIONS} from '../../utils/Constants';
import {GroupsStack} from './stacks/GroupsStack';
import {drawerOptions} from '../../utils/Utils';
import {PremiumsStack} from './stacks/PremiumsStack';
import {ProfileStack} from './stacks/ProfileStack';
import {SettingsStack} from './stacks/SettingsStack';
import {Notifications} from '../../Screens/notifications/Notifications';
import {NotificationsProvider} from '../../Providers/NotificationProvider';
import {GroupsProvider} from '../../Providers/Groups/GroupsProvider';
import {HelpScreen} from '../../Screens/help/HelpScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const DrawerNavigator = ({store}) => (
  <Drawer.Navigator
    drawerType={'front'}
    initialRouteName="Timers"
    drawerContent={props => (
      <NotificationsProvider>
        <DrawerHeader {...props} />
      </NotificationsProvider>
    )}>
    <Stack.Screen
      name="Timers"
      options={({route}) => drawerOptions({route}, DISABLE_SWIPE.timers)}>
      {props => <TimersStack {...props} />}
    </Stack.Screen>
    <Stack.Screen
      name="Groups"
      options={({route}) => drawerOptions({route}, DISABLE_SWIPE.groups)}>
      {props => <GroupsStack {...props} store={store} />}
    </Stack.Screen>
    <Stack.Screen
      name="Premiums"
      options={({route}) => drawerOptions({route}, DISABLE_SWIPE.premiums)}>
      {props => <PremiumsStack {...props} />}
    </Stack.Screen>
    <Stack.Screen
      name="ProfileSettings"
      options={({route}) => drawerOptions({route}, DISABLE_SWIPE.profile)}>
      {props => <ProfileStack {...props} />}
    </Stack.Screen>
    <Stack.Screen
      name="Settings"
      options={({route}) => drawerOptions({route}, DISABLE_SWIPE.setting)}>
      {props => <SettingsStack {...props} />}
    </Stack.Screen>
    <Stack.Screen name="Notifications" options={STACK_OPTIONS}>
      {props => (
        <NotificationsProvider>
          <GroupsProvider store={store}>
            <Notifications {...props} />
          </GroupsProvider>
        </NotificationsProvider>
      )}
    </Stack.Screen>
    <Stack.Screen name="Help" options={STACK_OPTIONS}>
      {props => <HelpScreen {...props} />}
    </Stack.Screen>
  </Drawer.Navigator>
);
