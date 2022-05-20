import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView} from 'react-native';
import {useSettings} from '../../../providers/SettingsProvider';
import {validateNotify} from '../../../utils/Utils';
import {CLIENTS} from '../../../utils/Constants';
import {useTranslation} from 'react-i18next';
import {ConfirmLayout} from '../../../components/layouts/ConfirmLayout';
import {NotificationTextField} from '../../../components/common/inputs/NotificationTextField';
import {CheckboxFormControl} from '../../../components/common/inputs/CheckboxFormControl';


export const NotificationsSettings = () => {
  const {t} = useTranslation();
  const {request, settings, updateSettings} = useSettings();
  const [telegramNotify, setTelegramNotify] = useState(settings.telegram_notify);
  const [vkNotify, setVkNotify] = useState(settings.vk_notify);
  const [mobileNotify, setMobileNotify] = useState(settings.mobile_notify);
  const [appNotify, setAppNotify] = useState(settings.app_notify);
  const [mobileNotifications, setMobileNotifications] = useState(settings.mobile_notifications);

  useEffect(() => {
    setTelegramNotify(settings.telegram_notify);
    setVkNotify(settings.vk_notify);
    setMobileNotify(settings.mobile_notify);
    setAppNotify(settings.app_notify);
    setMobileNotifications(settings.mobile_notifications);
  }, [settings]);

  const disabled = useMemo(() => {
    if (telegramNotify !== settings.telegram_notify) {
      return false;
    }
    if (vkNotify !== settings.vk_notify) {
      return false;
    }

    if (mobileNotify !== settings.mobile_notify) {
      return false;
    }

    if (appNotify !== settings.app_notify) {
      return false;
    }

    return mobileNotifications === settings.mobile_notifications;

  }, [telegramNotify, vkNotify, mobileNotify, appNotify, mobileNotifications, settings]);

  const onSave = async () => await updateSettings({
    telegram_notify: telegramNotify,
    vk_notify: vkNotify,
    app_notify: appNotify,
    mobile_notify: mobileNotify,
    mobile_notifications: mobileNotifications,
  });


  const isSaveDisabled = useMemo(() =>
    !validateNotify(appNotify)
    || !validateNotify(telegramNotify)
    || !validateNotify(vkNotify)
    || !validateNotify(mobileNotify)
    || disabled,
    [appNotify, telegramNotify, vkNotify, mobileNotify, disabled],
  );

  const onMobileNotifications = () => setMobileNotifications(!mobileNotifications);

  return (
    <ConfirmLayout
      onConfirm={onSave}
      disabled={isSaveDisabled}
      loading={request}
      title={t('components.drawer.notifications')}
    >
      <ScrollView>
        <NotificationTextField
          count={appNotify}
          onChangeText={setAppNotify}
          client={t('settings.notificationsIntegrations.app')}
          helpText={t('settings.notificationsIntegrations.example')}
        />
        <NotificationTextField
          count={mobileNotify}
          onChangeText={setMobileNotify}
          client={t('settings.notificationsIntegrations.mobileApp')}
        />
        <NotificationTextField count={telegramNotify} onChangeText={setTelegramNotify} client={CLIENTS.TELEGRAM}/>
        <NotificationTextField count={vkNotify} onChangeText={setVkNotify} client={t('profile.sidebar.vk')}/>

        <CheckboxFormControl
          style={{marginTop: 30}}
          checked={mobileNotifications}
          onPress={onMobileNotifications}
          label={t('settings.notificationsIntegrations.mobileAppNotifications')}
        />
      </ScrollView>
    </ConfirmLayout>
  );
};
