import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {useThemes} from '../../providers/ThemeProvider';
import {comp} from '../../styles/Blocks';
import changeNavigationBarColor from 'react-native-navigation-bar-color';


export const MainView = ({children, header = true}) => {
  const {theme} = useThemes();

  useEffect(() => {
    (async () => {
      StatusBar.setBarStyle(header ? 'light-content' : theme.barStyle);
      StatusBar.setBackgroundColor(header ? theme.header.background : theme.background);
      await changeNavigationBarColor(theme.background);
    })();
  }, [theme.background, header]);

  return (
    <View style={[comp.container, {backgroundColor: theme.background}]}>
      {children}
    </View>
  );
};
