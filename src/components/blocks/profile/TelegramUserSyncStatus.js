import React, {useEffect, useMemo} from 'react';
import {post} from '../../../utils/Api/Fetch';
import {CLIENTS, GROUP_SETTING_INTERVAL} from '../../../utils/Constants';
import {useTranslation} from 'react-i18next';
import {Touchable} from '../Touchable';
import {useThemes} from '../../../Providers/ThemeProvider';
import {useAlerts} from '../../../Providers/AlertsProvider';
import {useAuth} from '../../../Providers/AuthProvider';

export const TelegramUserSyncStatus = () => {
  const {t} = useTranslation();
  const {theme} = useThemes();
  const {setAlert, setConfirmModal} = useAlerts();
  const {user, setUser, getUser} = useAuth();

  const isSynced = useMemo(
    () => Boolean(user?.telegram_id && user?.telegram_username),
    [user],
  );
  const isWaitingForSync = useMemo(
    () => Boolean(!user?.telegram_id && user?.telegram_username),
    [user],
  );

  useEffect(() => {
    if (!isWaitingForSync) {
      return;
    }
    const interval = setInterval(
      async () => await onPong(),
      GROUP_SETTING_INTERVAL,
    );
    return () => clearInterval(interval);
  }, [user?.id, isWaitingForSync]);

  const onPing = async () => {
    const {json} = await post('api/v1/notifications/user-telegram/ping/');
    setAlert(json);
  };

  const onPong = async () => {
    const {error, json} = await getUser(true);
    !error &&
      json?.telegram_id &&
      setUser({...user, telegram_id: json?.telegram_id});
  };

  const onSyncWaitInfo = () =>
    setConfirmModal({
      content: {
        title: CLIENTS.TELEGRAM,
        description: t('groups.settings.notificationsIntegrations.syncWait', {
          client: CLIENTS.TELEGRAM,
        }),
      },
    });

  const onSyncInfo = () =>
    setConfirmModal({
      content: {
        title: CLIENTS.TELEGRAM,
        description: t(
          'groups.settings.notificationsIntegrations.syncSuccess',
          {client: CLIENTS.TELEGRAM},
        ),
        confirmButton: t('help.askQuestionModal.send'),
      },
      action: onPing,
    });

  return (
    <React.Fragment>
      {isSynced && (
        <Touchable
          name={'check-circle-outline'}
          type={'material-community'}
          color={theme.colors.success}
          action={onSyncInfo}
        />
      )}
      {isWaitingForSync && (
        <Touchable
          name={'sync'}
          type={'material-community'}
          color={theme.colors.primary}
          action={onSyncWaitInfo}
        />
      )}
    </React.Fragment>
  );
};
