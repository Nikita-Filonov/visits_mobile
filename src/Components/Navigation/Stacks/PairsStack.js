import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {STACK_OPTIONS} from '../../../Utils/Constants';
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
  USER_PAIR_VISITS_ROUTE,
  VIEW_PAIR_ROUTE,
} from '../../../Utils/Routes';
import {GroupsProvider} from '../../../Providers/Groups/GroupsProvider';
import CreateUserPairGroups from '../../../Screens/Pairs/UserPairs/CreateUserPairGroups';

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
        <Stack.Screen name={USER_PAIR_VISITS_ROUTE} options={STACK_OPTIONS}>
          {props => (
            <UserPairsProvider>
              <UserPairVisits {...props} />
            </UserPairsProvider>
          )}
        </Stack.Screen>
        <Stack.Screen name="CreateUserPairGroups" options={STACK_OPTIONS}>
          {props => (
            <UserPairsProvider>
              <GroupsProvider>
                <CreateUserPairGroups {...props} />
              </GroupsProvider>
            </UserPairsProvider>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </PairsProvider>
  );
};
