import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import {patch} from './api/Fetch';
import {NOTIFICATIONS_SETTINGS_BACKUP} from './Constants';

export async function setupNotifications() {
  PushNotification.configure({
    onRegister: async function (token) {
      await patch('api/v1/user/', {token: token.token});
    },

    onNotification: async (notification) => {
      await PushNotification.localNotification(notification);
    },
    senderID: '422840835835',
    popInitialNotification: true,
    requestPermissions: true,
  });
  const settings = await AsyncStorage.getItem(NOTIFICATIONS_SETTINGS_BACKUP);
  if (!settings) {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel',
        channelName: 'basket_food_channel',
        channelDescription: 'A channel to categorise your notifications',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
    );
    await AsyncStorage.setItem(NOTIFICATIONS_SETTINGS_BACKUP, 'true');
  }
}
