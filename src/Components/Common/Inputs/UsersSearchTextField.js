import React from 'react';
import {comp} from '../../../Styles/Blocks';
import {TextInput} from 'react-native-paper';
import {ActivityIndicator} from 'react-native';
import {TextField} from './TextField';
import {useThemes} from '../../../Providers/ThemeProvider';

export const UsersSearchTextField = ({value, onChangeText, loading}) => {
  const {theme} = useThemes();

  return (
    <TextField
      label={'Электронный адрес или Фамилия Имя'}
      style={comp.input}
      value={value}
      onChangeText={onChangeText}
      right={
        loading && (
          <TextInput.Icon
            name={() => <ActivityIndicator color={theme.header.background} />}
          />
        )
      }
    />
  );
};
