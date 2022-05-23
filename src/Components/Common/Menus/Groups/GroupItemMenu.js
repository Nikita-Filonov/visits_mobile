import React, {useState} from 'react';
import {CustomMenu} from '../CustomMenu';
import {CustomMenuItem} from '../CustomMenuItem';
import {connect} from 'react-redux';
import {useThemes} from '../../../../Providers/ThemeProvider';
import {useAlerts} from '../../../../Providers/AlertsProvider';
import {navigate} from '../../../Navigation/RootNavigation';
import {usePermissions} from '../../../../Providers/PermissionsProvider';
import {GROUP_PERMISSIONS} from '../../../../Utils/Helpers/Permissions';
import {setGroup} from '../../../../Redux/Groups/groupsActions';
import {useGroups} from '../../../../Providers/Groups/GroupsProvider';

const GroupItemMenu = ({group, setGroupStore}) => {
  const [menu, setMenu] = useState(false);
  const {theme} = useThemes();
  const {setConfirmModal} = useAlerts();
  const {deleteGroup} = useGroups();
  const {isAllowed} = usePermissions();

  const onClose = () => setMenu(false);

  const onEdit = async () => {
    onClose();
    setGroupStore({...group, editMode: true});
    navigate('CreateGroup');
  };

  const onDelete = async () => {
    onClose();
    setConfirmModal({
      action: async () => await deleteGroup(group.id),
      modal: true,
      content: {
        title: 'Удалить группу',
        description:
          'Вы действительно хотите удалить группу? Отменить это действие будет невозможно',
        confirmButton: 'Удалить',
      },
    });
  };

  return (
    <CustomMenu menu={menu} setMenu={setMenu} color={theme.text}>
      <CustomMenuItem
        onPress={onEdit}
        title={'Изменить'}
        disabled={!isAllowed([GROUP_PERMISSIONS.update])}
      />
      <CustomMenuItem
        onPress={onDelete}
        title={'Удалить'}
        color={theme.colors.error}
        disabled={!isAllowed([GROUP_PERMISSIONS.delete])}
      />
    </CustomMenu>
  );
};

export default connect(null, {setGroupStore: setGroup})(GroupItemMenu);
