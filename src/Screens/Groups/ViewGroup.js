import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {BackLayout} from '../../Components/Layouts/BackLayout';
import {UserPairsFab} from '../../Components/Common/Fabs/UserPairsFab';
import {FlatList, RefreshControl} from 'react-native';
import {ListSeparator} from '../../Components/Common/ListSeparator';
import {Spinner} from '../../Components/Common/Spinner';
import {goBack, navigate} from '../../Components/Navigation/RootNavigation';
import {useGroupUsers} from '../../Providers/Groups/GroupUsersProvider';
import {GroupUserItem} from '../../Components/Items/Groups/GroupUserItem';

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
          renderItem={({item}) => <GroupUserItem userPair={item} />}
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
