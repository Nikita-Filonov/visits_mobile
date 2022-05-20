import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import moment from 'moment';
import {useSettings} from '../SettingsProvider';
import {SetAudio} from '../../utils/Utils';
import {baseUrl} from '../../utils/Links';
import {useTranslation} from 'react-i18next';
import {useTimerBackground} from '../../utils/hooks/TimerHooks';
import {DATETIME_TIMER_FORMAT} from '../../utils/Constants';


const TimerContext = React.createContext(null);

const TimerProvider = ({children, item}) => {
  const {t} = useTranslation();
  const counterRef = useRef(null);
  const {settings} = useSettings();
  const [playing, toggle] = SetAudio(baseUrl + settings.audio, settings.volume);
  const [missed, setMissed] = useState(item.missed);
  const [countDown, setCountDown] = useState(item.killed ? null : t('timers.noTime'));
  const [killed, setKilled] = useState(item.killed ? moment(item.killed) : t('timers.noTime'));
  const [span, setSpan] = useState(item.killed
    ? moment(item.killed).add(item.monster.delta, 'minutes')
    : t('timers.noTime'),
  );
  const {background} = useTimerBackground(item.id, countDown);

  useEffect(() => {
    (async () => {
        clearInterval(counterRef.current);
        const currentSpan = item.killed ? moment(item.killed).add(item.monster.delta, 'minutes') : t('timers.noTime');
        const currentKilled = item.killed ? moment(item.killed) : t('timers.noTime');

        setSpan(currentSpan);
        setKilled(currentKilled);
        setMissed(item.missed);

        !item.killed && setCountDown(t('timers.noTime'));
        await getDifference(currentSpan);

        counterRef.current = setInterval(async () => await getDifference(currentSpan), 1000);
        return () => {
          clearInterval(counterRef.current);
        };
      }
    )();
  }, [item.killed, item.monster, t]);

  const getDifference = async (span) => {
    let delta;

    if (typeof span !== 'string') {
      const now = moment(Date.now());
      const duration = moment.duration(span.diff(now));

      const sum = duration.days() + duration.hours() + duration.minutes() + duration.seconds();

      if (duration.days() === 0 && duration.hours() === 0) {
        if (duration.minutes() === settings.app_notify && duration.seconds() === 0) {
          toggle();
        }
      }

      if (sum === 0) {
        toggle();
        clearInterval(counterRef.current);
        setCountDown(`00:00:00`);
        setMissed(missed + 1);
        return;
      }

      if (sum < 0) {
        clearInterval(counterRef.current);
        setCountDown(`00:00:00`);
        return;
      }

      if (duration.days()) {
        delta = duration.format('DD:hh:mm:ss', {trim: false});
      } else {
        delta = duration.format('hh:mm:ss', {trim: false});
      }
      setCountDown(delta);
    }
  };

  const killedCount = useMemo(() => item.killed
    ? moment(killed).format(DATETIME_TIMER_FORMAT)
    : t('timers.noTime'), [item.killed, killed, t]);

  const spanCount = useMemo(() => item.killed
    ? moment(span).format(DATETIME_TIMER_FORMAT)
    : t('timers.noTime'), [item.killed, span, t]);

  return (
    <TimerContext.Provider value={{counterRef, missed, countDown, background, killedCount, spanCount, setCountDown}}>
      {children}
    </TimerContext.Provider>
  );
};

const useTimer = () => {
  const event = useContext(TimerContext);
  if (event == null) {
    throw new Error('useTimer() called outside of a TimerProvider?');
  }
  return event;
};

export {TimerProvider, useTimer};
