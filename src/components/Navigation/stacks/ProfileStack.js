import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../utils/Constants';
import {PremiumsProvider} from '../../../Providers/PremiumsProvider';
import {ProfileSettings} from '../../../Screens/Profile/ProfileSettings';
import {Profile} from '../../../Screens/Profile/Profile';
import {MyPremiums} from '../../../Screens/Profile/MyPremiums';
import {PremiumAccesses} from '../../../Screens/Profile/PremiumAccesses';
import {TelegramProfile} from '../../../Screens/Profile/TelegramProfile';
import {VkProfile} from '../../../Screens/Profile/VkProfile';
import {useAuth} from '../../../Providers/AuthProvider';
import {ChangePassword} from '../../../Screens/Profile/ChangePassword';

const Stack = createStackNavigator();

export const ProfileStack = () => {
  const {user} = useAuth();

  return (
    <PremiumsProvider>
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
        <Stack.Screen name="MyPremiums" options={STACK_OPTIONS}>
          {props => <MyPremiums {...props} />}
        </Stack.Screen>
        <Stack.Screen name="PremiumAccesses" options={STACK_OPTIONS}>
          {props => <PremiumAccesses {...props} />}
        </Stack.Screen>
        {!user?.telegram_username && (
          <Stack.Screen name="TelegramProfile" options={STACK_OPTIONS}>
            {props => <TelegramProfile {...props} />}
          </Stack.Screen>
        )}
        {!user?.vk_id && (
          <Stack.Screen name="VkProfile" options={STACK_OPTIONS}>
            {props => <VkProfile {...props} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </PremiumsProvider>
  );
};
