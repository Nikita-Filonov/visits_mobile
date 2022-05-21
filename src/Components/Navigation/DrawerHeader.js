import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {comp, DrawerHeaderStyles} from '../../Styles/Blocks';
import {Divider} from 'react-native-elements';
import {useAuth} from '../../Providers/AuthProvider';
import {useAlerts} from '../../Providers/AlertsProvider';
import {Touchable} from '../blocks/Touchable';
import {useThemes} from '../../Providers/ThemeProvider';
import {DrawerItem} from '../common/DrawerItem';
import {useTranslation} from 'react-i18next';
import {CustomText} from '../common/CustomText';
import {useRoute} from '@react-navigation/native';

export const DrawerHeader = ({navigation}) => {
  const {t} = useTranslation();
  const {theme, changeTheme} = useThemes();
  const {setConfirmModal} = useAlerts();
  const {user, onLogout} = useAuth();
  const [route, setRoute] = useState('Pairs');

  const logout = async () =>
    setConfirmModal({
      action: async () => await onLogout(),
      content: t('components.drawer.logoutModal'),
    });

  const navigate = screen => _ => {
    setRoute(screen);
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
          title={'Пары'}
          iconName={'calendar-check-outline'}
          iconType={'material-community'}
          onPress={navigate('Pairs')}
          selected={route === 'Pairs'}
        />
        <DrawerItem
          title={'Группы'}
          iconName={'people-outline'}
          iconType={'material'}
          onPress={navigate('Groups')}
        />
        <DrawerItem
          title={'Мой QR-код'}
          iconName={'qrcode-scan'}
          iconType={'material-community'}
          onPress={navigate('MyQRCode')}
          selected={route === 'MyQRCode'}
        />
        <Divider />
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
