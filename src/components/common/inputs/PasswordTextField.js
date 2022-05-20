import React, {useState} from 'react';
import {TextField} from './TextField';
import {TextInput} from 'react-native-paper';
import {Touchable} from '../../blocks/Touchable';

export const PasswordTextField = ({value, onChangeText, label, style, error}) => {
  const [secure, setSecure] = useState(true);

  const onSecure = () => setSecure(!secure);

  return (
    <TextField
      secure={secure}
      label={label}
      value={value}
      onChangeText={onChangeText}
      error={error}
      style={style}
      right={
        <TextInput.Icon
          name={() => <Touchable
            action={onSecure}
            name={secure ? 'lock-outline' : 'lock-open-outline'} type={'material-community'}
          />}
        />
      }
    />
  );
};
