import React, {useMemo} from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useThemes} from '../../providers/ThemeProvider';
import {AlertMessageStyles} from '../../styles/Blocks';

const LEVEL_COLORS = {
  dark: {
    background: {
      success: '#0C130D',
      warning: '#0C130D',
      error: '#0C130D',
      info: '#0C130D',
    },
    icon: {
      success: '#5DAA61',
      warning: '#E89823',
      error: '#DD3D32',
      info: '#249DD4',
    },
    text: {
      success: '#A7E8CD',
      warning: '#FFD579',
      error: '#F4B890',
      info: '#A5D1E3',
    },
  },
  default: {
    background: {
      success: '#EDF7ED',
      warning: '#FFF4E5',
      error: '#FDEDED',
      info: '#E5F6FD',
    },
    icon: {
      success: '#65BA68',
      warning: '#FFA117',
      error: '#F06360',
      info: '#1AB1F5',
    },
    text: {
      success: '#160B0B',
      warning: '#160B0B',
      error: '#160B0B',
      info: '#160B0B',
    },
  },
  icons: {
    success: 'checkbox-marked-circle-outline',
    warning: 'alert-outline',
    error: 'alert-circle-outline',
    info: 'information-outline',
  },
};

export const AlertMessage = ({message, level = 'success', style, action}) => {
  const {theme} = useThemes();

  const colors = useMemo(() => theme.dark ? LEVEL_COLORS.dark : LEVEL_COLORS.default, [theme.dark]);

  return (
    <View style={[
      AlertMessageStyles.container,
      {backgroundColor: colors.background[level], ...style}]
    }>
      <Icon name={LEVEL_COLORS.icons[level]} type={'material-community'} color={colors.icon[level]}/>
      <Text style={[AlertMessageStyles.message, {color: colors.text[level]}]}>{message}</Text>
      {action}
    </View>
  );
};
