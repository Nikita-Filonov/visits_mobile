import React, {forwardRef, useState} from 'react';
import {connect} from 'react-redux';
import {CustomMenu} from '../../../../common/menus/CustomMenu';
import {CustomMenuItem} from '../../../../common/menus/CustomMenuItem';
import {useThemes} from '../../../../../providers/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {navigate} from '../../../../navigation/RootNavigation';
import {useAlerts} from '../../../../../providers/AlertsProvider';
import {useGroupTimers} from '../../../../../providers/groups/GroupTimersProvider';
import {setGroupTimer} from '../../../../../redux/GroupTimers/groupTimersActions';

const GroupTimerMenu = forwardRef(({timer, group, setGroupTimer}, ref) => {
  const {theme} = useThemes();
  const {t} = useTranslation();
  const {setConfirmModal} = useAlerts();
  const {deleteEvent} = useGroupTimers();
  const [menu, setMenu] = useState(false);

  const onClose = () => setMenu(false);

  const onDelete = async () => {
    onClose();
    setConfirmModal({
      action: async () => await deleteEvent(group.id, timer.id),
      content: {...t('groups.timers.timerDeleteModal'), confirmButton: t('common.delete')},
    });
  };

  const onEdit = async () => {
    onClose();
    setGroupTimer({...timer, ref, editMode: true});
    navigate('CreateGroupTimer');
  };

  const onHistory = () => {
    onClose();
    setGroupTimer(timer);
    navigate('TimerHistory');
  };

  return (
    <CustomMenu menu={menu} setMenu={setMenu} color={theme.text}>
      <CustomMenuItem onPress={onEdit} title={t('common.change')}/>
      <CustomMenuItem onPress={onDelete} title={t('common.delete')}/>
      <CustomMenuItem onPress={onHistory} title={t('common.history')}/>
    </CustomMenu>
  );
});

const getState = (state) => ({group: state.groups.group});

export default connect(
  getState,
  {
    setGroupTimer,
  },
  null,
  {forwardRef: true},
)(GroupTimerMenu);
