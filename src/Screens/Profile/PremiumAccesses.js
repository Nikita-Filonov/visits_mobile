import React from 'react';
import {BackLayout} from '../../components/Layouts/BackLayout';
import {useTranslation} from 'react-i18next';
import {CustomText} from '../../components/common/CustomText';
import {comp} from '../../Styles/Blocks';
import {DataGrid} from '../../components/common/DataGrid/DataGrid';
import {usePremiums} from '../../Providers/PremiumsProvider';
import {PremiumAccessesColumns} from '../../utils/grids/PremiumAccessesColumns';
import {RefreshControl, ScrollView} from 'react-native';
import {Spinner} from '../../components/common/Spinner';

export const PremiumAccesses = () => {
  const {t} = useTranslation();
  const {load, userPremium, getUserPremium} = usePremiums();
  const {PREMIUM_ACCESS_COLUMNS} = PremiumAccessesColumns();

  return (
    <BackLayout title={t('profile.sidebar.premiumAccesses')}>
      <ScrollView
        contentContainerStyle={comp.scrollViewCenter}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getUserPremium} />
        }>
        <CustomText style={comp.smallText}>
          {t('profile.premiumAccesses.description')}
        </CustomText>
        {load ? (
          <Spinner />
        ) : (
          <DataGrid
            style={[comp.input, comp.bottomList]}
            rows={userPremium.map(p => ({...p, active: p.limit}))}
            columns={PREMIUM_ACCESS_COLUMNS}
          />
        )}
      </ScrollView>
    </BackLayout>
  );
};
