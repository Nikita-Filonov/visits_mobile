import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {loader} from '../../Styles/Blocks';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {ThemeStyles} from '../../Providers/ThemeProvider';

export const Loader = () => {
  useEffect(() => {
    (async () => {
      StatusBar.setBarStyle('default');
      StatusBar.setBackgroundColor(ThemeStyles.default.button.primary);
      await changeNavigationBarColor(ThemeStyles.default.button.primary);
    })();
  }, []);

  return (
    <View style={loader.container}>
      <Animatable.Text
        style={loader.text}
        animation="zoomIn"
        direction="alternate"
        iterationCount={1}>
        Visits
      </Animatable.Text>
    </View>
  );
};
