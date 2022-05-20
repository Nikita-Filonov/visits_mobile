import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {CustomMenu} from '../../common/menus/CustomMenu';
import {CustomMenuItem} from '../../common/menus/CustomMenuItem';
import {useNotifications} from '../../../Providers/NotificationProvider';

export const NotificationsHeaderMenu = () => {
  const {t} = useTranslation();
  const {clearNotifications} = useNotifications();
  const [menu, setMenu] = useState(false);

  const onClose = () => setMenu(false);

  const onClear = async () => {
    onClose();
    await clearNotifications();
  };

  return (
    <React.Fragment>
      <CustomMenu menu={menu} setMenu={setMenu}>
        <CustomMenuItem
          onPress={onClear}
          title={t('notifications.clearNotificationsButton')}
        />
      </CustomMenu>
    </React.Fragment>
  );
};
