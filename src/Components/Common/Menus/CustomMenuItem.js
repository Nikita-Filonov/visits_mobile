import React from 'react';
import {Menu} from 'react-native-paper';
import {useThemes} from '../../../Providers/ThemeProvider';

export const CustomMenuItem = ({title, onPress, disabled, color}) => {
  const {theme} = useThemes();

  return (
    <Menu.Item
      disabled={disabled}
      onPress={onPress}
      title={title}
      titleStyle={
        disabled
          ? {color: theme.listItemSelected}
          : {color: color || theme.text}
      }
    />
  );
};
