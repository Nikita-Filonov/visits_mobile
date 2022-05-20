import React from 'react';
import {View} from 'react-native';
import {useThemes} from '../../../providers/ThemeProvider';
import {DataGridStyles} from '../../../styles/Blocks';

export const DataGridFooter = () => {
  const {theme} = useThemes();

  return (<View style={[DataGridStyles.footerContainer, {borderColor: theme.disabled}]}/>);
};
