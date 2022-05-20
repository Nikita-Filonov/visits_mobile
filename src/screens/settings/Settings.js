import React, {useEffect} from 'react';
import {DrawerLayout} from '../../components/layouts/DrawerLayout';
import {useTranslation} from 'react-i18next';
import {GroupSettingsItem} from '../../components/blocks/groups/settings/GroupSettingsItem';
import {AdMobInterstitial} from 'react-native-admob';


export const Settings = ({navigation}) => {
  const {t} = useTranslation();

  useEffect(() => {
    AdMobInterstitial.setAdUnitID('ca-app-pub-1094213860762666/7141988261');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }, []);

  const onMonsters = () => navigation.navigate('MonstersSettings');
  const onSounds = () => navigation.navigate('SoundsSettings');
  const onIntegrations = () => navigation.navigate('NotificationsSettings');
  const onTemplates = () => navigation.navigate('NotificationTemplatesSettings');
  const onFormatters = () => navigation.navigate('NotificationsFormattersSettings');
  const onComments = () => navigation.navigate('CommentsSettings');
  const onTheme = () => navigation.navigate('ThemeSettings');
  const onTimers = () => navigation.navigate('TimersSettings');
  const onLanguage = () => navigation.navigate('LanguageSettings');

  return (
    <DrawerLayout title={t('settings.sidebar.title')} navigation={navigation} wrapper={false}>
      <GroupSettingsItem
        label={t('settings.sidebar.monsters')}
        name={'pets'}
        type={'material'}
        onPress={onMonsters}
      />
      <GroupSettingsItem
        label={t('settings.sidebar.sound')}
        name={'volume-high'}
        type={'material-community'}
        onPress={onSounds}
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
        label={t('settings.sidebar.comments')}
        name={'comment-outline'}
        type={'material-community'}
        onPress={onComments}
      />
      <GroupSettingsItem
        name={'theme-light-dark'}
        type={'material-community'}
        label={t('settings.sidebar.theme')}
        onPress={onTheme}
      />
      <GroupSettingsItem
        name={'timer-outline'}
        type={'material-community'}
        label={t('components.drawer.timers')}
        onPress={onTimers}
      />
      <GroupSettingsItem
        name={'translate'}
        type={'material-community'}
        label={t('components.languageSelect.label')}
        onPress={onLanguage}
      />
    </DrawerLayout>
  );
};
