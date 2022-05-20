import React, {useEffect} from 'react';
import {BackLayout} from '../../Components/Layouts/BackLayout';
import {connect} from 'react-redux';
import {useUserPairs} from '../../Providers/Pairs/UserPairsProvider';
import {UserPairsFab} from '../../Components/common/Fabs/UserPairsFab';

const ViewPair = ({pair}) => {
  const {getUserPairs} = useUserPairs();

  useEffect(() => {
    (async () => pair?.id && (await getUserPairs(pair?.id)))();
  }, [pair?.id]);

  return (
    <BackLayout title={pair.name}>
      <UserPairsFab />
    </BackLayout>
  );
};

const getState = state => ({pair: state.pairs.pair});
export default connect(getState, null)(ViewPair);
