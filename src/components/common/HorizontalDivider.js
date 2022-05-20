import React from 'react';
import {Divider} from 'react-native-paper';
import {useThemes} from '../../Providers/ThemeProvider';

export const HorizontalDivider = ({style}) => {
  const {theme} = useThemes();

  return (
    <Divider
      style={{
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: theme.text,
        ...style,
      }}
    />
  );
};
