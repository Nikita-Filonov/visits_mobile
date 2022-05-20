import React, {useEffect, useState} from 'react';
import {ConfirmLayout} from '../../components/Layouts/ConfirmLayout';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../../Providers/AuthProvider';
import {PasswordTextField} from '../../components/common/inputs/PasswordTextField';

export const ChangePassword = () => {
  const {t} = useTranslation();
  const {request, errors, changePassword} = useAuth();
  const [password, setP] = useState('');
  const [password1, setP1] = useState('');
  const [password2, setP2] = useState('');

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setP('');
      setP1('');
      setP2('');
    }
  }, [errors]);

  const onChange = async () =>
    await changePassword({
      old_password: password,
      new_password1: password1,
      new_password2: password2,
    });

  return (
    <ConfirmLayout
      loading={request}
      title={t('profile.sidebar.changePassword')}
      onConfirm={onChange}>
      <PasswordTextField
        value={password}
        onChangeText={setP}
        label={t('profile.changePassword.currentPassword')}
        error={errors.old_password}
      />
      <PasswordTextField
        value={password1}
        onChangeText={setP1}
        label={t('profile.changePassword.newPassword')}
        error={errors.new_password1}
      />
      <PasswordTextField
        value={password2}
        onChangeText={setP2}
        label={t('profile.changePassword.confirmThePassword')}
        error={errors.new_password2}
      />
    </ConfirmLayout>
  );
};
