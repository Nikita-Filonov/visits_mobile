import React from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {useThemes} from '../../../providers/ThemeProvider';

export const TextField = ({
                            value,
                            onChangeText,
                            label,
                            style,
                            right,
                            left,
                            editable,
                            placeholder,
                            error,
                            secure,
                            multiline,
                            maxLength,
                            render,
                            keyboardType,
                            helpTextType = 'error',
                          }) => {
  const {theme, inputTheme} = useThemes();

  return (
    <React.Fragment>
      <TextInput
        keyboardType={keyboardType}
        maxLength={maxLength}
        numberOfLines={4}
        render={render}
        multiline={multiline}
        secureTextEntry={secure}
        selectionColor={theme.text}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={'none'}
        mode={'outlined'}
        label={label}
        style={[{backgroundColor: theme.background}, style]}
        placeholder={placeholder}
        placeholderTextColor={'#A5A5A5'}
        editable={editable}
        left={left}
        right={right}
        theme={inputTheme}
        error={Boolean(error) && helpTextType === 'error'}
      />
      {Boolean(error) && <HelperText
        type={helpTextType}
        style={{color: helpTextType === 'error' ? theme.colors.error : theme.text}}
      >
        {error}
      </HelperText>}
    </React.Fragment>
  );
};
