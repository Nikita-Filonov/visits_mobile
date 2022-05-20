import React from 'react';
import {comp} from '../../Styles/Blocks';
import {ActivityIndicator, View} from 'react-native';
import {useThemes} from '../../Providers/ThemeProvider';

export const Spinner = ({size = 30}) => {
  const {theme} = useThemes();

  return (
    <View style={comp.centeredContainer}>
      <ActivityIndicator size={size} color={theme.button.primary} />
    </View>
  );
};
