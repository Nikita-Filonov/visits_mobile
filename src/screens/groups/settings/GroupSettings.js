import React, {useEffect} from 'react';
import {BackLayout} from '../../../components/layouts/BackLayout';
import {useTranslation} from 'react-i18next';
import {GroupSettingsItem} from '../../../components/blocks/groups/settings/GroupSettingsItem';
import {AdMobInterstitial} from 'react-native-admob';

export const GroupSettings = ({navigation}) => {
  const {t} = useTranslation();

  useEffect(() => {
    AdMobInterstitial.setAdUnitID('ca-app-pub-1094213860762666/9340643406');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }, []);

  const onGeneral = () => navigation.navigate('GroupSettingsGeneral');
  const onMembers = () => navigation.navigate('GroupSettingsMembers');
  const onRoles = () => navigation.navigate('GroupSettingsRoles');
  const onIntegrations = () => navigation.navigate('GroupSettingsNotifications');
  const onTemplates = () => navigation.navigate('GroupSettingsNotificationTemplate');
  const onFormatters = () => navigation.navigate('GroupSettingsNotificationFormatters');

  return (
    <BackLayout navigation={navigation} title={t('groups.settings.sidebar.title')} wrapper={false}>
      <GroupSettingsItem
        label={t('groups.settings.sidebar.common')}
        name={'description'}
        type={'material'}
        onPress={onGeneral}
      />
      <GroupSettingsItem
        label={t('settings.sidebar.integrations')}
        name={'notifications-none'}
        type={'material'}
        onPress={onIntegrations}
      />
      <GroupSettingsItem
        label={t('settings.sidebar.templates')}
        name={'comment-text-multiple-outline'}
        type={'material-community'}
        onPress={onTemplates}
      />
      <GroupSettingsItem
        label={t('settings.sidebar.formatters')}
        name={'calendar-blank-outline'}
        type={'material-community'}
        onPress={onFormatters}
      />
      <GroupSettingsItem
        label={t('groups.settings.sidebar.roles')}
        name={'person-add-alt'}
        type={'material'}
        onPress={onRoles}
      />
      <GroupSettingsItem
        label={t('groups.tableHeader.members')}
        name={'people-outline'}
        type={'material'}
        onPress={onMembers}
      />
    </BackLayout>
  );
};
