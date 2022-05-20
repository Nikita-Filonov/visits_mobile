import React from 'react';
import {Text} from 'react-native';
import {useThemes} from '../../Providers/ThemeProvider';

export const CustomText = ({children, style, onPress}) => {
  const {theme} = useThemes();

  return (
    <Text style={[{color: theme.text}, style]} onPress={onPress}>
      {children}
    </Text>
  );
};
