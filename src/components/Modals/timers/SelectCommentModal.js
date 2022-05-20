import React from 'react';
import {CustomChoiceModal} from '../../common/modals/CustomModal';
import {FlatList} from 'react-native';
import {useSettings} from '../../../providers/SettingsProvider';
import {Comment} from '../../items/timers/Comment';
import {Divider} from 'react-native-paper';

export const SelectCommentModal = ({modal, setModal, setComment}) => {
  const {settings} = useSettings();

  const onComment = (comment) => {
    setComment(comment);
    setModal(false);
  };

  return (
    <CustomChoiceModal modal={modal} setModal={setModal}>
      <FlatList
        ItemSeparatorComponent={() => <Divider/>}
        data={settings?.comments || []}
        renderItem={({item}) => <Comment item={item} onComment={onComment}/>}
        keyExtractor={(_, index) => index.toString()}
      />
    </CustomChoiceModal>
  );
};
