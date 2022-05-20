import React from 'react';
import {TextInput} from 'react-native-paper';
import {Touchable} from '../Touchable';
import {TextField} from '../../common/inputs/TextField';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import TextInputMask from 'react-native-masked-text/lib/text-input-mask';
import DateTimePicker from '@react-native-community/datetimepicker';
import {PICKER_DATE_FORMAT, PICKER_TIME_FORMAT} from '../../../utils/Constants';
import {useTimerPickers} from '../../../utils/hooks/TimerHooks';
import {CreateTimerStyles} from '../../../styles/Screens';
import {comp} from '../../../styles/Blocks';

export const TimerDatePicker = ({value, onChange}) => {
  const {t} = useTranslation();
  const {picker, error, onChangePickerText, onPicker, onOpenPicker} = useTimerPickers(onChange);

  const onChangeDateText = async (text) => await onChangePickerText(value, text, `${text} ${PICKER_TIME_FORMAT}`);

  return (
    <React.Fragment>
      <TextField
        error={error}
        value={value ? moment(value).format(PICKER_DATE_FORMAT) : value}
        onChangeText={onChangeDateText}
        style={[CreateTimerStyles.inputWrapper, comp.input]}
        label={t('timers.createTimerModal.killedInputLabel_date')}
        placeholder={PICKER_DATE_FORMAT}
        right={
          <TextInput.Icon
            name={() => <Touchable action={onOpenPicker} name={'calendar-blank-outline'} type={'material-community'}/>}
          />
        }
        render={props => <TextInputMask {...props} type={'datetime'} options={{format: PICKER_DATE_FORMAT}}/>}
      />
      {picker && <DateTimePicker
        is24Hour={true}
        display="default"
        mode={'date'}
        value={value || new Date()}
        onChange={onPicker}
      />}
    </React.Fragment>
  );
};
