import React from 'react';
import {TouchableNativeFeedback, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {touchable} from '../../Styles/Blocks';
import {useThemes} from '../../Providers/ThemeProvider';

export const Touchable = ({name, type, action, disabled, color, size}) => {
  const {theme} = useThemes();

  return (
    <View style={touchable.container}>
      <TouchableNativeFeedback
        disabled={disabled}
        onPress={action}
        background={TouchableNativeFeedback.Ripple('black')}>
        <View style={touchable.wrapper}>
          <Icon
            size={size || 20}
            name={name}
            type={type}
            color={color || theme.text}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
