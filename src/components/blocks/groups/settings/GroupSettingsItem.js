import React from 'react';
import {Icon, ListItem} from 'react-native-elements';
import {useThemes} from '../../../../providers/ThemeProvider';

export const GroupSettingsItem = ({onPress, label, name, type}) => {
  const {theme} = useThemes();

  return (
    <ListItem onPress={onPress} containerStyle={{backgroundColor: theme.background}}>
      <Icon name={name} type={type} color={theme.text}/>
      <ListItem.Content>
        <ListItem.Title style={{color: theme.text}}>{label}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron color={theme.text}/>
    </ListItem>
  );
};
