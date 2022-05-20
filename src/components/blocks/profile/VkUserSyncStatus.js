import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../../../providers/AuthProvider';
import {useThemes} from '../../../providers/ThemeProvider';
import {useAlerts} from '../../../providers/AlertsProvider';
import {post} from '../../../utils/api/Fetch';
import {CLIENTS} from '../../../utils/Constants';
import {Touchable} from '../Touchable';

export const VkUserSyncStatus = () => {
  const {t} = useTranslation();
  const {theme} = useThemes();
  const {setAlert, setConfirmModal} = useAlerts();
  const {user} = useAuth();

  const isSynced = useMemo(() => Boolean(user?.vk_id), [user?.vk_id]);

  const onPing = async () => {
    const {json} = await post(`api/v1/notifications/user-vk/ping/`);
    setAlert(json);
  };

  const onSyncInfo = () => setConfirmModal({
    content: {
      title: CLIENTS.VK,
      description: t('groups.settings.notificationsIntegrations.syncSuccess', {client: CLIENTS.VK}),
      confirmButton: t('help.askQuestionModal.send'),
    },
    action: onPing,
  });

  return (isSynced &&
    <Touchable
      name={'check-circle-outline'}
      type={'material-community'}
      color={theme.colors.success}
      action={onSyncInfo}
    />
  );
};
