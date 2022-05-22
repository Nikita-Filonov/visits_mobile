import React, {useMemo, useState} from 'react';
import {DrawerLayout} from '../../Components/Layouts/DrawerLayout';
import {CustomFab} from '../../Components/common/Fabs/CustomFab';
import {connect} from 'react-redux';
import {ReduxStore} from '../../Models/Store';
import {FlatList, RefreshControl} from 'react-native';
import {usePairs} from '../../Providers/Pairs/PairsProvider';
import {Spinner} from '../../Components/common/Spinner';
import PairItem from '../../Components/Items/Pairs/PairItem';
import {ListSeparator} from '../../Components/common/ListSeparator';
import {SearchTextField} from '../../Components/common/Inputs/SearchTextField';

const Pairs = ({navigation, pairs}) => {
  const {load, getPairs} = usePairs();
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
          data={pairsSearch}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getPairs} />
          }
          ItemSeparatorComponent={ListSeparator}
          renderItem={({item}) => <PairItem pair={item} />}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
      <CustomFab onPress={onCreate} withoutWrapper={true} />
    </DrawerLayout>
  );
};

const getState = (state: ReduxStore) => ({pairs: state.pairs.pairs});
export default connect(getState, null)(Pairs);
