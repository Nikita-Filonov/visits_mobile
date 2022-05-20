import React, {useMemo} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useAlerts} from '../../../../providers/AlertsProvider';
import {useGroupPermissions} from '../../../../providers/groups/GroupPermissionsProvider';
import {post} from '../../../../utils/api/Fetch';
import {useThemes} from '../../../../providers/ThemeProvider';
import {Touchable} from '../../Touchable';
import {GROUP_SETTINGS} from '../../../../utils/permissions/Groups';
import {CLIENTS} from '../../../../utils/Constants';
import {View} from 'react-native';

const DiscordGroupSyncStatus = ({group, groupSettings}) => {
  const {t} = useTranslation();
  const {theme} = useThemes();
  const {setAlert, setConfirmModal} = useAlerts();
  const {isAllowed} = useGroupPermissions();

  const discordReference = async () =>
    window.open('https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks', '_blank');

  const onPing = async () => {
    const {json} = await post(`api/v1/notifications/group-discord/${group.id}/ping/`);
    setAlert(json);
  };

  const isSynced = useMemo(() => Boolean(groupSettings?.discord_webhook), [groupSettings?.discord_webhook]);

  const onSyncInfo = () => setConfirmModal({
    content: {
      title: CLIENTS.DISCORD,
      description: t('groups.settings.notificationsIntegrations.syncSuccess', {client: CLIENTS.DISCORD}),
      confirmButton: t('help.askQuestionModal.send'),
    },
    action: onPing,
  });

  return (
    <View style={{flexDirection: 'row'}}>
      {isSynced ?
        <Touchable
          name={'check-circle-outline'}
          type={'material-community'}
          color={theme.colors.success}
          disabled={!isAllowed([GROUP_SETTINGS.update, GROUP_SETTINGS.view])}
          action={onSyncInfo}
        />
        : <Touchable
          name={'help-circle-outline'}
          type={'material-community'}
          action={discordReference}
        />
      }
    </View>
  );
};

const getState = (state) => ({
  group: state.groups.group,
  groupSettings: state.groups.groupSettings,
});

export default connect(
  getState,
  null,
)(DiscordGroupSyncStatus);
