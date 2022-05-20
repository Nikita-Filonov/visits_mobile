import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {TextField} from '../../common/inputs/TextField';
import {useTranslation} from 'react-i18next';
import {Touchable} from '../Touchable';
import {SelectCommentModal} from '../../modals/timers/SelectCommentModal';

export const CommentSelect = ({comment, setComment}) => {
  const {t} = useTranslation();
  const [selectCommentModal, setSelectCommentModal] = useState(false);

  const onSelectComment = () => setSelectCommentModal(true);

  return (
    <React.Fragment>
      <TextField
        value={comment}
        onChangeText={setComment}
        multiline={true}
        label={t('timers.comment.commentInputLabel')}
        right={
          <TextInput.Icon name={() =>
            <Touchable action={onSelectComment} name={'comment-outline'} type={'material-community'}/>
          }/>
        }
      />
      <SelectCommentModal
        modal={selectCommentModal}
        setModal={setSelectCommentModal}
        setComment={setComment}
      />
    </React.Fragment>
  );
};
