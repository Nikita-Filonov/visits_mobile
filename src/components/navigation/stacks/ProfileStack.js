import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../utils/Constants';
import {PremiumsProvider} from '../../../providers/PremiumsProvider';
import {ProfileSettings} from '../../../screens/profile/ProfileSettings';
import {Profile} from '../../../screens/profile/Profile';
import {MyPremiums} from '../../../screens/profile/MyPremiums';
import {PremiumAccesses} from '../../../screens/profile/PremiumAccesses';
import {TelegramProfile} from '../../../screens/profile/TelegramProfile';
import {VkProfile} from '../../../screens/profile/VkProfile';
import {useAuth} from '../../../providers/AuthProvider';
import {ChangePassword} from '../../../screens/profile/ChangePassword';

const Stack = createStackNavigator();

export const ProfileStack = () => {
  const {user} = useAuth();

  return (
    <PremiumsProvider>
      <Stack.Navigator>
        <Stack.Screen name="ProfileSettings" options={STACK_OPTIONS}>
          {props => <ProfileSettings {...props}/>}
        </Stack.Screen>
        <Stack.Screen name="Profile" options={STACK_OPTIONS}>
          {props => <Profile {...props}/>}
        </Stack.Screen>
        <Stack.Screen name="ChangePassword" options={STACK_OPTIONS}>
          {props => <ChangePassword {...props}/>}
        </Stack.Screen>
        <Stack.Screen name="MyPremiums" options={STACK_OPTIONS}>
          {props => <MyPremiums {...props}/>}
        </Stack.Screen>
        <Stack.Screen name="PremiumAccesses" options={STACK_OPTIONS}>
          {props => <PremiumAccesses {...props}/>}
        </Stack.Screen>
        {!user?.telegram_username && <Stack.Screen name="TelegramProfile" options={STACK_OPTIONS}>
          {props => <TelegramProfile {...props}/>}
        </Stack.Screen>}
        {!user?.vk_id && <Stack.Screen name="VkProfile" options={STACK_OPTIONS}>
          {props => <VkProfile {...props}/>}
        </Stack.Screen>}
      </Stack.Navigator>
    </PremiumsProvider>
  );
};
