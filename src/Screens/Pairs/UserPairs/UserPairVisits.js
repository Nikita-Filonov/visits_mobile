import React, {useEffect} from 'react';
import {BackLayout} from '../../../Components/Layouts/BackLayout';
import {UserPair} from '../../../Models/UserPair';
import {useUserPairs} from '../../../Providers/Pairs/UserPairsProvider';
import {FlatList, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {Visit} from '../../../Models/Visits';
import {PairVisitItem} from '../../../Components/Items/Pairs/PairVisitItem';
import {ListSeparator} from '../../../Components/Common/ListSeparator';
import {comp} from '../../../Styles/Blocks';
import VisitScoreInfo from '../../../Components/Blocks/Pairs/VisitScore/VisitScoreInfo';
import {Spinner} from '../../../Components/Common/Spinner';
import {EmptyList} from '../../../Components/Blocks/EmptyList';

type Props = {
  userPair: UserPair,
  visits: Visit[],
};

const UserPairVisits = (props: Props) => {
  const {userPair, visits} = props;
  const {load, getVisits} = useUserPairs();

  useEffect(() => {
    (async () =>
      userPair.pair.id &&
      userPair.user.id &&
      (await getVisits(userPair.pair.id, userPair.user.id)))();
  }, [userPair.pair.id, userPair.user.id]);

  const onRefresh = async () =>
    await getVisits(userPair.pair.id, userPair.user.id);

  return (
    <BackLayout
      title={'Посещения'}
      subtitle={`${userPair.user.username}, ${userPair.user.email}`}>
      {load ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {visits.length > 0 && <VisitScoreInfo />}
          <FlatList
            style={comp.input}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            data={visits}
            renderItem={({item}) => <PairVisitItem visit={item} />}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <EmptyList
                title={'У студента пока нет посещений'}
                description={
                  'Посещения появятся, когда вы отметите студента на паре'
                }
              />
            )}
            ItemSeparatorComponent={ListSeparator}
          />
        </React.Fragment>
      )}
    </BackLayout>
  );
};

const getState = state => ({
  visits: state.pairs.visits,
  userPair: state.pairs.userPair,
});
export default connect(getState, null)(UserPairVisits);
