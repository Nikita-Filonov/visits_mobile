import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {BackLayout} from '../../Components/Layouts/BackLayout';
import {useUserPairs} from '../../Providers/Pairs/UserPairsProvider';
import {UserPairsFab} from '../../Components/Common/Fabs/UserPairsFab';
import {FlatList, RefreshControl} from 'react-native';
import {UserPairItem} from '../../Components/Items/Pairs/UserPairItem';
import {ListSeparator} from '../../Components/Common/ListSeparator';
import {Spinner} from '../../Components/Common/Spinner';
import {Appbar} from 'react-native-paper';
import {getCurrentPairDate} from '../../Utils/Helpers/Formatters';
import {getCameraPermissions} from '../../Utils/Helpers/Permissions';
import UserPairBottomSheet from '../../Components/Common/BottomSheets/UserPairBottomSheet';
import {setUserPair} from '../../Redux/Pairs/pairsActions';
import {goBack, navigate} from '../../Components/Navigation/RootNavigation';
import {useGroupUsers} from '../../Providers/Groups/GroupUsersProvider';

const ViewPair = ({route, group, groupUsers}) => {
  const {isCreation} = route.params;
  const {load, getGroupUsers} = useGroupUsers();

  useEffect(() => {
    (async () => group?.id && (await getGroupUsers(group?.id)))();
  }, [group?.id]);

  const onRefresh = async () => await getGroupUsers(group?.id);

  const onBack = () => (isCreation ? navigate('Groups') : goBack());

  return (
    <BackLayout title={group.name} onBack={onBack} bottom={<UserPairsFab />}>
      {load ? (
        <Spinner />
      ) : (
        <FlatList
          data={groupUsers}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          renderItem={({item}) => <UserPairItem userPair={item} />}
          ItemSeparatorComponent={ListSeparator}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </BackLayout>
  );
};

const getState = state => ({
  group: state.groups.pair,
  groupUsers: state.groups.groupUsers,
});
export default connect(getState, null)(ViewPair);
