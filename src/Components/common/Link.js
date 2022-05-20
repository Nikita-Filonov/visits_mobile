import React from 'react';
import {CustomText} from './CustomText';
import {useThemes} from '../../Providers/ThemeProvider';

export const Link = ({children, onPress, style}) => {
  const {theme} = useThemes();

  return (
    <CustomText
      style={[{color: theme.button.primary}, style]}
      onPress={onPress}>
      {children}
    </CustomText>
  );
};
