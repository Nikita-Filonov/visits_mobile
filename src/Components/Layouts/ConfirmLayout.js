import React from 'react';
import {MainView} from './MainView';
import {Appbar} from 'react-native-paper';
import {AppBarBack} from '../Common/AppBarBack';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {AppBar} from '../Common/AppBar';
import {comp} from '../../Styles/Blocks';

export const ConfirmLayout = ({
  children,
  title,
  loading,
  onConfirm,
  onBack,
  scroll,
  actions,
  disabled,
}) => {
  return (
    <MainView>
      <AppBar>
        <AppBarBack onBack={onBack} />
        <Appbar.Content title={title} color={'#FFFFFF'} />
        {actions && actions.map((a, index) => <View key={index}>{a}</View>)}
        <Appbar.Action
          disabled={disabled}
          onPress={onConfirm}
          animated={false}
          icon={() =>
            loading ? (
              <ActivityIndicator color={'#FFFFFF'} />
            ) : (
              <Icon name={'check'} type={'feather'} color={'#FFFFFF'} />
            )
          }
        />
      </AppBar>
      {scroll ? (
        <ScrollView style={[comp.viewContainer, comp.flex]}>
          {children}
        </ScrollView>
      ) : (
        <View style={[comp.viewContainer, comp.flex]}>{children}</View>
      )}
    </MainView>
  );
};
