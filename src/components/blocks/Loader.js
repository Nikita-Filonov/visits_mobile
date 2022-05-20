import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {loader} from '../../styles/Blocks';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export const Loader = () => {
  useEffect(() => {
    (async () => {
      StatusBar.setBarStyle('default');
      StatusBar.setBackgroundColor('#6CE990');
      await changeNavigationBarColor('#6CE990');
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
