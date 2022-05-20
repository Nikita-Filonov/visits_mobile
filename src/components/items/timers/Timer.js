import React, {memo} from 'react';
import {useTimers} from '../../../providers/timers/TimersProvider';
import 'moment-timezone';
import 'moment-duration-format';
import {useAlerts} from '../../../providers/AlertsProvider';
import {CommonTimer} from './CommonTimer';
import {useTimer} from '../../../providers/timers/TimerProvider';
import {useTranslation} from 'react-i18next';
import {useTimerPayload} from '../../../utils/hooks/TimerHooks';
import TimerMenu from '../../other/menus/timers/TimerMenu';
import {UnderTimerComment} from '../../blocks/UnderTimerComment';

const Timer = ({item, selectedTimers, onSelectTimer}) => {
  const {t} = useTranslation();
  const {updateEvent} = useTimers();
  const {setConfirmModal} = useAlerts();
  const {counterRef, setCountDown} = useTimer();
  const {dropPayload, toKilledPayload} = useTimerPayload();

  const onDrop = () => setConfirmModal({
    action: async () => {
      clearInterval(counterRef.current);
      setCountDown(t('timers.noTime'));
      await updateEvent(item.id, dropPayload);
    },
    content: t('timers.timerDropModal'),
  });


  const onKilled = async () => {
    clearInterval(counterRef.current);
    await updateEvent(item.id, toKilledPayload(item));
  };

  const onDropComment = async () => await updateEvent(item.id, {comment: null});

  return (
    <CommonTimer
      item={item}
      onDrop={onDrop}
      onKilled={onKilled}
      selectedTimers={selectedTimers}
      onSelectTimer={onSelectTimer}
      menu={<TimerMenu timer={item} ref={counterRef}/>}
      comment={<UnderTimerComment item={item} store={'timers'} onDropComment={onDropComment}/>}
    />
  );
};


export default memo(Timer);
