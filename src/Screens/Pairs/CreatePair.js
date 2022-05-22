import React from 'react';
import {ConfirmLayout} from '../../Components/Layouts/ConfirmLayout';
import {TextField} from '../../Components/Common/Inputs/TextField';
import {comp} from '../../Styles/Blocks';
import {connect} from 'react-redux';
import {setPair} from '../../Redux/Pairs/pairsActions';
import {usePairs} from '../../Providers/Pairs/PairsProvider';
import {PAIRS_INITIAL_STATE} from '../../Redux/Pairs/initialState';

const CreatePair = ({navigation, pair, setPairStore}) => {
  const {request, createPair, updateCharacter} = usePairs();

  const onBack = () => {
    navigation.goBack();
    setPairStore(PAIRS_INITIAL_STATE.pair);
  };

  const onCreate = async () =>
    await createPair({name: pair.name, room: pair.room});

  const onUpdate = async () => {
    await updateCharacter(pair.id, {username: pair.username});
    onBack();
  };

  return (
    <ConfirmLayout
      title={pair.editMode ? 'Изменить пару' : 'Новый пара'}
      loading={request}
      onBack={onBack}
      onConfirm={pair.editMode ? onUpdate : onCreate}>
      <TextField
        label={'Название пары'}
        style={comp.input}
        value={pair.username}
        onChangeText={name => setPairStore({...pair, name})}
      />
      <TextField
        label={'Аудитория'}
        style={comp.input}
        value={pair.username}
        onChangeText={room => setPairStore({...pair, room})}
      />
    </ConfirmLayout>
  );
};

const getState = state => ({pair: state.pairs.pair});
export default connect(getState, {setPairStore: setPair})(CreatePair);
