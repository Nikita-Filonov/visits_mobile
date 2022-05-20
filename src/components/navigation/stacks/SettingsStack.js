import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../utils/Constants';
import {Settings} from '../../../screens/settings/Settings';
import {MonstersSettings} from '../../../screens/settings/monsters/MonstersSettings';
import CreateMonster from '../../../screens/settings/monsters/CreateMonster';
import {ChooseMonsters} from '../../../screens/settings/monsters/ChooseMonsters';
import {PremiumsProvider} from '../../../providers/PremiumsProvider';
import {SoundsSettings} from '../../../screens/settings/SoundsSettings';
import {NotificationsSettings} from '../../../screens/settings/notifications/NotificationsSettings';
import {NotificationsTemplatesSettings} from '../../../screens/settings/notifications/NotificationsTemplatesSettings';
import {NotificationsFormattersSettings} from '../../../screens/settings/notifications/NotificationsFormattersSettings';
import {CommentsSettings} from '../../../screens/settings/comments/CommentsSettings';
import CreateComment from '../../../screens/settings/comments/CreateComment';
import ThemeSettings from '../../../screens/settings/ThemeSettings';
import {TimersSettings} from '../../../screens/settings/TimersSettings';
import {LanguageSettings} from '../../../screens/settings/LanguageSettings';

const Stack = createStackNavigator();

export const SettingsStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" options={STACK_OPTIONS}>
        {props => <Settings {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="MonstersSettings" options={STACK_OPTIONS}>
        {props => <MonstersSettings {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="CreateMonster" options={STACK_OPTIONS}>
        {props => <CreateMonster {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="ChooseMonsters" options={STACK_OPTIONS}>
        {props => <PremiumsProvider>
          <ChooseMonsters {...props}/>
        </PremiumsProvider>}
      </Stack.Screen>
      <Stack.Screen name="SoundsSettings" options={STACK_OPTIONS}>
        {props => <SoundsSettings {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="NotificationsSettings" options={STACK_OPTIONS}>
        {props => <NotificationsSettings {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="NotificationTemplatesSettings" options={STACK_OPTIONS}>
        {props => <NotificationsTemplatesSettings {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="NotificationsFormattersSettings" options={STACK_OPTIONS}>
        {props => <NotificationsFormattersSettings {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="CommentsSettings" options={STACK_OPTIONS}>
        {props => <CommentsSettings {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="CreateComment" options={STACK_OPTIONS}>
        {props => <CreateComment {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="ThemeSettings" options={STACK_OPTIONS}>
        {props => <ThemeSettings {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="TimersSettings" options={STACK_OPTIONS}>
        {props => <TimersSettings {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="LanguageSettings" options={STACK_OPTIONS}>
        {props => <LanguageSettings {...props}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
