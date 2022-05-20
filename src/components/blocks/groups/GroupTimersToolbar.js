import React from 'react';
import {Appbar} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {useAlerts} from '../../../providers/AlertsProvider';
import {useGroupTimers} from '../../../providers/groups/GroupTimersProvider';
import {useTimerPayload} from '../../../utils/hooks/TimerHooks';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {AppBar} from '../../common/AppBar';

const GroupTimersToolbar = ({setPage, group, selectedTimers, setSelectedTimers}) => {
  const {t} = useTranslation();
  const {setConfirmModal} = useAlerts();
  const {dropPayload} = useTimerPayload();
  const {deleteGroupTimers, updateGroupTimers} = useGroupTimers();

  const onDelete = () => setConfirmModal({
    action: async () => {
      setPage(0);
      setSelectedTimers([]);
      await deleteGroupTimers(group.id, selectedTimers);
    },
    content: {...t('groups.timers.timersDeleteModal'), confirmButton: t('common.delete')},
  });


  const onDrop = async () => setConfirmModal({
    action: async () => {
      await updateGroupTimers(group.id, selectedTimers, dropPayload);
      setSelectedTimers([]);
    },
    content: {...t('groups.timers.timersDropModal'), confirmButton: t('common.reset')},
  });

  return (
    <AppBar>
      <Appbar.Action
        animated={false}
        onPress={() => setSelectedTimers([])}
        icon={() => <Icon name={'close'} type={'material-community'} color={'#FFFFFF'}/>}
      />
      <Appbar.Content title={selectedTimers.length}/>
      <Appbar.Action
        animated={false}
        onPress={onDrop}
        icon={() => <Icon name={'alarm-snooze'} type={'material-community'} color={'#FFFFFF'}/>}
      />
      <Appbar.Action
        animated={false}
        onPress={onDelete}
        icon={() => <Icon name={'delete'} type={'material-community'} color={'#FFFFFF'}/>}
      />
    </AppBar>
  );
};

const getState = (state) => ({group: state.groups.group});

export default connect(getState, null)(GroupTimersToolbar);
