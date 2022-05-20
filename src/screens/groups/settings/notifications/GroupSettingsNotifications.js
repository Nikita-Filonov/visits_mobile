import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {validateDiscordWebhook, validateNotify} from '../../../../utils/Utils';
import {useGroupSettings} from '../../../../providers/groups/GroupSettingsProvider';
import {useGroupPermissions} from '../../../../providers/groups/GroupPermissionsProvider';
import {ConfirmLayout} from '../../../../components/layouts/ConfirmLayout';
import {comp} from '../../../../styles/Blocks';
import {GROUP_SETTINGS} from '../../../../utils/permissions/Groups';
import {NotificationTextField} from '../../../../components/common/inputs/NotificationTextField';
import {CLIENTS} from '../../../../utils/Constants';
import {CustomText} from '../../../../components/common/CustomText';
import {TextField} from '../../../../components/common/inputs/TextField';
import {HorizontalDivider} from '../../../../components/common/HorizontalDivider';
import {TextInput} from 'react-native-paper';
import TelegramGroupSyncStatus from '../../../../components/blocks/groups/settings/TelegramGroupSyncStatus';
import DiscordGroupSyncStatus from '../../../../components/blocks/groups/settings/DiscordGroupSyncStatus';

const GroupSettingsNotifications = ({group, groupSettings}) => {
  const {t} = useTranslation();
  const {request, updateGroupSettings} = useGroupSettings();
  const {isAllowed} = useGroupPermissions();
  const [telegramNotify, setTelegramNotify] = useState(groupSettings.telegram_group_notify);
  const [discordNotify, setDiscordNotify] = useState(groupSettings.discord_group_notify);
  const [telegramChannel, setTelegramChannel] = useState(groupSettings.telegram_channel);
  const [discordWebhook, setDiscordWebhook] = useState(groupSettings.discord_webhook);

  useEffect(() => {
    setTelegramChannel(groupSettings.telegram_channel);
    setDiscordWebhook(groupSettings.discord_webhook);
    setTelegramNotify(groupSettings.telegram_group_notify);
    setDiscordNotify(groupSettings.discord_group_notify);
  }, [groupSettings.telegram_channel, groupSettings.discord_webhook, groupSettings.telegram_group_notify, groupSettings.discord_group_notify]);

  const disabled = useMemo(() => {
    if (telegramChannel !== groupSettings?.telegram_channel) {
      return false;
    }

    if (telegramNotify !== groupSettings?.telegram_group_notify) {
      return !validateNotify(telegramNotify);
    }

    if (discordNotify !== groupSettings?.discord_group_notify) {
      return !validateNotify(discordNotify);
    }

    return discordWebhook === groupSettings?.discord_webhook;
  }, [telegramChannel, discordWebhook, groupSettings, telegramNotify, discordNotify]);


  const onSave = async () => await updateGroupSettings(group.id, {
    telegram_channel: telegramChannel,
    discord_webhook: discordWebhook,
    telegram_group_notify: telegramNotify,
    discord_group_notify: discordNotify,
  });

  const isSaveDisabled = useMemo(() => disabled || validateDiscordWebhook(discordWebhook), [disabled, discordWebhook]);

  return (
    <ConfirmLayout
      loading={request}
      onConfirm={onSave}
      title={t('components.drawer.notifications')}
      disabled={isSaveDisabled || !isAllowed([GROUP_SETTINGS.update])}
    >
      <ScrollView>
        <CustomText>{t('groups.settings.notificationsIntegrations.description')}</CustomText>
        <TextField
          style={comp.input}
          value={telegramChannel}
          onChangeText={setTelegramChannel}
          placeholder={'My Channel'}
          label={t('groups.settings.notificationsIntegrations.telegramInputLabel')}
          right={<TextInput.Icon name={() => <TelegramGroupSyncStatus/>}/>}
        />
        <TextField
          style={comp.input}
          value={discordWebhook}
          onChangeText={setDiscordWebhook}
          label={'Discord Webhook'}
          placeholder={'https://discord.com/api/webhooks/....'}
          right={<TextInput.Icon name={() => <DiscordGroupSyncStatus/>}/>}
        />
        <HorizontalDivider style={{marginBottom: 0}}/>
        <NotificationTextField
          count={telegramNotify}
          client={CLIENTS.TELEGRAM}
          onChangeText={setTelegramNotify}
        />
        <NotificationTextField
          count={discordNotify}
          client={CLIENTS.DISCORD}
          onChangeText={setDiscordNotify}
        />
      </ScrollView>
    </ConfirmLayout>
  );
};


const getState = (state) => ({
  group: state.groups.group,
  groupSettings: state.groups.groupSettings,
});


export default connect(
  getState,
  null,
)(GroupSettingsNotifications);
