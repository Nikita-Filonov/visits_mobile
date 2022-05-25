import 'react-native-gesture-handler';
import 'moment/locale/ru';
import 'moment/locale/en-au';
import React, {useEffect, useState} from 'react';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Loader} from './src/Components/Blocks/Loader';
import {useAuth} from './src/Providers/AuthProvider';
import {LoginStack} from './src/Components/Navigation/Stacks/LoginStack';
import {STACK_OPTIONS} from './src/Utils/Constants';
import {navigationRef} from './src/Components/Navigation/RootNavigation';
import {setupDefaultGroup, setupReduxStore} from './src/Redux/Setup';
import {DrawerNavigator} from './src/Components/Navigation/DrawerNavigator';

enableScreens();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const App = ({store}) => {
  const {token} = useAuth();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    (async () => setTimeout(async () => await onLoadApp(), 2000))();
  }, []);

  const onLoadApp = async () => {
    await setupDefaultGroup(store);
    await setupReduxStore(store);
    setLoader(false);
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {loader ? (
        <Loader />
      ) : (
        <Stack.Navigator initialRouteName={'Welcome'}>
          {token ? (
            <Drawer.Screen name="Pairs" options={STACK_OPTIONS}>
              {props => <DrawerNavigator store={store} {...props} />}
            </Drawer.Screen>
          ) : (
            <Stack.Screen name="Welcome" options={STACK_OPTIONS}>
              {props => <LoginStack {...props} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
