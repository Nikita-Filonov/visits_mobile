import React from 'react';
import {Appbar} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {useAlerts} from '../../../providers/AlertsProvider';
import {useTimers} from '../../../providers/timers/TimersProvider';
import {AppBar} from '../../common/AppBar';
import {useTranslation} from 'react-i18next';
import {useTimerPayload} from '../../../utils/hooks/TimerHooks';

export const TimersToolbar = ({setPage, selectedTimers, setSelectedTimers}) => {
  const {t} = useTranslation();
  const {dropPayload} = useTimerPayload();
  const {setConfirmModal} = useAlerts();
  const {deleteTimers, updateEvents} = useTimers();

  const onDelete = () => setConfirmModal({
    action: async () => {
      setPage(0);
      setSelectedTimers([]);
      await deleteTimers(selectedTimers);
    },
    content: {...t('timers.timersDeleteModal'), confirmButton: t('common.delete')},
  });

  const onDrop = async () => setConfirmModal({
    action: async () => {
      await updateEvents(selectedTimers, dropPayload);
      setSelectedTimers([]);
    },
    content: {...t('timers.timersDropModal'), confirmButton: t('common.reset')},
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
