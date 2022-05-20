import React, {useEffect} from 'react';
import {useAuth} from '../../providers/AuthProvider';
import {useTranslation} from 'react-i18next';
import {GroupSettingsItem} from '../../components/blocks/groups/settings/GroupSettingsItem';
import {DrawerLayout} from '../../components/layouts/DrawerLayout';
import {AdMobInterstitial} from 'react-native-admob';


export const ProfileSettings = ({navigation}) => {
  const {user} = useAuth();
  const {t} = useTranslation();

  useEffect(() => {
    AdMobInterstitial.setAdUnitID('ca-app-pub-1094213860762666/5170431047');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }, []);

  const onProfile = () => navigation.navigate('Profile');
  const onChangePassword = () => navigation.navigate('ChangePassword');
  const onMyPremiums = () => navigation.navigate('MyPremiums');
  const onPremiumAccesses = () => navigation.navigate('PremiumAccesses');
  const onVk = () => navigation.navigate('VkProfile');
  const onTelegram = () => navigation.navigate('TelegramProfile');

  return (
    <DrawerLayout navigation={navigation} wrapper={false} title={t('profile.sidebar.title')}>
      <GroupSettingsItem
        label={t('components.drawer.profile')}
        name={'perm-identity'}
        type={'material'}
        onPress={onProfile}
      />
      <GroupSettingsItem
        label={t('profile.sidebar.changePassword')}
        name={'lock-open'}
        type={'material'}
        onPress={onChangePassword}
      />
      <GroupSettingsItem
        label={t('profile.sidebar.myPremiums')}
        name={'credit-card-outline'}
        type={'material-community'}
        onPress={onMyPremiums}
      />
      <GroupSettingsItem
        label={t('profile.sidebar.premiumAccesses')}
        name={'crown-outline'}
        type={'material-community'}
        onPress={onPremiumAccesses}
      />
      {!user?.telegram_username && <GroupSettingsItem
        label={'Telegram'}
        name={'telegram'}
        type={'material-community'}
        onPress={onTelegram}
      />}
      {!user?.vk_id && <GroupSettingsItem label={t('profile.sidebar.vk')} name={'vk'} type={'entypo'} onPress={onVk}/>}
    </DrawerLayout>
  );
};
