import React, {useMemo, useState} from 'react';
import {ConfirmLayout} from '../../../Components/Layouts/ConfirmLayout';
import {TextField} from '../../../Components/Common/Inputs/TextField';
import {comp} from '../../../Styles/Blocks';
import {useUserPairs} from '../../../Providers/Pairs/UserPairsProvider';
import {connect} from 'react-redux';
import {validateEmail} from '../../../utils/Utils';

const CreateUserPair = ({navigation, pair}) => {
  const {request, createUserPair} = useUserPairs();
  const [email, setEmail] = useState('');

  const onCreate = async () =>
    !(await createUserPair(pair.id, email)) && navigation.goBack();

  const isEmailValid = useMemo(() => !validateEmail(email), [email]);

  return (
    <ConfirmLayout
      title={'Добавить студента'}
      onConfirm={onCreate}
      disabled={isEmailValid}
      loading={request}>
      <TextField
        label={'Электронный адрес'}
        style={comp.input}
        value={email}
        onChangeText={setEmail}
      />
    </ConfirmLayout>
  );
};

const getState = state => ({pair: state.pairs.pair});
export default connect(getState, null)(CreateUserPair);
