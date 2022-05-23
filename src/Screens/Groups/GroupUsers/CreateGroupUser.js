import React, {useState} from 'react';
import {ConfirmLayout} from '../../../Components/Layouts/ConfirmLayout';
import {TextField} from '../../../Components/Common/Inputs/TextField';
import {comp} from '../../../Styles/Blocks';
import {connect} from 'react-redux';
import type {Group} from '../../../Models/Group';
import {useGroupUsers} from '../../../Providers/Groups/GroupUsersProvider';

type Props = {
  navigation: any,
  group: Group,
};

const CreateGroupUser = (props: Props) => {
  const {navigation, group} = props;
  const {request, createGroupUser} = useGroupUsers();
  const [email, setEmail] = useState('');

  const onCreate = async () =>
    !(await createGroupUser(group.id, email)) && navigation.goBack();

  return (
    <ConfirmLayout
      title={'Добавить студента'}
      onConfirm={onCreate}
      loading={request}>
      <TextField
        label={'Электронный адрес или Фамилия Имя'}
        style={comp.input}
        value={email}
        onChangeText={setEmail}
      />
    </ConfirmLayout>
  );
};

const getState = state => ({group: state.groups.group});
export default connect(getState, null)(CreateGroupUser);
