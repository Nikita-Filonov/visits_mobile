import React from 'react';
import {MainView} from './MainView';
import {Appbar} from 'react-native-paper';
import {AppBarBack} from '../common/AppBarBack';
import {useThemes} from '../../Providers/ThemeProvider';
import {ActivityIndicator, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {AppBar} from '../common/AppBar';
import {comp} from '../../Styles/Blocks';

export const ConfirmLayout = ({
  children,
  title,
  loading,
  onConfirm,
  onBack,
  actions,
  disabled,
}) => {
  const {theme} = useThemes();

  return (
    <MainView>
      <AppBar>
        <AppBarBack onBack={onBack} />
        <Appbar.Content title={title} />
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
      <View style={[comp.viewContainer, comp.flex]}>{children}</View>
    </MainView>
  );
};
