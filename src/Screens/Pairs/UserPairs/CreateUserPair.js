import React, {useState} from 'react';
import {ConfirmLayout} from '../../../Components/Layouts/ConfirmLayout';
import {useUserPairs} from '../../../Providers/Pairs/UserPairsProvider';
import {connect} from 'react-redux';

const CreateUserPair = ({navigation, pair}) => {
  const {request, createUserPair} = useUserPairs();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const onCreate = async () =>
    !(await createUserPair(pair.id, selectedUsers)) && navigation.goBack();

  return (
    <ConfirmLayout
      title={'Добавить студента'}
      onConfirm={onCreate}
      loading={request}
    />
  );
};

const getState = state => ({pair: state.pairs.pair});
export default connect(getState, null)(CreateUserPair);
