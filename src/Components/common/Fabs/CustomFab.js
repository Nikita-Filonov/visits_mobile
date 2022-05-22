import React from 'react';
import {comp} from '../../../Styles/Blocks';
import {FAB} from 'react-native-paper';
import {useThemes} from '../../../Providers/ThemeProvider';

export const CustomFab = ({
  onPress,
  withoutWrapper = false,
  orientation = 'right',
  icon,
}) => {
  const {theme} = useThemes();

  return (
    <FAB
      style={[
        orientation === 'right' ? comp.fab : comp.fabLeft,
        orientation === 'right'
          ? {marginRight: withoutWrapper ? 16 : 0}
          : {marginLeft: withoutWrapper ? 16 : 0},
        {backgroundColor: theme.button.primary},
      ]}
      icon={icon || 'plus'}
      color={'white'}
      onPress={onPress}
    />
  );
};
