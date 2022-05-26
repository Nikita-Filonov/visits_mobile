import {useCallback, useState} from 'react';
import moment from 'moment';
import {PICKER_DATETIME_FORMAT} from '../Constants';
import {isDateTimeValid} from '../Helpers/Validators';

export const useDatetimePicker = onChange => {
  const [error, setError] = useState(false);
  const [picker, setPicker] = useState(false);

  const onOpenPicker = () => setPicker(true);
  const onClosePicker = () => setPicker(false);

  const onPicker = async e => {
    onClosePicker();
    const timestamp = e.nativeEvent.timestamp;
    timestamp && onChange(new Date(timestamp));
  };

  const onChangePickerText = useCallback(
    async (value: Date, text: string, format: string) => {
      const safeDateTime = moment(value || new Date()).format(format);
      const isValid = isDateTimeValid(safeDateTime);
      setError(!isValid);
      const datetime = moment(safeDateTime, PICKER_DATETIME_FORMAT).toDate();
      isValid && onChange(datetime);
    },
    [],
  );

  return {error, picker, onPicker, onChangePickerText, onOpenPicker};
};
