import React from 'react';
import {MainView} from './MainView';
import {Appbar} from 'react-native-paper';
import {AppBarBack} from '../common/AppBarBack';
import {AppBar} from '../common/AppBar';
import {View} from 'react-native';
import {comp} from '../../Styles/Blocks';

export const BackLayout = ({
  children,
  title,
  subtitle,
  navigation,
  header,
  actions,
  backButton,
  wrapper = true,
  fab = null,
}) => {
  return (
    <MainView header={header}>
      <AppBar header={header}>
        {backButton || <AppBarBack navigation={navigation} header={header} />}
        <Appbar.Content title={title} color={'#FFFFFF'} subtitle={subtitle} />
        {actions && actions.map((a, index) => <View key={index}>{a}</View>)}
      </AppBar>
      <View style={wrapper ? [comp.viewContainer, comp.flex] : []}>
        {children}
      </View>
      {fab}
    </MainView>
  );
};
