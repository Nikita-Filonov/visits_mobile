import React, {useEffect, useRef, useState} from 'react';
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
import {getCameraPermissions} from '../../utils/Helpers/Permissions';
import UserPairBottomSheet from '../../Components/common/BottomSheets/UserPairBottomSheet';
import {setUserPair} from '../../Redux/Pairs/pairsActions';

const ViewPair = ({navigation, pair, userPairs, setUserPairStore}) => {
  const userPairRef = useRef(null);
  const {load, getUserPairs} = useUserPairs();
  const [checkUsersMode, setCheckUsersMode] = useState(false);

  useEffect(() => {
    (async () => pair?.id && (await getUserPairs(pair?.id)))();
  }, [pair?.id]);

  const onRefresh = async () => await getUserPairs(pair?.id);

  const onCheckUsersMode = () => setCheckUsersMode(!checkUsersMode);
  const onScanStudentQRcCode = async () => {
    const granted = await getCameraPermissions();
    if (granted) {
      navigation.navigate('ScanStudentQRCode');
    }
  };
  const openUserSheet = userPair => async () => {
    setUserPairStore(userPair);
    userPairRef.current.snapTo(0);
  };

  return (
    <BackLayout
      title={pair.name}
      subtitle={getCurrentPairDate()}
      bottom={
        !checkUsersMode && (
          <React.Fragment>
            <UserPairsFab />
            <UserPairBottomSheet ref={userPairRef} />
          </React.Fragment>
        )
      }
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
              <Appbar.Action
                icon="qrcode-scan"
                color={'#FFFFFF'}
                onPress={onScanStudentQRcCode}
              />,
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
          renderItem={({item}) => (
            <UserPairItem
              userPair={item}
              checkUsersMode={checkUsersMode}
              openUserSheet={openUserSheet}
            />
          )}
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
export default connect(getState, {setUserPairStore: setUserPair})(ViewPair);
