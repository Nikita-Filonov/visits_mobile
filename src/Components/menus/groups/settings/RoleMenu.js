import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {CustomMenu} from '../../../common/menus/CustomMenu';
import {CustomMenuItem} from '../../../common/menus/CustomMenuItem';
import {useGroups} from '../../../../Providers/groups/GroupsProvider';
import {useAlerts} from '../../../../Providers/AlertsProvider';
import {
  setCreateRoleModal,
  setRole,
} from '../../../../Redux/Groups/groupsActions';
import {useGroupPermissions} from '../../../../Providers/groups/GroupPermissionsProvider';
import {ROLE} from '../../../../utils/permissions/Groups';

const RoleMenu = ({role, group, setRole, setCreateRoleModal}) => {
  const {t} = useTranslation();
  const {setConfirmModal} = useAlerts();
  const {isAllowed} = useGroupPermissions();
  const {deleteRole} = useGroups();
  const [menu, setMenu] = useState(false);

  const onClose = () => setMenu(false);

  const onDelete = async () => {
    onClose();
    setConfirmModal({
      content: {
        ...t('groups.settings.roles.deleteRoleModal'),
        confirmButton: t('common.delete'),
      },
      action: async () => await deleteRole(group?.id, role?.id),
    });
  };

  const onChange = () => {
    onClose();
    setRole({...role, editMode: true});
    setCreateRoleModal(true);
  };

  return (
    <CustomMenu menu={menu} setMenu={setMenu}>
      <CustomMenuItem
        disabled={!isAllowed([ROLE.update])}
        onPress={onChange}
        title={t('common.change')}
      />
      <CustomMenuItem
        disabled={!isAllowed([ROLE.delete])}
        onPress={onDelete}
        title={t('common.delete')}
      />
    </CustomMenu>
  );
};

const getState = state => ({group: state.groups.group});

export default connect(getState, {
  setRole,
  setCreateRoleModal,
})(RoleMenu);
