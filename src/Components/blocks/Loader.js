import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {loader} from '../../Styles/Blocks';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export const Loader = () => {
  useEffect(() => {
    (async () => {
      StatusBar.setBarStyle('default');
      StatusBar.setBackgroundColor('#42C467');
      await changeNavigationBarColor('#42C467');
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
