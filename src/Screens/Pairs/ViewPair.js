import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {BackLayout} from '../../Components/Layouts/BackLayout';
import {useUserPairs} from '../../Providers/Pairs/UserPairsProvider';
import {UserPairsFab} from '../../Components/Common/Fabs/UserPairsFab';
import {FlatList, RefreshControl} from 'react-native';
import {UserPairItem} from '../../Components/Items/Pairs/UserPairItem';
import {ListSeparator} from '../../Components/Common/ListSeparator';
import {Spinner} from '../../Components/Common/Spinner';
import {Appbar} from 'react-native-paper';
import {getCurrentPairDate} from '../../Utils/Helpers/Formatters';
import {getCameraPermissions} from '../../Utils/Helpers/Permissions';
import UserPairBottomSheet from '../../Components/Common/BottomSheets/UserPairBottomSheet';
import {setUserPair} from '../../Redux/Pairs/pairsActions';
import {goBack, navigate} from '../../Components/Navigation/RootNavigation';

const ViewPair = ({route, navigation, pair, userPairs, setUserPairStore}) => {
  const {isCreation} = route.params;
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

  const onBack = () => (isCreation ? navigate('Pairs') : goBack());

  return (
    <BackLayout
      title={pair.name}
      subtitle={getCurrentPairDate()}
      onBack={onBack}
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
