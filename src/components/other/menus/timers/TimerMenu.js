import React, {forwardRef, useState} from 'react';
import {useAlerts} from '../../../../providers/AlertsProvider';
import {connect} from 'react-redux';
import {useTimers} from '../../../../providers/timers/TimersProvider';
import {useTranslation} from 'react-i18next';
import {navigate} from '../../../navigation/RootNavigation';
import {setTimer} from '../../../../redux/Timers/timersActions';
import {CustomMenu} from '../../../common/menus/CustomMenu';
import {CustomMenuItem} from '../../../common/menus/CustomMenuItem';
import {useThemes} from '../../../../providers/ThemeProvider';

const TimerMenu = forwardRef(({timer, navigation, setTimer}, ref) => {
  const {theme} = useThemes();
  const {t} = useTranslation();
  const {setConfirmModal} = useAlerts();
  const {deleteEvent} = useTimers();
  const [menu, setMenu] = useState(false);

  const onClose = () => setMenu(false);

  const onDelete = () => {
    onClose();
    setConfirmModal({
      action: async () => await deleteEvent(timer.id),
      content: {...t('timers.timerDeleteModal'), confirmButton: t('common.delete')},
    });
  };

  const onEdit = () => {
    onClose();
    setTimer({...timer, ref, editMode: true});
    navigate('CreateTimer');
  };

  return (
    <CustomMenu menu={menu} setMenu={setMenu} color={theme.text}>
      <CustomMenuItem onPress={onEdit} title={t('common.change')}/>
      <CustomMenuItem onPress={onDelete} title={t('common.delete')}/>
    </CustomMenu>
  );
});


export default connect(
  null,
  {
    setTimer,
  },
  null,
  {forwardRef: true},
)
(TimerMenu);
