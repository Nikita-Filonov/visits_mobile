import React from 'react';
import {View} from 'react-native';
import {useThemes} from '../../../Providers/ThemeProvider';
import {DataGridStyles} from '../../../Styles/Blocks';

export const DataGridFooter = () => {
  const {theme} = useThemes();

  return (
    <View
      style={[DataGridStyles.footerContainer, {borderColor: theme.disabled}]}
    />
  );
};
