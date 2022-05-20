import React from 'react';
import {comp} from '../../styles/Blocks';
import {FAB} from 'react-native-paper';
import {useThemes} from '../../providers/ThemeProvider';

export const CustomFab = ({onPress, withoutWrapper = false}) => {
  const {theme} = useThemes();

  return (
    <FAB
      style={[comp.fab, {backgroundColor: theme.button.primary, marginRight: withoutWrapper ? 16 : 0}]}
      icon="plus"
      color={'white'}
      onPress={onPress}
    />
  );
};
