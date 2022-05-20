import React from 'react';
import {TextInput} from 'react-native-paper';
import {Touchable} from '../Touchable';
import {TextField} from '../../common/inputs/TextField';
import {useTranslation} from 'react-i18next';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import TextInputMask from 'react-native-masked-text/lib/text-input-mask';
import {PICKER_DATE_FORMAT, PICKER_TIME_FORMAT} from '../../../utils/Constants';
import {useTimerPickers} from '../../../utils/hooks/TimerHooks';
import {CreateTimerStyles} from '../../../styles/Screens';

export const TimerTimePicker = ({value, onChange}) => {
  const {t} = useTranslation();
  const {picker, error, onChangePickerText, onPicker, onOpenPicker} = useTimerPickers(onChange);

  const onChangeTimeText = async (text) => await onChangePickerText(value, text, `${PICKER_DATE_FORMAT} ${text}`);

  return (
    <React.Fragment>
      <TextField
        error={error}
        style={CreateTimerStyles.inputWrapper}
        value={value ? moment(value).format(PICKER_TIME_FORMAT) : value}
        onChangeText={onChangeTimeText}
        label={t('timers.createTimerModal.killedInputLabel_time')}
        placeholder={PICKER_TIME_FORMAT}
        right={
          <TextInput.Icon
            name={() => <Touchable action={onOpenPicker} name={'clock-time-five-outline'} type={'material-community'}/>}
          />
        }
        render={props => <TextInputMask {...props} type={'datetime'} options={{format: PICKER_TIME_FORMAT}}/>}
      />
      {picker && <DateTimePicker
        is24Hour={true}
        display="default"
        mode={'time'}
        value={value || new Date()}
        onChange={onPicker}
      />}
    </React.Fragment>
  );
};
