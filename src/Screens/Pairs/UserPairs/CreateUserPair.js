import React, {useState} from 'react';
import {ConfirmLayout} from '../../../Components/Layouts/ConfirmLayout';
import {TextField} from '../../../Components/Common/Inputs/TextField';
import {comp} from '../../../Styles/Blocks';
import {useUserPairs} from '../../../Providers/Pairs/UserPairsProvider';
import {connect} from 'react-redux';

const CreateUserPair = ({navigation, pair}) => {
  const {request, createUserPair} = useUserPairs();
  const [email, setEmail] = useState('');

  const onCreate = async () =>
    !(await createUserPair(pair.id, email)) && navigation.goBack();

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

const getState = state => ({pair: state.pairs.pair});
export default connect(getState, null)(CreateUserPair);
