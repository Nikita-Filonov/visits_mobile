import React from 'react';
import {comp} from '../../../styles/Blocks';
import {Checkbox} from 'react-native-paper';
import {CustomText} from '../CustomText';
import {TouchableOpacity} from 'react-native';
import {useThemes} from '../../../providers/ThemeProvider';

export const CheckboxFormControl = ({onPress, checked, style, label}) => {
  const {theme} = useThemes();

  return (
    <TouchableOpacity onPress={onPress} style={[comp.rowContainer, style]}>
      <Checkbox
        uncheckedColor={theme.text}
        color={theme.button.primary}
        onPress={onPress}
        status={checked ? 'checked' : 'unchecked'}
      />
      <CustomText style={[comp.smallText, {marginLeft: 10}]}>
        {label}
      </CustomText>
    </TouchableOpacity>
  );
};
