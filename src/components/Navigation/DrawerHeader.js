import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {comp, DrawerHeaderStyles} from '../../Styles/Blocks';
import {Divider} from 'react-native-elements';
import {useAuth} from '../../providers/AuthProvider';
import {useAlerts} from '../../providers/AlertsProvider';
import {useNotifications} from '../../providers/NotificationProvider';
import {Touchable} from '../blocks/Touchable';
import {useThemes} from '../../providers/ThemeProvider';
import {DrawerItem} from '../common/DrawerItem';
import {useTranslation} from 'react-i18next';
import {Badge} from 'react-native-paper';
import {CustomText} from '../common/CustomText';

export const DrawerHeader = ({navigation}) => {
  const {t} = useTranslation();
  const {theme, changeTheme} = useThemes();
  const notificationsRef = useRef(null);
  const {setConfirmModal} = useAlerts();
  const {user, onLogout} = useAuth();
  const {getNotificationsUnread, unread} = useNotifications();

  useEffect(() => {
    (async () => {
      await getNotificationsUnread();
      notificationsRef.current = setInterval(
        async () => await getNotificationsUnread(),
        20000,
      );
    })();
    return () => clearInterval(notificationsRef.current);
  }, []);

  const logout = async () =>
    setConfirmModal({
      action: async () => await onLogout(),
      content: t('components.drawer.logoutModal'),
    });

  const navigate = screen => _ => {
    navigation.navigate(screen);
    navigation.closeDrawer();
  };

  return (
    <View style={[comp.container, {backgroundColor: theme.background}]}>
      <View style={[comp.viewContainer, DrawerHeaderStyles.imageContainer]}>
        <View style={comp.flex} />
        <Touchable
          action={async () =>
            await changeTheme(theme.dark ? 'default' : 'dark')
          }
          type={'feather'}
          name={theme.dark ? 'sun' : 'moon'}
        />
      </View>
      <View style={[comp.viewContainer, DrawerHeaderStyles.usernameContainer]}>
        <CustomText style={[comp.normalText, {fontFamily: 'Roboto-Medium'}]}>
          {t('components.navbar.accountMenu.welcome', {
            username: user?.username,
          })}
        </CustomText>
        <CustomText>{user?.email}</CustomText>
      </View>
      <View>
        <Divider style={DrawerHeaderStyles.divider} />
        <DrawerItem
          title={t('components.drawer.timers')}
          iconName={'timer-outline'}
          iconType={'material-community'}
          onPress={navigate('Timers')}
        />
        <DrawerItem
          title={t('components.drawer.groups')}
          iconName={'people-outline'}
          iconType={'material'}
          onPress={navigate('Groups')}
        />
        <DrawerItem
          color={'#FFA726'}
          title={t('components.drawer.premiums')}
          iconName={'credit-card-outline'}
          iconType={'material-community'}
          onPress={navigate('Premiums')}
        />
        <DrawerItem
          title={t('components.drawer.profile')}
          iconName={'account-circle'}
          iconType={'material-community'}
          onPress={navigate('ProfileSettings')}
        />
        <DrawerItem
          title={t('components.drawer.notifications')}
          iconName={'notifications-none'}
          iconType={'material'}
          onPress={navigate('Notifications')}
          badge={
            unread ? (
              <Badge style={{backgroundColor: theme.button.primary}}>
                +{unread}
              </Badge>
            ) : null
          }
        />
        <DrawerItem
          title={t('components.drawer.help')}
          iconName={'help-circle-outline'}
          iconType={'material-community'}
          onPress={navigate('Help')}
        />
        <Divider />
        <DrawerItem
          title={t('components.drawer.settings')}
          iconName={'settings'}
          iconType={'material'}
          onPress={navigate('Settings')}
        />
        <DrawerItem
          title={t('components.drawer.logout')}
          iconName={'logout'}
          iconType={'material-community'}
          onPress={logout}
        />
      </View>
    </View>
  );
};
