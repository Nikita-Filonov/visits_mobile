import React, {useEffect, useRef} from 'react';
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
import {EmptyList} from '../../Components/Blocks/EmptyList';

const ViewPair = ({route, navigation, pair, userPairs, setUserPairStore}) => {
  const {isCreation} = route.params;
  const userPairRef = useRef(null);
  const {load, getUserPairs} = useUserPairs();

  useEffect(() => {
    (async () => pair?.id && (await getUserPairs(pair?.id)))();
  }, [pair?.id]);

  const onRefresh = async () => await getUserPairs(pair?.id);

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
        <React.Fragment>
          <UserPairsFab />
          <UserPairBottomSheet ref={userPairRef} />
        </React.Fragment>
      }
      actions={[
        <Appbar.Action
          icon="qrcode-scan"
          color={'#FFFFFF'}
          onPress={onScanStudentQRcCode}
        />,
      ]}>
      {load ? (
        <Spinner />
      ) : (
        <FlatList
          data={userPairs}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          renderItem={({item}) => (
            <UserPairItem userPair={item} openUserSheet={openUserSheet} />
          )}
          ListEmptyComponent={() => (
            <EmptyList
              title={'В паре пока нет студентов'}
              description={
                'Нажмите на плюсик, чтобы добавить студента или отсканируйте QR-код'
              }
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
