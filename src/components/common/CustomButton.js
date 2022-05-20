import React from 'react';
import {Button} from 'react-native-elements';
import {useThemes} from '../../providers/ThemeProvider';
import {View} from 'react-native';

export const CustomButton = ({
                               icon,
                               title,
                               type = 'solid',
                               loading,
                               onPress,
                               upper = true,
                               buttonStyle,
                               containerStyle,
                               color = 'inherit',
                               disabled,
                             }) => {
  const {theme} = useThemes();
  const buttonTemplates = {
    outline: {
      titleStyle: {
        color: theme.button[color] || theme.text,
      },
      buttonStyle: {
        backgroundColor: null,
        borderColor: theme.button[color] || theme.text,
        borderWidth: 0.6,
      },
    },
    clear: {
      titleStyle: {
        color: theme.button[color] || theme.text,
      },
      buttonStyle: {
        backgroundColor: null,
      },
    },
    solid: {
      titleStyle: {
        color: '#FFFFFF',
      },
      buttonStyle: {
        backgroundColor: theme.button[color],
      },
    },
  };

  return (
    <Button
      icon={icon ? <View style={{marginRight: 5}}>{icon}</View> : null}
      disabled={disabled}
      type={type}
      loading={loading}
      title={upper ? title?.toUpperCase() : title}
      loadingProps={{color: theme.text}}
      onPress={onPress}
      buttonStyle={[{borderRadius: 4}, buttonStyle, buttonTemplates[type].buttonStyle]}
      containerStyle={containerStyle}
      titleStyle={[buttonTemplates[type].titleStyle]}
      disabledStyle={[buttonTemplates[type].buttonStyle]}
    />
  );
};
