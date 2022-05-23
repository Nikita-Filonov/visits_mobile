import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {BackLayout} from '../../Components/Layouts/BackLayout';
import {FlatList, RefreshControl} from 'react-native';
import {ListSeparator} from '../../Components/Common/ListSeparator';
import {Spinner} from '../../Components/Common/Spinner';
import {goBack, navigate} from '../../Components/Navigation/RootNavigation';
import {useGroupUsers} from '../../Providers/Groups/GroupUsersProvider';
import {GroupUserItem} from '../../Components/Items/Groups/GroupUserItem';
import {CustomFab} from '../../Components/Common/Fabs/CustomFab';

const ViewGroup = ({route, group, groupUsers}) => {
  const {isCreation} = route.params;
  const {load, getGroupUsers} = useGroupUsers();

  useEffect(() => {
    (async () => group?.id && (await getGroupUsers(group?.id)))();
  }, [group?.id]);

  const onRefresh = async () => await getGroupUsers(group?.id);

  const onBack = () => (isCreation ? navigate('Groups') : goBack());

  const onCreate = () => navigate('CreateGroupUser');

  return (
    <BackLayout
      title={group.name}
      subtitle={`Всего студентов: ${groupUsers?.length}`}
      onBack={onBack}>
      {load ? (
        <Spinner />
      ) : (
        <FlatList
          data={groupUsers}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          renderItem={({item}) => <GroupUserItem groupUser={item} />}
          ItemSeparatorComponent={ListSeparator}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
      <CustomFab onPress={onCreate} withoutWrapper={true} />
    </BackLayout>
  );
};

const getState = state => ({
  group: state.groups.group,
  groupUsers: state.groups.groupUsers,
});
export default connect(getState, null)(ViewGroup);
