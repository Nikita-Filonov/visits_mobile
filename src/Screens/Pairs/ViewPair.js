import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {BackLayout} from '../../Components/Layouts/BackLayout';
import {useUserPairs} from '../../Providers/Pairs/UserPairsProvider';
import {UserPairsFab} from '../../Components/common/Fabs/UserPairsFab';
import {FlatList, RefreshControl} from 'react-native';
import {UserPairItem} from '../../Components/Items/Pairs/UserPairItem';
import {ListSeparator} from '../../Components/common/ListSeparator';
import {Spinner} from '../../Components/common/Spinner';
import {Appbar} from 'react-native-paper';
import {getCurrentPairDate} from '../../utils/Helpers/Formatters';

const ViewPair = ({pair, userPairs}) => {
  const {load, getUserPairs} = useUserPairs();
  const [checkUsersMode, setCheckUsersMode] = useState(false);

  useEffect(() => {
    (async () => pair?.id && (await getUserPairs(pair?.id)))();
  }, [pair?.id]);

  const onRefresh = async () => await getUserPairs(pair?.id);

  const onCheckUsersMode = () => setCheckUsersMode(!checkUsersMode);

  return (
    <BackLayout
      title={pair.name}
      subtitle={getCurrentPairDate()}
      fab={!checkUsersMode && <UserPairsFab />}
      backButton={
        checkUsersMode && (
          <Appbar.Action
            icon="close"
            color={'#FFFFFF'}
            onPress={onCheckUsersMode}
          />
        )
      }
      actions={
        checkUsersMode
          ? [<Appbar.Action icon="check" color={'#FFFFFF'} />]
          : [
              <Appbar.Action
                icon="account-multiple-check-outline"
                color={'#FFFFFF'}
                onPress={onCheckUsersMode}
              />,
              <Appbar.Action icon="qrcode-scan" color={'#FFFFFF'} />,
            ]
      }>
      {load ? (
        <Spinner />
      ) : (
        <FlatList
          data={userPairs}
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
  pair: state.pairs.pair,
  userPairs: state.pairs.userPairs,
});
export default connect(getState, null)(ViewPair);
