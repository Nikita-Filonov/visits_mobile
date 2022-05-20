import React from 'react';
import {ConfirmLayout} from '../../Components/Layouts/ConfirmLayout';
import {TextField} from '../../Components/Common/Inputs/TextField';
import {comp} from '../../Styles/Blocks';
import {connect} from 'react-redux';
import {setPair} from '../../Redux/Pairs/pairsActions';
import {usePairs} from '../../Providers/PairsProvider';
import {PAIRS_INITIAL_STATE} from '../../Redux/Pairs/initialState';

const CreatePair = ({navigation, character, setPairStore}) => {
  const {request, createCharacter, updateCharacter} = usePairs();

  const onBack = () => {
    navigation.goBack();
    setPairStore(PAIRS_INITIAL_STATE.pair);
  };

  const onCreate = async () =>
    await createCharacter({username: character.username});

  const onUpdate = async () => {
    await updateCharacter(character.id, {username: character.username});
    onBack();
  };

  return (
    <ConfirmLayout
      title={character.editMode ? 'Изменить пару' : 'Новый пара'}
      loading={request}
      onBack={onBack}
      onConfirm={character.editMode ? onUpdate : onCreate}>
      <TextField
        label={'Имя персонажа'}
        style={comp.input}
        value={character.username}
        onChangeText={username => setPairStore({...character, username})}
      />
    </ConfirmLayout>
  );
};

const getState = state => ({character: state.pairs.character});
export default connect(getState, {setPairStore: setPair})(CreatePair);
