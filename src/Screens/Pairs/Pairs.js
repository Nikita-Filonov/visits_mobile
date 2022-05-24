import React, {useMemo, useState} from 'react';
import {DrawerLayout} from '../../Components/Layouts/DrawerLayout';
import {CustomFab} from '../../Components/Common/Fabs/CustomFab';
import {connect} from 'react-redux';
import {ReduxStore} from '../../Models/Store';
import {FlatList, RefreshControl} from 'react-native';
import {usePairs} from '../../Providers/Pairs/PairsProvider';
import {Spinner} from '../../Components/Common/Spinner';
import PairItem from '../../Components/Items/Pairs/PairItem';
import {ListSeparator} from '../../Components/Common/ListSeparator';
import {SearchTextField} from '../../Components/Common/Inputs/SearchTextField';
import {comp} from '../../Styles/Blocks';
import {usePermissions} from '../../Providers/PermissionsProvider';
import {PAIR_PERMISSIONS} from '../../Utils/Helpers/Permissions';
import {EmptyList} from '../../Components/Blocks/EmptyList';

const Pairs = ({navigation, pairs}) => {
  const {load, getPairs} = usePairs();
  const {isAllowed} = usePermissions();
  const [search, setSearch] = useState('');

  const onCreate = () => navigation.navigate('CreatePair');

  const pairsSearch = useMemo(
    () =>
      pairs.filter(pair =>
        pair.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [pairs, search],
  );

  return (
    <DrawerLayout title={'Пары'} navigation={navigation}>
      <SearchTextField
        search={search}
        setSearch={setSearch}
        placeholder={'Поиск по названию пары'}
      />
      {load ? (
        <Spinner />
      ) : (
        <FlatList
          style={[comp.input]}
          data={pairsSearch}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getPairs} />
          }
          ItemSeparatorComponent={ListSeparator}
          renderItem={({item}) => <PairItem pair={item} />}
          ListEmptyComponent={() => (
            <EmptyList
              title={'Тут пока нет пар'}
              description={'Нажмите на плюсик, чтобы создать пару'}
              search={search}
              entities={pairsSearch}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
      {isAllowed([PAIR_PERMISSIONS.create]) && (
        <CustomFab onPress={onCreate} withoutWrapper={true} />
      )}
    </DrawerLayout>
  );
};

const getState = (state: ReduxStore) => ({pairs: state.pairs.pairs});
export default connect(getState, null)(Pairs);
