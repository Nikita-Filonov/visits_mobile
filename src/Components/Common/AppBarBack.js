import React from 'react';
import {Icon} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
import {useThemes} from '../../Providers/ThemeProvider';
import {goBack} from '../Navigation/RootNavigation';

export const AppBarBack = ({header = true, onBack}) => {
  const {theme} = useThemes();

  const onSafeBack = () => (onBack ? onBack() : goBack());

  return (
    <Appbar.Action
      onPress={onSafeBack}
      animated={false}
      icon={() => (
        <Icon
          name={'chevron-left'}
          type={'entypo'}
          color={header ? '#FFFFFF' : theme.text}
        />
      )}
    />
  );
};
