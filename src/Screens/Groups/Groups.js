import React from 'react';
import {DrawerLayout} from '../../Components/Layouts/DrawerLayout';
import {CustomFab} from '../../Components/Common/Fabs/CustomFab';
import {connect} from 'react-redux';
import {FlatList, RefreshControl} from 'react-native';
import {Spinner} from '../../Components/Common/Spinner';
import {ListSeparator} from '../../Components/Common/ListSeparator';
import {useGroups} from '../../Providers/Groups/GroupsProvider';
import {GroupItem} from '../../Components/Items/Groups/GroupItem';

const Groups = ({navigation, groups}) => {
  const {load, getGroups} = useGroups();

  const onCreate = () => navigation.navigate('CreateGroup');

  return (
    <DrawerLayout title={'Группы'} navigation={navigation}>
      {load ? (
        <Spinner />
      ) : (
        <FlatList
          data={groups}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getGroups} />
          }
          ItemSeparatorComponent={ListSeparator}
          renderItem={({item}) => <GroupItem group={item} />}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
      <CustomFab onPress={onCreate} withoutWrapper={true} />
    </DrawerLayout>
  );
};

const getState = state => ({groups: state.groups.groups});
export default connect(getState, null)(Groups);
