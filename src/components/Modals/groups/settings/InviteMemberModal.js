import React, {useMemo, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useGroups} from '../../../../Providers/Groups/GroupsProvider';
import {comp} from '../../../../Styles/Blocks';
import {connect} from 'react-redux';
import {
  setCreateMemberModal,
  setMember,
} from '../../../../Redux/Groups/groupsActions';
import {FullScreenModal} from '../../../common/modals/FullScreenModal';
import {FullScreenModalConfirmLayout} from '../../../Layouts/FullScreenModalConfirmLayout';
import {useTranslation} from 'react-i18next';
import {TextField} from '../../../common/inputs/TextField';
import SelectMemberRoleModal from './SelectMemberRoleModal';
import {Touchable} from '../../../blocks/Touchable';
import {TextInput} from 'react-native-paper';
import {GROUPS_INITIAL_STATE} from '../../../../Redux/Groups/initialState';

const InviteMemberModal = ({
  createMemberModal,
  setCreateMemberModal,
  group,
  member,
  setMember,
}) => {
  const {t} = useTranslation();
  const {request, inviteMember, updateMember} = useGroups();
  const [selectRoleModal, setSelectRoleModal] = useState(false);

  const onClose = () => {
    setCreateMemberModal(false);
    setMember(GROUPS_INITIAL_STATE.member);
  };

  const onInvite = async () =>
    (member?.editMode
      ? updateMember(group.id, member.id, {role: member?.role?.id})
      : inviteMember(group.id, {
          role: member?.role?.id,
          username: member?.username,
        })
    ).then(() => onClose());

  const getRoleName = roleId => group?.roles?.find(r => r.id === roleId)?.name;
  const onSelectRole = () => setSelectRoleModal(true);
  const disabled = useMemo(
    () => !member?.role?.id || member?.username?.length === 0,
    [member],
  );

  return (
    <FullScreenModal modal={createMemberModal} onClose={onClose}>
      <FullScreenModalConfirmLayout
        loading={request}
        onClose={onClose}
        title={t(
          `groups.settings.members.${
            member.editMode ? 'editMember' : 'addMember'
          }`,
        )}
        onConfirm={onInvite}
        disabled={disabled}>
        <ScrollView>
          {!member.editMode && (
            <TextField
              value={member?.username}
              onChangeText={username => setMember({...member, username})}
              label={t('groups.settings.members.member')}
              placeholder={t('registration.username')}
            />
          )}
          <TouchableOpacity onPress={onSelectRole}>
            <TextField
              style={comp.input}
              editable={false}
              value={getRoleName(member?.role?.id)}
              label={t('groups.settings.members.role')}
              right={
                <TextInput.Icon
                  name={() => (
                    <Touchable
                      action={onSelectRole}
                      name={'person-add-alt'}
                      type={'material'}
                    />
                  )}
                />
              }
            />
          </TouchableOpacity>
        </ScrollView>
        <SelectMemberRoleModal
          modal={selectRoleModal}
          setModal={setSelectRoleModal}
        />
      </FullScreenModalConfirmLayout>
    </FullScreenModal>
  );
};

const getState = state => ({
  group: state.groups.group,
  member: state.groups.member,
  createMemberModal: state.groups.createMemberModal,
});

export default connect(getState, {
  setMember,
  setCreateMemberModal,
})(InviteMemberModal);
