import React from 'react';
import {BackLayout} from '../../components/layouts/BackLayout';
import {Trans, useTranslation} from 'react-i18next';
import {CustomText} from '../../components/common/CustomText';
import {comp} from '../../styles/Blocks';
import {Link} from '../../components/common/Link';
import {ScrollView} from 'react-native';
import {HorizontalDivider} from '../../components/common/HorizontalDivider';
import {DataGrid} from '../../components/common/DataGrid/DataGrid';
import {PremiumAccessesInfoColumns} from '../../utils/grids/PremiumAccessesInfoColumns';
import {PREMIUMS_SCOPES} from '../../utils/Constants';

export const PremiumsInfo = ({navigation}) => {
  const {t} = useTranslation();
  const {PREMIUM_ACCESS_INFO_COLUMNS} = PremiumAccessesInfoColumns();

  const onMyPremiums = () => navigation.navigate('Profile', {screen: 'MyPremiums'});
  const onPremiumAccesses = () => navigation.navigate('Profile', {screen: 'PremiumAccesses'});

  return (
    <BackLayout title={t('premiums.info.title')}>
      <ScrollView>
        <CustomText style={comp.titleText}>{t('premiums.info.commonInfo.title')}</CustomText>
        <CustomText style={[comp.smallText, comp.input]}>{t('premiums.info.commonInfo.block_1')}</CustomText>
        <CustomText style={[comp.smallText, comp.input]}>
          <Trans
            defaults={t('premiums.info.commonInfo.block_2')}
            components={[<Link onPress={onPremiumAccesses}/>, <Link onPress={onMyPremiums}/>]}
          />
        </CustomText>
        <HorizontalDivider/>

        <CustomText style={[comp.titleText, comp.input]}>{t('profile.sidebar.premiumAccesses')}</CustomText>
        <CustomText style={[comp.smallText, comp.input]}>{t('premiums.info.premiumAccesses.block_1')}</CustomText>
        <CustomText style={[comp.smallText, comp.input]}>{t('premiums.info.premiumAccesses.block_2')}</CustomText>
        <CustomText style={[comp.smallText, comp.input]}>{t('premiums.info.premiumAccesses.block_3')}</CustomText>
        <DataGrid
          style={comp.input}
          rows={PREMIUMS_SCOPES}
          columns={PREMIUM_ACCESS_INFO_COLUMNS}
        />
        <HorizontalDivider/>

        <CustomText style={[comp.titleText, comp.input]}>{t('premiums.info.premEnded.title')}</CustomText>
        <CustomText style={[comp.smallText, comp.input]}>{t('premiums.info.premEnded.block_1')}</CustomText>
        <CustomText style={[comp.smallText, comp.input]}>{t('premiums.info.premEnded.block_2')}</CustomText>
        <CustomText style={[comp.smallText, comp.input]}>{t('premiums.info.premEnded.block_3')}</CustomText>
      </ScrollView>
    </BackLayout>
  );
};
