import React from 'react';
import 'moment-timezone';
import 'moment-duration-format';
import {useAlerts} from '../../../providers/AlertsProvider';
import {useGroupTimers} from '../../../providers/groups/GroupTimersProvider';
import {CommonTimer} from './CommonTimer';
import {useTranslation} from 'react-i18next';
import {useTimer} from '../../../providers/timers/TimerProvider';
import {useTimerPayload} from '../../../utils/hooks/TimerHooks';
import {connect} from 'react-redux';
import GroupTimerMenu from '../../other/menus/groups/GroupTimers/GroupTimerMenu';
import {UnderTimerComment} from '../../blocks/UnderTimerComment';

const GroupTimer = ({item, group, onSelectTimer, selectedTimers}) => {
  const {t} = useTranslation();
  const {updateGroupTimer} = useGroupTimers();
  const {setConfirmModal} = useAlerts();
  const {counterRef, setCountDown} = useTimer();
  const {dropPayload, toKilledPayload} = useTimerPayload();


  const onDrop = () => setConfirmModal({
    action: async () => {
      clearInterval(counterRef.current);
      setCountDown(t('timers.noTime'));
      await updateGroupTimer(group.id, item.id, dropPayload);
    },
    content: t('groups.timers.timerDropModal'),
  });

  const onKilled = async () => {
    clearInterval(counterRef.current);
    await updateGroupTimer(group.id, item.id, toKilledPayload(item));
  };

  const onDropComment = async () => await updateGroupTimer(group.id, item.id, {comment: null});

  return (
    <CommonTimer
      item={item}
      onDrop={onDrop}
      onKilled={onKilled}
      selectedTimers={selectedTimers}
      onSelectTimer={onSelectTimer}
      menu={<GroupTimerMenu timer={item} ref={counterRef}/>}
      comment={<UnderTimerComment item={item} store={'groupTimers'} onDropComment={onDropComment}/>}
    />
  );
};


const getState = (state) => ({group: state.groups.group});

export default connect(
  getState,
  null,
)(GroupTimer);
