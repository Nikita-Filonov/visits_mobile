import React from 'react';
import {CustomChoiceModal} from '../../../common/modals/CustomModal';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {Member} from '../../../items/groups/settings/Member';

const SelectGroupCreatorModal = ({modal, setModal, group, creator, setCreator}) => {

  const onCreator = (creator) => {
    setCreator(creator);
    setModal(false);
  };

  return (
    <CustomChoiceModal modal={modal} setModal={setModal}>
      <FlatList
        data={group?.members}
        renderItem={({item}) => <Member item={item} creator={creator} onCreator={onCreator}/>}
        keyExtractor={(_, index) => index.toString()}
      />
    </CustomChoiceModal>
  );
};

const getState = (state) => ({
    group: state.groups.group,
  }
);


export default connect(
  getState,
  null,
)(SelectGroupCreatorModal);
