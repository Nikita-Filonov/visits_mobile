import React from 'react';
import {CustomChoiceModal} from '../../../common/modals/CustomModal';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {setMember} from '../../../../redux/Groups/groupsActions';
import {Role} from '../../../items/groups/settings/Role';

const SelectMemberRoleModal = ({modal, setModal, group, member, setMember}) => {

  const onRole = (role) => {
    setMember({...member, role});
    setModal(false);
  };

  return (
    <CustomChoiceModal modal={modal} setModal={setModal}>
      <FlatList
        data={group?.roles}
        renderItem={({item}) => <Role item={item} role={member?.role} onRole={onRole}/>}
        keyExtractor={(_, index) => index.toString()}
      />
    </CustomChoiceModal>
  );
};

const getState = (state) => ({
  group: state.groups.group,
  member: state.groups.member,
});

export default connect(
  getState,
  {
    setMember,
  },
)(SelectMemberRoleModal);
