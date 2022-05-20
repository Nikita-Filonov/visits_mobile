import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {CustomMenu} from '../../../common/menus/CustomMenu';
import {CustomMenuItem} from '../../../common/menus/CustomMenuItem';
import {useGroups} from '../../../../Providers/Groups/GroupsProvider';
import {useAlerts} from '../../../../Providers/AlertsProvider';
import {
  setCreateMemberModal,
  setGroup,
  setMember,
} from '../../../../Redux/Groups/groupsActions';
import {useGroupPermissions} from '../../../../Providers/Groups/GroupPermissionsProvider';
import {MEMBER} from '../../../../utils/permissions/Groups';

const MemberMenu = ({member, group, setMember, setCreateMemberModal}) => {
  const {t} = useTranslation();
  const {setConfirmModal} = useAlerts();
  const {isAllowed} = useGroupPermissions();
  const {updateMember, removeMember} = useGroups();
  const [menu, setMenu] = useState(false);

  const onClose = () => setMenu(false);

  const onDelete = async () => {
    onClose();
    setConfirmModal({
      action: async () => await removeMember(group.id, member.id),
      content: {
        ...t('groups.settings.members.deleteMemberModal'),
        confirmButton: t('common.delete'),
      },
    });
  };

  const onNotify = async () => {
    onClose();
    await updateMember(group.id, member.id, {notify: !member.notify});
  };

  const onChange = () => {
    onClose();
    setMember({...member, editMode: true});
    setCreateMemberModal(true);
  };

  return (
    <CustomMenu menu={menu} setMenu={setMenu}>
      <CustomMenuItem
        disabled={!isAllowed([MEMBER.update])}
        onPress={onChange}
        title={t('common.change')}
      />
      <CustomMenuItem
        disabled={!isAllowed([MEMBER.update])}
        onPress={onNotify}
        title={
          member?.notify
            ? t('groups.enableNotifications')
            : t('groups.disableNotifications')
        }
      />
      <CustomMenuItem
        disabled={!isAllowed([MEMBER.delete])}
        onPress={onDelete}
        title={t('common.delete')}
      />
    </CustomMenu>
  );
};

const getState = state => ({group: state.groups.group});

export default connect(getState, {
  setGroup,
  setMember,
  setCreateMemberModal,
})(MemberMenu);
