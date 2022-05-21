import React, {useContext, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {SET_THEME} from '../Redux/Settings/actionTypes';

export const ThemeStyles = {
  default: {
    background: '#FFFFFF',
    text: '#454545',
    dark: false,
    mode: 'light',
    barStyle: 'dark-content',
    listItem: '#EEEEEE',
    listItemSelected: '#D2D2D2',
    coloredBackground: '#1976D2',
    dangerBackground: '#FF0800',
    disabled: '#B0B0B0',
    button: {
      inherit: '#646464',
      primary: '#42C467',
      error: '#DB2F2F',
      warning: '#FFA726',
    },
    header: {
      background: '#42C467',
    },
    colors: {
      primary: '#0288D1',
      success: '#2E7D32',
      info: '#0288D1',
      error: '#D32F2F',
      warning: '#ED6C02',
      inherit: '#212121',
    },
  },
  dark: {
    background: '#2B2B2B',
    text: 'white',
    dark: true,
    mode: 'dark',
    barStyle: 'light-content',
    listItem: '#454545',
    listItemSelected: '#646464',
    coloredBackground: '#1976D2',
    dangerBackground: '#FF0800',
    disabled: '#B0B0B0',
    button: {
      inherit: '#646464',
      primary: '#90CAF9',
      error: '#D53B36',
      warning: '#FFA726',
    },
    header: {
      background: '#3E3E3E',
    },
    colors: {
      primary: '#29B6F6',
      success: '#66BB6A',
      info: '#29B6F6',
      error: '#F44336',
      warning: '#FFA726',
      inherit: '#FFFFFF',
    },
  },
};

const ThemeContext = React.createContext(null);

const ThemeProvider = ({children, store}) => {
  const themeSettings = useSelector(state => state.settings.theme);
  const theme = useMemo(
    () => ThemeStyles[themeSettings.themeMode],
    [themeSettings.themeMode],
  );

  const inputTheme = useMemo(
    () => ({
      colors: {
        primary: theme?.button?.primary,
        underlineColor: 'transparent',
        text: theme.text,
        placeholder: theme.text,
      },
    }),
    [theme],
  );

  const changeTheme = async themeMode =>
    store.dispatch({type: SET_THEME, payload: {...themeSettings, themeMode}});

  return (
    <ThemeContext.Provider
      value={{theme, ThemeStyles, inputTheme, changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemes = () => {
  const event = useContext(ThemeContext);
  if (event == null) {
    throw new Error('useThemes() called outside of a ThemeProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return event;
};

export {ThemeProvider, useThemes};
