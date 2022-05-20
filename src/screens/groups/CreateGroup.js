import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {comp} from '../../styles/Blocks';
import {useGroups} from '../../providers/groups/GroupsProvider';
import {ConfirmLayout} from '../../components/layouts/ConfirmLayout';
import {useTranslation} from 'react-i18next';
import {CustomText} from '../../components/common/CustomText';
import {TextField} from '../../components/common/inputs/TextField';


export const CreateGroup = ({navigation}) => {
  const {t} = useTranslation();
  const {request, createGroup} = useGroups();
  const [title, setTitle] = useState('');


  const onCreate = async () => createGroup({title}).then(() => navigation.goBack());

  return (
    <ConfirmLayout loading={request} title={t('groups.createGroupModal.title')} onConfirm={onCreate}>
      <ScrollView>
        <CustomText style={comp.normalText}>{t('groups.createGroupModal.description')}</CustomText>
        <TextField
          value={title}
          onChangeText={setTitle}
          style={comp.input}
          label={t('groups.tableHeader.title')}
        />
      </ScrollView>
    </ConfirmLayout>
  );
};
