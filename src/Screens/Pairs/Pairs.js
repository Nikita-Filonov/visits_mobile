import React from 'react';
import {DrawerLayout} from '../../components/Layouts/DrawerLayout';
import {CustomFab} from '../../components/common/CustomFab';
import {connect} from 'react-redux';
import {ReduxStore} from '../../Models/Store';
import {FlatList, RefreshControl} from 'react-native';
import {usePairs} from '../../Providers/PairsProvider';
import {Spinner} from '../../components/common/Spinner';
import {PairItem} from '../../components/Items/Pairs/PairItem';
import {ListSeparator} from '../../components/common/ListSeparator';

const Pairs = ({navigation, pairs}) => {
  const {load, getPairs} = usePairs();

  const onCreate = () => navigation.navigate('CreatePair');

  return (
    <DrawerLayout title={'Пары'} navigation={navigation}>
      {load ? (
        <Spinner />
      ) : (
        <FlatList
          data={pairs}
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
