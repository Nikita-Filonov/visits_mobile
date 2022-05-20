import React, {useEffect} from 'react';
import {BackLayout} from '../../Components/Layouts/BackLayout';
import {useTranslation} from 'react-i18next';
import {usePremiums} from '../../Providers/PremiumsProvider';
import {Spinner} from '../../Components/common/Spinner';
import {UserPremium} from '../../Components/Items/profile/UserPremium';
import {FlatList, RefreshControl} from 'react-native';
import {ListSeparator} from '../../Components/common/ListSeparator';

export const MyPremiums = () => {
  const {t} = useTranslation();
  const {load, userPremiums, getUserPremiums} = usePremiums();

  useEffect(() => {
    (async () => await getUserPremiums())();
  }, []);

  return (
    <BackLayout title={t('profile.sidebar.myPremiums')}>
      {load ? (
        <Spinner />
      ) : (
        <FlatList
          data={userPremiums}
          removeClippedSubviews={true}
          ItemSeparatorComponent={ListSeparator}
          refreshControl={
            <RefreshControl refreshing={load} onRefresh={getUserPremiums} />
          }
          renderItem={({item}) => <UserPremium key={item.id} item={item} />}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </BackLayout>
  );
};
