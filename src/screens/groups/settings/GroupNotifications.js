import React, {memo, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, ScrollView, StatusBar, Text, View} from 'react-native';
import {comp} from '../../../styles/Blocks';
import {Appbar} from 'react-native-paper';
import {Icon, Input} from 'react-native-elements';
import I18n from '../../../utils/locales/i18n';
import {CTStyles, NSStyles, TStyles} from '../../../styles/Screens';
import {useGroups} from '../../../providers/groups/GroupsProvider';
import {connect} from 'react-redux';
import {validateDiscordWebhook, validateNotify} from '../../../utils/Utils';
import {useAuth} from '../../../providers/AuthProvider';
import {useAlerts} from '../../../providers/AlertsProvider';
import {Touchable} from '../../../components/blocks/Touchable';

const GroupNotifications = ({navigation, group}) => {
  const {user} = useAuth();
  const {setConfirmModal} = useAlerts();
  const {request, updateGroup} = useGroups();
  const [telegramNotify, setTelegramNotify] = useState(group.telegram_notify);
  const [discordNotify, setDiscordNotify] = useState(group.telegram_notify);
  const [telegramChannel, setTelegramChannel] = useState(group.telegram_channel);
  const [discordWebhook, setDiscordWebhook] = useState(group.discord_webhook);

  const isCreator = useMemo(() => group.creator.id === user.id, [group, user]);
  const isAdmin = useMemo(() =>
      group.members.some(
        member => member.user.id === user.id && member.permission === 'admin',
      ),
    [group, user],
  );

  useEffect(() => {
    setTelegramChannel(group.telegram_channel);
    setDiscordWebhook(group.discord_webhook);
    setTelegramNotify(group.telegram_notify);
    setDiscordNotify(group.discord_notify);
  }, [group]);

  const disabled = useMemo(() => {
    if (telegramChannel !== group?.telegram_channel) {
      return false;
    }

    if (telegramNotify !== group?.telegram_notify) {
      return !validateNotify(telegramNotify);
    }

    if (discordNotify !== group?.discord_notify) {
      return !validateNotify(discordNotify);
    }

    return discordWebhook === group?.discord_webhook;
  }, [telegramChannel, discordWebhook, group, telegramNotify, discordNotify]);


  const onSave = async () => {
    await updateGroup(group.id, {
      telegram_channel: telegramChannel,
      discord_webhook: discordWebhook,
      telegram_notify: telegramNotify,
      discord_notify: discordNotify,
    });
  };

  const discordReference = async () => {
    setConfirmModal({
      action: async () => {
        window.open('https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks', '_blank');
      },
      modal: true,
      content: {
        title: I18n.t('Setting up a webhook for Discord'),
        description: I18n.t('Discord Description'),
        confirmButton: I18n.t('More details'),
      },
    });
  };

  const isSaveDisabled = useMemo(() =>
    disabled ||
    !(isCreator || isAdmin) ||
    validateDiscordWebhook(discordWebhook),
    [disabled, isCreator, isAdmin, discordWebhook],
  );

  return (
    <View style={comp.container}>
      <StatusBar
        barStyle={'light-content'}
        animated={true}
        backgroundColor={'#4169E1'}
      />
      <Appbar.Header style={comp.colorHeader}>
        <Appbar.Action
          onPress={() => navigation.goBack()}
          animated={false}
          icon={() => <Icon name={'chevron-left'} type={'entypo'} color={'white'}/>}
        />
        <Appbar.Content title={I18n.t('Notifications')}/>
        <Appbar.Action
          disabled={isSaveDisabled}
          onPress={onSave}
          animated={false}
          icon={() => request
            ? <ActivityIndicator color={'white'}/>
            : <Icon name={'check'} type={'feather'} color={'white'}/>
          }
        />
      </Appbar.Header>
      <ScrollView style={{...comp.viewContainer, ...comp.flex}}>
        <Text style={CTStyles.primaryText}>
          {I18n.t('Group Notifications description')}
        </Text>
        <Input
          value={telegramChannel}
          onChangeText={text => setTelegramChannel(text)}
          label={I18n.t('Telegram channel or group name')}
          placeholder={'My Channel'}
          inputStyle={TStyles.input}
          inputContainerStyle={TStyles.inputContainer}
          containerStyle={{...CTStyles.inputContainer, ...NSStyles.inputContainer}}
        />
        <Input
          value={discordWebhook}
          onChangeText={text => setDiscordWebhook(text)}
          label={'Discord Webhook'}
          placeholder={'https://discord.com/api/webhooks/....'}
          inputStyle={TStyles.input}
          inputContainerStyle={TStyles.inputContainer}
          containerStyle={{...CTStyles.inputContainer, ...NSStyles.inputContainer}}
          rightIcon={() =>
            <Touchable
              type={'feather'}
              name={'help-circle'}
              action={discordReference}
            />
          }
        />
        <Input
          value={telegramNotify.toString()}
          onChangeText={text => setTelegramNotify(text)}
          label={`${I18n.t('Send telegram notifications in')} ${telegramNotify} ${I18n.t('minutes')}`}
          placeholder={'15'}
          keyboardType={'numeric'}
          inputStyle={TStyles.input}
          inputContainerStyle={TStyles.inputContainer}
          containerStyle={{...CTStyles.inputContainer, ...NSStyles.inputContainer}}
        />
        <Input
          value={discordNotify.toString()}
          onChangeText={text => setDiscordNotify(text)}
          label={`${I18n.t('Send notifications in discord in')} ${discordNotify} ${I18n.t('minutes')}`}
          placeholder={'15'}
          keyboardType={'numeric'}
          inputStyle={TStyles.input}
          inputContainerStyle={TStyles.inputContainer}
          containerStyle={{...CTStyles.inputContainer, ...NSStyles.inputContainer}}
        />
      </ScrollView>
    </View>
  );
};


const getState = (state) => ({
  group: state.timers.group,
});


export default connect(
  getState,
  null,
)(memo(GroupNotifications));
