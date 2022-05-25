import React, {useMemo, useState} from 'react';
import {DrawerLayout} from '../../Components/Layouts/DrawerLayout';
import {CustomFab} from '../../Components/Common/Fabs/CustomFab';
import {connect} from 'react-redux';
import {RefreshControl} from 'react-native';
import {Spinner} from '../../Components/Common/Spinner';
import {ListSeparator} from '../../Components/Common/ListSeparator';
import {useGroups} from '../../Providers/Groups/GroupsProvider';
import GroupItem from '../../Components/Items/Groups/GroupItem';
import {SearchTextField} from '../../Components/Common/Inputs/SearchTextField';
import {comp} from '../../Styles/Blocks';
import {EmptyList} from '../../Components/Blocks/EmptyList';
import {CustomFlatList} from '../../Components/Common/CustomFlatList';
import {GROUPS_INITIAL_STATE} from '../../Redux/Groups/initialState';
import {setGroup} from '../../Redux/Groups/groupsActions';

const Groups = ({navigation, groups, setGroupStore}) => {
  const {load, getGroups} = useGroups();
  const [search, setSearch] = useState('');

  const onCreate = () => {
    setGroupStore(GROUPS_INITIAL_STATE.group);
    navigation.navigate('CreateGroup');
  };

  const groupsSearch = useMemo(
    () =>
      groups.filter(pair =>
        pair.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [groups, search],
  );

  return (
    <DrawerLayout title={'Группы'} navigation={navigation}>
      <SearchTextField
        search={search}
        setSearch={setSearch}
        placeholder={'Поиск по названию группы'}
      />
      {load ? (
        <Spinner />
      ) : (
        <CustomFlatList
          style={comp.input}
          data={groupsSearch}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getGroups} />
          }
          ItemSeparatorComponent={ListSeparator}
          renderItem={({item}) => <GroupItem group={item} />}
          ListEmptyComponent={
            <EmptyList
              title={'Тут пока нет групп'}
              description={'Нажмите на плюсик, чтобы создать группу'}
              search={search}
              entities={groupsSearch}
            />
          }
          keyExtractor={(_, index) => index.toString()}
        />
      )}
      <CustomFab onPress={onCreate} withoutWrapper={true} />
    </DrawerLayout>
  );
};

const getState = state => ({groups: state.groups.groups});
export default connect(getState, {setGroupStore: setGroup})(Groups);
