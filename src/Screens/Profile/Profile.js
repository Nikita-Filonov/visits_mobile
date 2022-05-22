import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView} from 'react-native';
import {useAlerts} from '../../Providers/AlertsProvider';
import {useAuth} from '../../Providers/AuthProvider';
import {useTranslation} from 'react-i18next';
import {
  validateEmail,
  validateTelegramUsername,
  validateVkId,
} from '../../Utils/Utils';
import {ConfirmLayout} from '../../Components/Layouts/ConfirmLayout';
import {TextField} from '../../Components/Common/Inputs/TextField';
import {comp} from '../../Styles/Blocks';

export const Profile = () => {
  const {t} = useTranslation();
  const {setConfirmModal} = useAlerts();
  const {request, user, updateUser} = useAuth();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [telegramUsername, setTelegramUsername] = useState(
    user.telegram_username,
  );
  const [vkId, setVkId] = useState(user.vk_id);

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setTelegramUsername(user.telegram_username);
    setVkId(user.vk_id);
  }, [user.username, user.email, user.telegram_username, user.vk_id]);

  const disabled = useMemo(() => {
    if (vkId !== user?.vk_id) {
      return !validateVkId(vkId);
    }

    if (email !== user?.email) {
      return !validateEmail(email);
    }

    if (telegramUsername !== user.telegram_username) {
      return !validateTelegramUsername(telegramUsername);
    }

    return username === user?.username;
  }, [username, email, telegramUsername, vkId, user]);

  const updateProfile = async () =>
    await updateUser({
      email,
      username,
      telegram_username: telegramUsername,
      vk_id: vkId ? vkId : null,
    });

  return (
    <ConfirmLayout
      loading={request}
      disabled={disabled}
      onConfirm={updateProfile}
      title={t('profile.sidebar.title')}>
      <ScrollView>
        <TextField
          editable={false}
          style={comp.input}
          value={email}
          onChangeText={setEmail}
          label={t('login.email')}
        />
        <TextField
          style={comp.input}
          value={username}
          onChangeText={setUsername}
          label={t('registration.username')}
        />
      </ScrollView>
    </ConfirmLayout>
  );
};
