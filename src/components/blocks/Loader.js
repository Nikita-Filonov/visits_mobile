import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {loader} from '../../styles/Blocks';
import changeNavigationBarColor from 'react-native-navigation-bar-color';


export const Loader = () => {

  useEffect(() => {
    (async () => {
      StatusBar.setBarStyle('default');
      StatusBar.setBackgroundColor('#1976D2');
      await changeNavigationBarColor('#1976D2');
    })();
  }, []);

  return (
    <View style={loader.container}>
      <Animatable.Text
        style={loader.text}
        animation="fadeInLeftBig"
        direction="alternate"
        iterationCount={1}>
        RQ
      </Animatable.Text>
      <View style={loader.separator}/>
      <Animatable.Text
        style={loader.text}
        animation="fadeInRightBig"
        direction="alternate"
        iterationCount={1}>
        TIMER
      </Animatable.Text>
    </View>
  );
};
