import React from 'react';
import {MainView} from './MainView';
import {Appbar} from 'react-native-paper';
import {useThemes} from '../../Providers/ThemeProvider';
import {ActivityIndicator, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {AppBar} from '../common/AppBar';
import {comp} from '../../Styles/Blocks';

export const FullScreenModalConfirmLayout = ({
  children,
  title,
  loading,
  onConfirm,
  onClose,
  actions,
  disabled,
}) => {
  const {theme} = useThemes();

  return (
    <MainView>
      <AppBar>
        <Appbar.Action
          onPress={onClose}
          animated={false}
          icon={() => (
            <Icon
              name={'close'}
              type={'material-community'}
              color={'#FFFFFF'}
            />
          )}
        />
        <Appbar.Content title={title} />
        {actions && actions.map((a, index) => <View key={index}>{a}</View>)}
        {onConfirm && (
          <Appbar.Action
            disabled={disabled}
            onPress={onConfirm}
            animated={false}
            icon={() =>
              loading ? (
                <ActivityIndicator color={theme.text} />
              ) : (
                <Icon name={'check'} type={'feather'} color={'#FFFFFF'} />
              )
            }
          />
        )}
      </AppBar>
      <View style={[comp.viewContainer, comp.flex]}>{children}</View>
    </MainView>
  );
};
