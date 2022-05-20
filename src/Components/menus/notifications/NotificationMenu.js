import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {CustomMenu} from '../../common/menus/CustomMenu';
import {CustomMenuItem} from '../../common/menus/CustomMenuItem';
import {useNotifications} from '../../../Providers/NotificationProvider';
import {useAlerts} from '../../../Providers/AlertsProvider';
import {connect} from 'react-redux';
import {setTimer} from '../../../Redux/Timers/timersActions';
import {navigate} from '../../Navigation/RootNavigation';
import {useGroups} from '../../../Providers/groups/GroupsProvider';

const NotificationMenu = ({notification, setTimer}) => {
  const {t} = useTranslation();
  const {setConfirmModal} = useAlerts();
  const {getGroup} = useGroups();
  const {deleteNotification} = useNotifications();
  const [menu, setMenu] = useState(false);

  const onClose = () => setMenu(false);

  const onView = async () => {
    onClose();
    if (!notification?.group) {
      navigate('Timers');
    } else {
      await getGroup(notification?.group);
      navigate('Groups', {screen: 'GroupTimers'});
    }
    notification?.timer?.id && setTimer(notification.timer);
  };

  const onDelete = async () => {
    onClose();
    setConfirmModal({
      action: async () => await deleteNotification(notification.id),
      content: {
        ...t('notifications.deleteNotificationModal'),
        confirmButton: t('common.delete'),
      },
    });
  };

  return (
    <React.Fragment>
      <CustomMenu menu={menu} setMenu={setMenu}>
        <CustomMenuItem onPress={onView} title={t('notifications.view')} />
        <CustomMenuItem onPress={onDelete} title={t('common.delete')} />
      </CustomMenu>
    </React.Fragment>
  );
};

export default connect(null, {setTimer})(NotificationMenu);
