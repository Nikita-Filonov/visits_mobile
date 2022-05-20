import React from 'react';
import {Icon} from 'react-native-elements';
import {useThemes} from '../../providers/ThemeProvider';
import {View} from 'react-native';

export const IsIncluded = ({included}) => {
  const {theme} = useThemes();

  return (
    <View style={{alignItems: 'flex-end', marginRight: 15}}>
      {
        included
          ? <Icon name={'check'} type={'material-community'} color={theme.colors.success}/>
          : <Icon name={'close'} type={'material-community'} color={theme.colors.error}/>
      }
    </View>
  );
};
