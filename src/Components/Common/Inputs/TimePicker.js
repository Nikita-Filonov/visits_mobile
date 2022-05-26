import React, {useMemo} from 'react';
import {TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import TextInputMask from 'react-native-masked-text/lib/text-input-mask';
import {PICKER_DATE_FORMAT, PICKER_TIME_FORMAT} from '../../../Utils/Constants';
import {Touchable} from '../../Blocks/Touchable';
import {TextField} from './TextField';
import {useDatetimePicker} from '../../../Utils/Hooks/DatetimePickerHook';
import {comp} from '../../../Styles/Blocks';

export const TimePicker = ({value, onChange, label}) => {
  const {picker, error, onChangePickerText, onPicker, onOpenPicker} =
    useDatetimePicker(onChange);

  const nativeTime = useMemo(
    () => (value ? moment(value, PICKER_TIME_FORMAT) : null),
    [value],
  );

  const onChangeTimeText = async text =>
    await onChangePickerText(nativeTime, text, `${PICKER_DATE_FORMAT} ${text}`);

  return (
    <React.Fragment>
      <TextField
        error={error}
        style={comp.input}
        value={value ? nativeTime.format(PICKER_TIME_FORMAT) : value}
        onChangeText={onChangeTimeText}
        label={label}
        placeholder={PICKER_TIME_FORMAT}
        right={
          <TextInput.Icon
            name={() => (
              <Touchable
                action={onOpenPicker}
                name={'clock-time-five-outline'}
                type={'material-community'}
              />
            )}
          />
        }
        render={props => (
          <TextInputMask
            {...props}
            type={'datetime'}
            options={{format: PICKER_TIME_FORMAT}}
          />
        )}
      />
      {picker && (
        <DateTimePicker
          is24Hour={true}
          display="default"
          mode={'time'}
          value={nativeTime ? nativeTime.toDate() : new Date()}
          onChange={onPicker}
        />
      )}
    </React.Fragment>
  );
};
