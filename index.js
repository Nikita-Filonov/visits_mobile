/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {App} from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Provider as PaperProvider} from 'react-native-paper';
import reducer from './src/Redux/reducers';
import {AlertProvider} from './src/providers/AlertsProvider';
import {AuthProvider} from './src/providers/AuthProvider';
import {SettingsProvider} from './src/providers/SettingsProvider';
import {ThemeProvider} from './src/providers/ThemeProvider';

const store = createStore(reducer);

const Root = () => (
  <Provider store={store}>
    <AlertProvider>
      <ThemeProvider store={store}>
        <AuthProvider>
          <SettingsProvider store={store}>
            <PaperProvider>
              <App store={store} />
            </PaperProvider>
          </SettingsProvider>
        </AuthProvider>
      </ThemeProvider>
    </AlertProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
