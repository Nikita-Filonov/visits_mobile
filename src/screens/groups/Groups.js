import React, {useMemo, useState} from 'react';
import {comp} from '../../styles/Blocks';
import {FlatList, RefreshControl} from 'react-native';
import {useGroups} from '../../providers/groups/GroupsProvider';
import Group from '../../components/items/groups/Group';
import {EmptyList} from '../../components/blocks/EmptyList';
import AdMobBanner from 'react-native-admob/RNAdMobBanner';
import {CustomFab} from '../../components/common/CustomFab';
import {SearchTextField} from '../../components/common/inputs/SearchTextField';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {Spinner} from '../../components/common/Spinner';
import DefaultGroupModal from '../../components/modals/groups/DefaultGroupModal';
import {ListSeparator} from '../../components/common/ListSeparator';
import {DrawerLayout} from '../../components/layouts/DrawerLayout';
import GroupsHeaderMenu from '../../components/other/menus/groups/GroupsHeaderMenu';


const Groups = ({navigation, groups}) => {
  const {t} = useTranslation();
  const {load, getGroups} = useGroups();
  const [search, setSearch] = useState('');

  const GroupsSearch = useMemo(() =>
      groups.filter(group => group.title.toLowerCase().includes(search.toLowerCase())),
    [groups, search],
  );

  const onCreate = () => navigation.navigate('CreateGroup');

  return (
    <DrawerLayout title={t('components.drawer.groups')} menu={<GroupsHeaderMenu/>} navigation={navigation}>
      <SearchTextField search={search} setSearch={setSearch} placeholder={t('groups.search.placeholder')}/>
      {load
        ? <Spinner/>
        : <FlatList
          style={[comp.input, comp.bottomList]}
          refreshControl={<RefreshControl refreshing={false} onRefresh={getGroups}/>}
          removeClippedSubviews={true}
          data={GroupsSearch}
          renderItem={({item}) => <Group item={item}/>}
          ItemSeparatorComponent={ListSeparator}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={() =>
            <EmptyList entities={GroupsSearch} search={search} {...t('components.emptyLists.groups')}/>
          }
        />
      }
      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-1094213860762666/3857355234"
        testDevices={[AdMobBanner.simulatorId]}
      />
      <CustomFab onPress={onCreate}/>
      <DefaultGroupModal/>
    </DrawerLayout>
  );
};

const getState = (state) => ({groups: state.groups.groups});

export default connect(
  getState,
  null,
)(Groups);
