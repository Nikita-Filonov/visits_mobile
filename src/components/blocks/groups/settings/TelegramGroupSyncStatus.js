import React, {useEffect, useMemo} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useAlerts} from '../../../../providers/AlertsProvider';
import {useGroupPermissions} from '../../../../providers/groups/GroupPermissionsProvider';
import {useGroupSettings} from '../../../../providers/groups/GroupSettingsProvider';
import {CLIENTS, GROUP_SETTING_INTERVAL} from '../../../../utils/Constants';
import {post} from '../../../../utils/api/Fetch';
import {setGroupSettings} from '../../../../redux/Groups/groupsActions';
import {useThemes} from '../../../../providers/ThemeProvider';
import {Touchable} from '../../Touchable';
import {GROUP_SETTINGS} from '../../../../utils/permissions/Groups';

const TelegramGroupSyncStatus = ({group, groupSettings, setGroupSettings}) => {
  const {t} = useTranslation();
  const {theme} = useThemes();
  const {setAlert, setConfirmModal} = useAlerts();
  const {isAllowed} = useGroupPermissions();
  const {getGroupSettings} = useGroupSettings();

  const isSynced = useMemo(
    () => Boolean(groupSettings?.telegram_channel_id && groupSettings?.telegram_channel),
    [groupSettings],
  );
  const isWaitingForSync = useMemo(
    () => Boolean(!groupSettings?.telegram_channel_id && groupSettings?.telegram_channel),
    [groupSettings],
  );

  useEffect(() => {
    if (!isWaitingForSync) {
      return;
    }
    const interval = setInterval(async () => await onPong(), GROUP_SETTING_INTERVAL);
    return () => clearInterval(interval);
  }, [group.id, isWaitingForSync]);

  const onPing = async () => {
    const {json} = await post(`api/v1/notifications/group-telegram/${group.id}/ping/`);
    setAlert(json);
  };

  const onPong = async () => {
    const {error, json} = await getGroupSettings(group.id, true);
    (!error && json?.telegram_channel_id) && setGroupSettings({
      ...groupSettings,
      telegram_channel_id: json?.telegram_channel_id,
    });
  };

  const onSyncWaitInfo = () => setConfirmModal({
    content: {
      title: CLIENTS.TELEGRAM,
      description: t('groups.settings.notificationsIntegrations.syncWait', {client: CLIENTS.TELEGRAM}),
    },
  });

  const onSyncInfo = () => setConfirmModal({
    content: {
      title: CLIENTS.TELEGRAM,
      description: t('groups.settings.notificationsIntegrations.syncSuccess', {client: CLIENTS.TELEGRAM}),
      confirmButton: t('help.askQuestionModal.send'),
    },
    action: onPing,
  });

  return (
    <React.Fragment>
      {isSynced && <Touchable
        name={'check-circle-outline'}
        type={'material-community'}
        color={theme.colors.success}
        disabled={!isAllowed([GROUP_SETTINGS.update, GROUP_SETTINGS.view])}
        action={onSyncInfo}
      />}
      {isWaitingForSync && <Touchable
        name={'sync'}
        type={'material-community'}
        color={theme.colors.primary}
        action={onSyncWaitInfo}
      />}
    </React.Fragment>
  );
};

const getState = (state) => ({
  group: state.groups.group,
  groupSettings: state.groups.groupSettings,
});

export default connect(
  getState,
  {
    setGroupSettings,
  },
)(TelegramGroupSyncStatus);
