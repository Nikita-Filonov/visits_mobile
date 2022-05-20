import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../utils/Constants';
import Groups from '../../../screens/groups/Groups';
import {GroupsProvider} from '../../../providers/groups/GroupsProvider';
import {CreateGroup} from '../../../screens/groups/CreateGroup';
import {GroupSettings} from '../../../screens/groups/settings/GroupSettings';
import GroupSettingsGeneral from '../../../screens/groups/settings/GroupSettingsGeneral';
import {GroupPermissionsProvider} from '../../../providers/groups/GroupPermissionsProvider';
import GroupSettingsMembers from '../../../screens/groups/settings/GroupSettingsMembers';
import GroupSettingsRoles from '../../../screens/groups/settings/GroupSettingsRoles';
import GroupSettingsNotifications from '../../../screens/groups/settings/notifications/GroupSettingsNotifications';
import {GroupSettingsProvider} from '../../../providers/groups/GroupSettingsProvider';
import GroupSettingsNotificationTemplate
  from '../../../screens/groups/settings/notifications/GroupSettingsNotificationTemplate';
import GroupSettingsNotificationFormatters
  from '../../../screens/groups/settings/notifications/GroupSettingsNotificationFormatters';
import GroupTimers from '../../../screens/groups/GroupTimers/GroupTimers';
import {TimersProvider} from '../../../providers/timers/TimersProvider';
import {GroupTimersProvider} from '../../../providers/groups/GroupTimersProvider';
import CreateGroupTimer from '../../../screens/groups/GroupTimers/CreateGroupTimer';
import ImportTimers from '../../../screens/groups/GroupTimers/ImportTimers';
import TimerHistory from '../../../screens/groups/GroupTimers/TimerHistory';
import GroupHistory from '../../../screens/groups/GroupTimers/GroupHistory';

const Stack = createStackNavigator();

export const GroupsStack = ({store}) => {
  return (
    <GroupsProvider store={store}>
      <GroupPermissionsProvider>
        <GroupSettingsProvider store={store}>
          <GroupTimersProvider>
            <Stack.Navigator>
              <Stack.Screen name="Groups" options={STACK_OPTIONS}>
                {props => <Groups {...props}/>}
              </Stack.Screen>
              <Stack.Screen name="CreateGroup" options={STACK_OPTIONS}>
                {props => <CreateGroup {...props}/>}
              </Stack.Screen>
              <Stack.Screen name="GroupTimers" options={STACK_OPTIONS}>
                {props => <GroupTimers {...props}/>}
              </Stack.Screen>
              <Stack.Screen name="ImportTimers" options={STACK_OPTIONS}>
                {props =>
                  <TimersProvider>
                    <ImportTimers {...props}/>
                  </TimersProvider>
                }
              </Stack.Screen>
              <Stack.Screen name="TimerHistory" options={STACK_OPTIONS}>
                {props => <TimerHistory {...props}/>}
              </Stack.Screen>
              <Stack.Screen name="GroupHistory" options={STACK_OPTIONS}>
                {props => <GroupHistory {...props}/>}
              </Stack.Screen>
              <Stack.Screen name="CreateGroupTimer" options={STACK_OPTIONS}>
                {props => <CreateGroupTimer {...props}/>}
              </Stack.Screen>
              <Stack.Screen name="GroupSettings" options={STACK_OPTIONS}>
                {props => <GroupSettings {...props}/>}
              </Stack.Screen>
              <Stack.Screen name="GroupSettingsGeneral" options={STACK_OPTIONS}>
                {props => <GroupSettingsGeneral {...props}/>}
              </Stack.Screen>
              <Stack.Screen name="GroupSettingsMembers" options={STACK_OPTIONS}>
                {props => <GroupSettingsMembers {...props}/>}
              </Stack.Screen>
              <Stack.Screen name="GroupSettingsRoles" options={STACK_OPTIONS}>
                {props => <GroupSettingsRoles {...props}/>}
              </Stack.Screen>
              <Stack.Screen name="GroupSettingsNotifications" options={STACK_OPTIONS}>
                {props => <GroupSettingsNotifications {...props}/>}
              </Stack.Screen>
              <Stack.Screen name="GroupSettingsNotificationTemplate" options={STACK_OPTIONS}>
                {props => <GroupSettingsNotificationTemplate {...props}/>}
              </Stack.Screen>
              <Stack.Screen name="GroupSettingsNotificationFormatters" options={STACK_OPTIONS}>
                {props => <GroupSettingsNotificationFormatters {...props}/>}
              </Stack.Screen>
            </Stack.Navigator>
          </GroupTimersProvider>
        </GroupSettingsProvider>
      </GroupPermissionsProvider>
    </GroupsProvider>
  );
};
