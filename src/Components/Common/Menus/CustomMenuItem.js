import React from 'react';
import {Menu} from 'react-native-paper';
import {useThemes} from '../../../Providers/ThemeProvider';

export const CustomMenuItem = ({title, onPress, disabled, icon, color}) => {
  const {theme} = useThemes();

  return (
    <Menu.Item
      icon={icon}
      disabled={disabled}
      onPress={onPress}
      title={title}
      titleStyle={{color: color || theme.text}}
    />
  );
};
