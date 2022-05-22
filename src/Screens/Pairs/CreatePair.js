import React from 'react';
import {ConfirmLayout} from '../../Components/Layouts/ConfirmLayout';
import {TextField} from '../../Components/Common/Inputs/TextField';
import {comp} from '../../Styles/Blocks';
import {connect} from 'react-redux';
import {setPair} from '../../Redux/Pairs/pairsActions';
import {usePairs} from '../../Providers/Pairs/PairsProvider';
import {PAIRS_INITIAL_STATE} from '../../Redux/Pairs/initialState';
import {TimePicker} from '../../Components/Common/Inputs/TimePicker';
import type {Pair} from '../../Models/Pairs';
import {formatToApiAcceptableTime} from '../../Utils/Helpers/Formatters';

type Props = {
  navigation: any,
  pair: Pair,
  setPairStore: () => void,
};

const CreatePair = (props: Props) => {
  const {navigation, pair, setPairStore} = props;
  const {request, createPair, updateCharacter} = usePairs();

  const onBack = () => {
    navigation.goBack();
    setPairStore(PAIRS_INITIAL_STATE.pair);
  };

  const onCreate = async () =>
    await createPair({
      name: pair.name,
      room: pair.room,
      startAt: formatToApiAcceptableTime(pair.startAt),
      endAt: formatToApiAcceptableTime(pair.endAt),
    });

  const onUpdate = async () => {
    await updateCharacter(pair.id, {username: pair.username});
    onBack();
  };

  const onTime = key => time => setPairStore({...pair, [key]: time});

  return (
    <ConfirmLayout
      title={pair.editMode ? 'Изменить пару' : 'Новый пара'}
      loading={request}
      onBack={onBack}
      onConfirm={pair.editMode ? onUpdate : onCreate}>
      <TextField
        label={'Название пары'}
        style={comp.input}
        value={pair.name}
        onChangeText={name => setPairStore({...pair, name})}
      />
      <TextField
        label={'Аудитория'}
        style={comp.input}
        value={pair.room}
        onChangeText={room => setPairStore({...pair, room})}
      />
      <TimePicker
        label={'Начало пары'}
        value={pair.startAt}
        onChange={onTime('startAt')}
      />
      <TimePicker
        label={'Конец пары'}
        value={pair.endAt}
        onChange={onTime('endAt')}
      />
    </ConfirmLayout>
  );
};

const getState = state => ({pair: state.pairs.pair});
export default connect(getState, {setPairStore: setPair})(CreatePair);
