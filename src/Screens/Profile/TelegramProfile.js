import React, {useState} from 'react';
import {Linking} from 'react-native';
import {comp} from '../../Styles/Blocks';
import {useAuth} from '../../Providers/AuthProvider';
import {useTranslation} from 'react-i18next';
import {TELEGRAM_BOT} from '../../utils/Constants';
import {ConfirmLayout} from '../../Components/Layouts/ConfirmLayout';
import {validateTelegramUsername} from '../../utils/Utils';
import {CustomText} from '../../Components/common/CustomText';
import {TextField} from '../../Components/common/Inputs/TextField';

export const TelegramProfile = ({navigation}) => {
  const {t} = useTranslation();
  const {request, updateUser} = useAuth();
  const [username, setUsername] = useState('');

  const onSave = async () => {
    const {error} = await updateUser({telegram_username: username});
    if (!error) {
      await Linking.openURL(TELEGRAM_BOT);
      navigation.navigate('Profile');
    }
  };

  return (
    <ConfirmLayout
      loading={request}
      title={t('profile.telegram.title')}
      onConfirm={onSave}
      disabled={!validateTelegramUsername(username)}>
      <CustomText style={comp.smallText}>
        {t('profile.telegram.description')}
      </CustomText>
      <TextField
        style={comp.input}
        value={username}
        onChangeText={setUsername}
        label={t('profile.telegram.usernameInputLabel')}
        placeholder={'@my_username'}
      />
    </ConfirmLayout>
  );
};
