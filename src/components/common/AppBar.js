import React from 'react';
import {Appbar} from 'react-native-paper';
import {useThemes} from '../../providers/ThemeProvider';
import {View} from 'react-native';

export const AppBar = ({children, header = true}) => {
  const {theme} = useThemes();

  return (
    <React.Fragment>
      <Appbar.Header style={[{backgroundColor: header ? theme.header.background: theme.background}]}>
        {children}
      </Appbar.Header>
      <View style={{height: 10}}/>
    </React.Fragment>

  );
};
