import React, {useMemo, useState} from 'react';
import {FullScreenModal} from '../../common/modals/FullScreenModal';
import {FullScreenModalConfirmLayout} from '../../layouts/FullScreenModalConfirmLayout';
import {useTranslation} from 'react-i18next';
import {CustomText} from '../../common/CustomText';
import {TextField} from '../../common/inputs/TextField';
import {useAlerts} from '../../../providers/AlertsProvider';
import {comp} from '../../../styles/Blocks';
import {post} from '../../../utils/api/Fetch';


export const AskQuestionModal = ({modal, setModal}) => {
  const {t} = useTranslation();
  const {setAlert} = useAlerts();
  const [request, setRequest] = useState(false);
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [feedback, setFeedback] = useState('');

  const onClose = () => setModal(false);

  const onSend = async () => {
    setRequest(true);
    const {error, json} = await post('api/v1/questions/', {subject, question, feedback});
    setAlert(error ? json : {message: t('help.askQuestionModal.alert'), level: 'success'});
    onClose();
    setSubject('');
    setQuestion('');
    setFeedback('');
    setRequest(false);
  };

  const isDisabled = useMemo(() =>
    question.length === 0 || feedback.length === 0 || subject.length === 0, [question, feedback, subject]);

  return (
    <FullScreenModal modal={modal} setModal={setModal}>
      <FullScreenModalConfirmLayout
        title={t('help.askQuestion')}
        disabled={isDisabled}
        onConfirm={onSend}
        onClose={onClose}
        loading={request}
      >
        <CustomText style={comp.smallText}>{t('help.askQuestionModal.description')}</CustomText>

        <TextField
          style={comp.input}
          value={subject}
          onChangeText={setSubject}
          label={t('help.askQuestionModal.subject')}
        />
        <TextField
          style={comp.input}
          value={feedback}
          onChangeText={setFeedback}
          label={t('help.askQuestionModal.feedback')}
        />
        <TextField
          multiline
          style={comp.input}
          value={question}
          onChangeText={setQuestion}
          label={t('help.askQuestionModal.question')}
        />
      </FullScreenModalConfirmLayout>
    </FullScreenModal>
  );
};
