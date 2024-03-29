import React from 'react';
import {MainView} from './MainView';
import {AppBar} from '../Common/AppBar';
import {Appbar} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {comp} from '../../Styles/Blocks';
import {View} from 'react-native';

export const DrawerLayout = ({
  children,
  navigation,
  menu,
  title,
  wrapper = true,
}) => {
  return (
    <MainView>
      <AppBar>
        <Appbar.Action
          onPress={() => navigation.openDrawer()}
          animated={false}
          icon={() => <Icon name={'menu'} type={'feather'} color={'white'} />}
        />
        <Appbar.Content title={title} color={'white'} />
        {menu}
      </AppBar>
      <View style={wrapper ? [comp.viewContainer, comp.flex] : []}>
        {children}
      </View>
    </MainView>
  );
};
