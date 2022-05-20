import React from 'react';
import {ConfirmLayout} from '../../../components/layouts/ConfirmLayout';
import {useSettings} from '../../../providers/SettingsProvider';
import {connect} from 'react-redux';
import {setComment} from '../../../redux/Settings/settingsActions';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {CustomText} from '../../../components/common/CustomText';
import {comp} from '../../../styles/Blocks';
import {TextField} from '../../../components/common/inputs/TextField';

const CreateComment = ({navigation, comment, setComment}) => {
  const {t} = useTranslation();
  const {request, settings, updateSettings} = useSettings();

  const onBack = () => {
    navigation.goBack();
    setComment({text: '', editMode: false});
  };

  const createComment = async () => {
    if (comment?.editMode) {
      const comments = settings?.comments?.map(com => com.id === comment.id ? {...com, text: comment?.text} : com);
      await updateSettings({comments});
    } else {
      let commentId = Math.max(...settings.comments.map(comment => comment.id), 0);
      await updateSettings({comments: [...settings.comments, {text: comment?.text, id: ++commentId}]});
    }
    onBack();
  };

  return (
    <ConfirmLayout
      loading={request}
      onConfirm={createComment}
      disabled={comment?.text?.length === 0}
      title={t(`settings.comments.createCommentModal.${comment?.editMode ? 'editTitle' : 'createTitle'}`)}
    >
      <ScrollView>
        {!comment?.editMode && <CustomText style={comp.smallText}>
          {t(`settings.comments.createCommentModal.description`)}
        </CustomText>}
        <TextField
          multiline
          style={comp.input}
          value={comment?.text}
          label={t('settings.comments.createCommentModal.textTextareaLabel')}
          placeholder={t('settings.comments.createCommentModal.textTextareaPlaceholder')}
          onChangeText={text => setComment({...comment, text})}
        />
      </ScrollView>
    </ConfirmLayout>
  );
};

const getState = (state) => ({comment: state.settings.comment});

export default connect(getState, {setComment})(CreateComment);
