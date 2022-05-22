import React, {useState} from 'react';
import {Linking} from 'react-native';
import {comp} from '../../Styles/Blocks';
import {useAuth} from '../../Providers/AuthProvider';
import {Trans, useTranslation} from 'react-i18next';
import {VK_GROUP_DIALOG} from '../../utils/Constants';
import {ConfirmLayout} from '../../Components/Layouts/ConfirmLayout';
import {validateVkId} from '../../utils/Utils';
import {CustomText} from '../../Components/common/CustomText';
import {TextField} from '../../Components/common/Inputs/TextField';
import {Link} from '../../Components/common/Link';

export const VkProfile = ({navigation}) => {
  const {t} = useTranslation();
  const {request, updateUser} = useAuth();
  const [vkId, setVkId] = useState('');

  const onSave = async () => {
    const {error} = await updateUser({vk_id: vkId});
    if (!error) {
      await Linking.openURL(VK_GROUP_DIALOG);
      navigation.navigate('Profile');
    }
  };

  const onDialog = async () => await Linking.openURL(VK_GROUP_DIALOG);
  const onGroup = async () => await Linking.openURL('https://vk.com/rq_timer');

  return (
    <ConfirmLayout
      loading={request}
      title={t('profile.vk.title')}
      onConfirm={onSave}
      disabled={!validateVkId(vkId)}>
      <CustomText style={comp.smallText}>
        <Trans
          defaults={t('profile.vk.description')}
          components={[<Link onPress={onDialog} />, <Link onPress={onGroup} />]}
        />
      </CustomText>
      <TextField
        style={comp.input}
        value={vkId}
        onChangeText={setVkId}
        label={t('profile.vk.idInputLabel')}
        placeholder={t('profile.vk.idInputPlaceholder')}
      />
    </ConfirmLayout>
  );
};
