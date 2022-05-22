import React, {useEffect} from 'react';
import {BackLayout} from '../../../Components/Layouts/BackLayout';
import {UserPair} from '../../../Models/UserPair';
import {useUserPairs} from '../../../Providers/Pairs/UserPairsProvider';

type Props = {
  userPair: UserPair,
};

export const UserPairVisits = (props: Props) => {
  const {userPair} = props;
  const {getVisits} = useUserPairs();

  useEffect(() => {
    (async () =>
      userPair.pair.id &&
      userPair.user.id &&
      (await getVisits(userPair.pair.id, userPair.user.id)))();
  }, [userPair.pair.id, userPair.user.id]);

  return <BackLayout title={'Посещения'} subtitle={userPair.user.username} />;
};
