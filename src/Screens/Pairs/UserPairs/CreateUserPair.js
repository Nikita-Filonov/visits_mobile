import React, {useState} from 'react';
import {ConfirmLayout} from '../../../Components/Layouts/ConfirmLayout';
import {useUserPairs} from '../../../Providers/Pairs/UserPairsProvider';
import {connect} from 'react-redux';
import {UsersSearch} from '../../../Components/Blocks/Users/UsersSearch';

const CreateUserPair = ({navigation, pair}) => {
  const {request, createUserPair} = useUserPairs();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const onCreate = async () =>
    !(await createUserPair(
      pair.id,
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

const getState = state => ({pair: state.pairs.pair});
export default connect(getState, null)(CreateUserPair);
