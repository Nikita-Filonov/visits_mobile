import React, {useState} from 'react';
import {ConfirmLayout} from '../../../Components/Layouts/ConfirmLayout';
import {connect} from 'react-redux';
import type {Group} from '../../../Models/Group';
import {useGroupUsers} from '../../../Providers/Groups/GroupUsersProvider';
import {UsersSearch} from '../../../Components/Blocks/Users/UsersSearch';

type Props = {
  navigation: any,
  group: Group,
};

const CreateGroupUser = (props: Props) => {
  const {navigation, group} = props;
  const {request, createGroupUser} = useGroupUsers();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const onCreate = async () =>
    !(await createGroupUser(
      group.id,
      selectedUsers.map(user => user.id),
    )) && navigation.goBack();

  return (
    <ConfirmLayout
      title={'Добавить студентов'}
      onConfirm={onCreate}
      loading={request}>
      <UsersSearch
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    </ConfirmLayout>
  );
};

const getState = state => ({group: state.groups.group});
export default connect(getState, null)(CreateGroupUser);
