import React from 'react';
import {ConfirmLayout} from '../../Components/Layouts/ConfirmLayout';
import {TextField} from '../../Components/Common/Inputs/TextField';
import {comp} from '../../Styles/Blocks';
import {connect} from 'react-redux';
import {useCharacters} from '../../Providers/Character/CharactersProvider';
import {setCharacter} from '../../Redux/Characters/charactersActions';
import {CHARACTERS_INITIAL_STATE} from '../../Redux/Characters/initialState';

const CreateCharacter = ({navigation, character, setCharacter}) => {
  const {request, createCharacter, updateCharacter} = useCharacters();

  const onBack = () => {
    navigation.goBack();
    setCharacter(CHARACTERS_INITIAL_STATE.character);
  };

  const onCreate = async () =>
    await createCharacter({username: character.username});

  const onUpdate = async () => {
    await updateCharacter(character.id, {username: character.username});
    onBack();
  };

  return (
    <ConfirmLayout
      title={character.editMode ? 'Изменить персонажа' : 'Новый персонаж'}
      loading={request}
      onBack={onBack}
      onConfirm={character.editMode ? onUpdate : onCreate}>
      <TextField
        label={'Имя персонажа'}
        style={comp.input}
        value={character.username}
        onChangeText={username => setCharacter({...character, username})}
      />
    </ConfirmLayout>
  );
};

const getState = state => ({character: state.characters.character});
export default connect(getState, {setCharacter})(CreateCharacter);
