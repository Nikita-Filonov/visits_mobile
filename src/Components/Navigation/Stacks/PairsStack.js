import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../utils/Constants';
import Pairs from '../../../Screens/Pairs/Pairs';
import CreatePair from '../../../Screens/Pairs/CreatePair';
import ViewPair from '../../../Screens/Pairs/ViewPair';
import {PairsProvider} from '../../../Providers/Pairs/PairsProvider';
import {UserPairsProvider} from '../../../Providers/Pairs/UserPairsProvider';
import CreateUserPair from '../../../Screens/Pairs/UserPairs/CreateUserPair';
import ScanStudentQRCode from '../../../Screens/Pairs/UserPairs/ScanStudentQRCode';
import UserPairVisits from '../../../Screens/Pairs/UserPairs/UserPairVisits';
import {
  CREATE_PAIR_ROUTE,
  CREATE_USER_PAIR_ROUTE,
  PAIRS_ROUTE,
  SCAN_STUDENT_QR_CODE_ROUTE,
  USER_PAIRS_ROUTE,
  VIEW_PAIR_ROUTE,
} from '../../../utils/Routes';

const Stack = createStackNavigator();

export const PairsStack = () => {
  return (
    <PairsProvider>
      <Stack.Navigator>
        <Stack.Screen name={PAIRS_ROUTE} options={STACK_OPTIONS}>
          {props => (
            <UserPairsProvider>
              <Pairs {...props} />
            </UserPairsProvider>
          )}
        </Stack.Screen>
        <Stack.Screen name={CREATE_PAIR_ROUTE} options={STACK_OPTIONS}>
          {props => <CreatePair {...props} />}
        </Stack.Screen>
        <Stack.Screen name={VIEW_PAIR_ROUTE} options={STACK_OPTIONS}>
          {props => (
            <UserPairsProvider>
              <ViewPair {...props} />
            </UserPairsProvider>
          )}
        </Stack.Screen>
        <Stack.Screen name={CREATE_USER_PAIR_ROUTE} options={STACK_OPTIONS}>
          {props => (
            <UserPairsProvider>
              <CreateUserPair {...props} />
            </UserPairsProvider>
          )}
        </Stack.Screen>
        <Stack.Screen name={SCAN_STUDENT_QR_CODE_ROUTE} options={STACK_OPTIONS}>
          {props => (
            <UserPairsProvider>
              <ScanStudentQRCode {...props} />
            </UserPairsProvider>
          )}
        </Stack.Screen>
        <Stack.Screen name={USER_PAIRS_ROUTE} options={STACK_OPTIONS}>
          {props => (
            <UserPairsProvider>
              <UserPairVisits {...props} />
            </UserPairsProvider>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </PairsProvider>
  );
};
