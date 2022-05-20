import 'react-native-gesture-handler';
import 'moment/locale/ru';
import 'moment/locale/en-au';
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Loader} from './src/components/blocks/Loader';
import {useAuth} from './src/providers/AuthProvider';
import {LoginStack} from './src/components/navigation/stacks/LoginStack';
import {STACK_OPTIONS} from './src/utils/Constants';
import {navigationRef} from './src/components/navigation/RootNavigation';
import {setupDefaultGroup, setupReduxStore} from './src/redux/setup';

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
            <View />
          ) : (
            // ? <Drawer.Screen name="Timers" options={STACK_OPTIONS}>
            //   {props => <DrawerNavigator store={store} {...props}/>}
            // </Drawer.Screen>
            <Stack.Screen name="Welcome" options={STACK_OPTIONS}>
              {props => <LoginStack {...props} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
