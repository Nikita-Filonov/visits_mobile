import React, {useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {useGroups} from '../../../../providers/groups/GroupsProvider';
import {comp} from '../../../../styles/Blocks';
import {validateEmail} from '../../../../utils/Utils';
import {Touchable} from '../../../blocks/Touchable';
import Mail from '../../../items/groups/Mail';
import {FullScreenModal} from '../../../common/modals/FullScreenModal';
import {FullScreenModalConfirmLayout} from '../../../Layouts/FullScreenModalConfirmLayout';
import {useTranslation} from 'react-i18next';
import {TextField} from '../../../common/inputs/TextField';
import {TextInput} from 'react-native-paper';
import {ListSeparator} from '../../../common/ListSeparator';
import {connect} from 'react-redux';

const MailInviteModal = ({modal, setModal, group}) => {
  const {t} = useTranslation();
  const {request, mailInvitation} = useGroups();
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [email, setEmail] = useState('');

  const onClose = () => {
    setModal(false);
    setSelectedEmails([]);
    setEmail('');
  };

  const sendInvitations = async () =>
    mailInvitation(group.id, selectedEmails).then(() => onClose());

  const appendEmail = () => {
    if (selectedEmails.includes(email)) {
      setEmail('');
      return;
    }

    setSelectedEmails([...selectedEmails, email]);
    setEmail('');
  };

  const removeEmail = email =>
    setSelectedEmails(selectedEmails.filter(e => e !== email));

  const error = useMemo(
    () => selectedEmails.some(email => !validateEmail(email)),
    [selectedEmails],
  );

  return (
    <FullScreenModal modal={modal} onClose={onClose}>
      <FullScreenModalConfirmLayout
        loading={request}
        onConfirm={sendInvitations}
        disabled={error}
        onClose={onClose}
        title={t('groups.settings.members.mailInviteModal.title')}>
        <TextField
          value={email}
          onChangeText={setEmail}
          label={t('login.email')}
          placeholder={t(
            'groups.settings.members.mailInviteModal.emailInputPlaceholder',
          )}
          right={
            email.length > 0 && (
              <TextInput.Icon
                name={() => (
                  <Touchable
                    action={appendEmail}
                    name={'check'}
                    type={'feather'}
                  />
                )}
              />
            )
          }
        />
        <FlatList
          style={comp.input}
          data={selectedEmails}
          removeClippedSubviews={true}
          ItemSeparatorComponent={ListSeparator}
          renderItem={({item}) => (
            <Mail item={item} removeEmail={removeEmail} />
          )}
          keyExtractor={(item, index) => item + index}
        />
      </FullScreenModalConfirmLayout>
    </FullScreenModal>
  );
};

const getState = state => ({group: state.groups.group});

export default connect(getState, null)(MailInviteModal);
