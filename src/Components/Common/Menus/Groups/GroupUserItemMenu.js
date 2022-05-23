import React, {useState} from 'react';
import {CustomMenu} from '../CustomMenu';
import {CustomMenuItem} from '../CustomMenuItem';
import {useThemes} from '../../../../Providers/ThemeProvider';
import {useAlerts} from '../../../../Providers/AlertsProvider';
import {usePermissions} from '../../../../Providers/PermissionsProvider';
import {GROUP_USER_PERMISSIONS} from '../../../../Utils/Helpers/Permissions';
import type {GroupUser} from '../../../../Models/GroupUser';
import {useGroupUsers} from '../../../../Providers/Groups/GroupUsersProvider';

type Props = {
  groupUser: GroupUser,
};

export const GroupUserItemMenu = (props: Props) => {
  const {groupUser} = props;
  const [menu, setMenu] = useState(false);
  const {theme} = useThemes();
  const {setConfirmModal} = useAlerts();
  const {deleteGroupUser} = useGroupUsers();
  const {isAllowed} = usePermissions();

  const onClose = () => setMenu(false);

  const onDelete = async () => {
    onClose();
    setConfirmModal({
      action: async () => await deleteGroupUser(groupUser.id),
      modal: true,
      content: {
        title: 'Удалить пользователя из группы',
        description:
          'Вы действительно хотите удалить пользователя? Отменить это действие будет невозможно',
        confirmButton: 'Удалить',
      },
    });
  };

  return (
    <CustomMenu menu={menu} setMenu={setMenu} color={theme.text}>
      <CustomMenuItem
        onPress={onDelete}
        title={'Удалить'}
        color={theme.colors.error}
        disabled={!isAllowed([GROUP_USER_PERMISSIONS.delete])}
      />
    </CustomMenu>
  );
};
