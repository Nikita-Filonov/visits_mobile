import React from 'react';
import {Menu} from 'react-native-paper';
import {useThemes} from '../../../providers/ThemeProvider';

export const CustomMenuItem = ({title, onPress, disabled}) => {
  const {theme} = useThemes();

  return (
    <Menu.Item disabled={disabled} onPress={onPress} title={title} titleStyle={{color: theme.text}}/>
  );
};
