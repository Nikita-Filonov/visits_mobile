import React, {useCallback, useEffect, useState} from 'react';
import {useThemes} from '../../providers/ThemeProvider';
import {useSettings} from '../../providers/SettingsProvider';
import {dropTime, isDateTimeValid, serverTime} from '../Utils';
import moment from 'moment';
import {PICKER_DATETIME_FORMAT} from '../Constants';
import {useSelector} from 'react-redux';


export const useTimerPayload = () => {
  const {settings} = useSettings();

  const toKilledPayload = (item) => ({
    killed: dropTime(),
    missed: settings?.drop_missed ? 0 : item?.missed,
    comment: null,
  });

  const toUpdatePayload = (timer) => ({
    killed: serverTime(timer?.killed),
    monster: timer?.monster?.id,
    missed: 0,
    comment: timer?.comment,
  });

  const toCreatePayload = (timer) => ({
    killed: serverTime(timer?.killed),
    monster: timer?.monster?.id,
    comment: timer?.comment,
  });

  const dropPayload = {killed: null, missed: 0, comment: null};


  return {toKilledPayload, toUpdatePayload, toCreatePayload, dropPayload};
};

export const useTimerBackground = (timerId, countDown) => {
  const {theme} = useThemes();
  const [background, setBackground] = useState(null);

  const timer = useSelector(state => state.timers.timer);

  useEffect(() => {
    const safeBackground = (countDown === `00:00:00`) // if count down is 00:00:00
      ? (theme.mode === 'dark' ? '#160B0B' : '#FFD9D9') // then we going to choose red span background
      : (timer?.id === timerId) ? (theme.mode === 'dark' ? '#001F00' : '#E0FFE0') : null;
    // else we check if timer should be selected from url query
    setBackground(safeBackground);
  }, [theme.mode, countDown, timer?.id]);

  return {background};
};

export const useTimerPickers = (onChange) => {
  const [error, setError] = useState(false);
  const [picker, setPicker] = useState(false);

  const onOpenPicker = () => setPicker(true);
  const onClosePicker = () => setPicker(false);

  const onPicker = async (e) => {
    onClosePicker();
    const timestamp = e.nativeEvent.timestamp;
    timestamp && onChange(new Date(timestamp));
  };

  const onChangePickerText = useCallback(async (value, text, format) => {
    const safeDateTime = moment(value || new Date()).format(format);
    const isValid = isDateTimeValid(safeDateTime);
    setError(!isValid);
    const datetime = moment(safeDateTime, PICKER_DATETIME_FORMAT).toDate();
    isValid && onChange(datetime);
  }, []);

  return {error, picker, onPicker, onChangePickerText, onOpenPicker};
};
