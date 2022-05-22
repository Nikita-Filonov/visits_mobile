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
import reducer from './src/Redux/Reducers';
import {AlertProvider} from './src/Providers/AlertsProvider';
import {AuthProvider} from './src/Providers/AuthProvider';
import {ThemeProvider} from './src/Providers/ThemeProvider';
import {PermissionsProvider} from './src/Providers/PermissionsProvider';

export const store = createStore(reducer);

const Root = () => (
  <Provider store={store}>
    <AlertProvider>
      <ThemeProvider store={store}>
        <AuthProvider>
          <PermissionsProvider>
            <PaperProvider>
              <App store={store} />
            </PaperProvider>
          </PermissionsProvider>
        </AuthProvider>
      </ThemeProvider>
    </AlertProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
