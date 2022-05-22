import React from 'react';
import {TextField} from './TextField';
import {TextInput} from 'react-native-paper';
import {comp} from '../../../Styles/Blocks';
import {Touchable} from '../../Blocks/Touchable';

export const TelegramTextField = ({
  value,
  onChangeText,
  label,
  sync,
  onDelete,
}) => {
  return (
    <TextField
      left={sync && <TextInput.Icon name={() => sync} />}
      label={label}
      value={value}
      onChangeText={onChangeText}
      style={comp.input}
      right={
        <TextInput.Icon
          name={() => (
            <Touchable
              action={onDelete}
              name={'delete'}
              type={'material-community'}
            />
          )}
        />
      }
    />
  );
};