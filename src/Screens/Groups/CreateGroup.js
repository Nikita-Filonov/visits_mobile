import React from 'react';
import {ConfirmLayout} from '../../Components/Layouts/ConfirmLayout';
import {TextField} from '../../Components/Common/Inputs/TextField';
import {comp} from '../../Styles/Blocks';
import {connect} from 'react-redux';
import type {Group} from '../../Models/Group';
import {useGroups} from '../../Providers/Groups/GroupsProvider';
import {GROUPS_INITIAL_STATE} from '../../Redux/Groups/initialState';
import {setGroup} from '../../Redux/Groups/groupsActions';

type Props = {
  navigation: any,
  group: Group,
  setGroupStore: (group: Group) => void,
};

const CreateGroup = (props: Props) => {
  const {navigation, group, setGroupStore} = props;
  const {request, createGroup, updateGroup} = useGroups();

  const onBack = () => {
    navigation.goBack();
    setGroupStore(GROUPS_INITIAL_STATE.group);
  };

  const onCreate = async () => await createGroup({name: group.name});

  const onUpdate = async () =>
    updateGroup(group.id, {name: group.name}).then(() => onBack());

  return (
    <ConfirmLayout
      title={group.editMode ? 'Изменить группу' : 'Новая группа'}
      loading={request}
      onBack={onBack}
      onConfirm={group.editMode ? onUpdate : onCreate}>
      <TextField
        label={'Название группы'}
        style={comp.input}
        value={group.name}
        onChangeText={name => setGroupStore({...group, name})}
      />
    </ConfirmLayout>
  );
};

const getState = state => ({pair: state.pairs.pair});
export default connect(getState, {setGroupStore: setGroup})(CreateGroup);
