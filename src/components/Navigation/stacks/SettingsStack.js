import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../utils/Constants';
import {Settings} from '../../../Screens/settings/Settings';
import {MonstersSettings} from '../../../Screens/settings/monsters/MonstersSettings';
import CreateMonster from '../../../Screens/settings/monsters/CreateMonster';
import {ChooseMonsters} from '../../../Screens/settings/monsters/ChooseMonsters';
import {PremiumsProvider} from '../../../providers/PremiumsProvider';
import {SoundsSettings} from '../../../Screens/settings/SoundsSettings';
import {NotificationsSettings} from '../../../Screens/settings/notifications/NotificationsSettings';
import {NotificationsTemplatesSettings} from '../../../Screens/settings/notifications/NotificationsTemplatesSettings';
import {NotificationsFormattersSettings} from '../../../Screens/settings/notifications/NotificationsFormattersSettings';
import {CommentsSettings} from '../../../Screens/settings/comments/CommentsSettings';
import CreateComment from '../../../Screens/settings/comments/CreateComment';
import ThemeSettings from '../../../Screens/settings/ThemeSettings';
import {TimersSettings} from '../../../Screens/settings/TimersSettings';
import {LanguageSettings} from '../../../Screens/settings/LanguageSettings';

const Stack = createStackNavigator();

export const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" options={STACK_OPTIONS}>
        {props => <Settings {...props} />}
      </Stack.Screen>
      <Stack.Screen name="MonstersSettings" options={STACK_OPTIONS}>
        {props => <MonstersSettings {...props} />}
      </Stack.Screen>
      <Stack.Screen name="CreateMonster" options={STACK_OPTIONS}>
        {props => <CreateMonster {...props} />}
      </Stack.Screen>
      <Stack.Screen name="ChooseMonsters" options={STACK_OPTIONS}>
        {props => (
          <PremiumsProvider>
            <ChooseMonsters {...props} />
          </PremiumsProvider>
        )}
      </Stack.Screen>
      <Stack.Screen name="SoundsSettings" options={STACK_OPTIONS}>
        {props => <SoundsSettings {...props} />}
      </Stack.Screen>
      <Stack.Screen name="NotificationsSettings" options={STACK_OPTIONS}>
        {props => <NotificationsSettings {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="NotificationTemplatesSettings"
        options={STACK_OPTIONS}>
        {props => <NotificationsTemplatesSettings {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="NotificationsFormattersSettings"
        options={STACK_OPTIONS}>
        {props => <NotificationsFormattersSettings {...props} />}
      </Stack.Screen>
      <Stack.Screen name="CommentsSettings" options={STACK_OPTIONS}>
        {props => <CommentsSettings {...props} />}
      </Stack.Screen>
      <Stack.Screen name="CreateComment" options={STACK_OPTIONS}>
        {props => <CreateComment {...props} />}
      </Stack.Screen>
      <Stack.Screen name="ThemeSettings" options={STACK_OPTIONS}>
        {props => <ThemeSettings {...props} />}
      </Stack.Screen>
      <Stack.Screen name="TimersSettings" options={STACK_OPTIONS}>
        {props => <TimersSettings {...props} />}
      </Stack.Screen>
      <Stack.Screen name="LanguageSettings" options={STACK_OPTIONS}>
        {props => <LanguageSettings {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
