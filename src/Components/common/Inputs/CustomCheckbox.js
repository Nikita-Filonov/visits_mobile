import React from 'react';
import {Checkbox} from 'react-native-paper';
import {useThemes} from '../../../Providers/ThemeProvider';

export const CustomCheckbox = ({onPress, checked}) => {
  const {theme} = useThemes();

  return (
    <Checkbox
      uncheckedColor={theme.text}
      color={theme.button.primary}
      onPress={onPress}
      status={checked ? 'checked' : 'unchecked'}
    />
  );
};
