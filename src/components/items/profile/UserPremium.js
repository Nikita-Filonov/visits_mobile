import React, {useMemo} from 'react';
import {View} from 'react-native';
import {PremiumsStyles} from '../../../styles/Screens';
import {useThemes} from '../../../providers/ThemeProvider';
import {CustomText} from '../../common/CustomText';
import {comp} from '../../../styles/Blocks';
import {HorizontalDivider} from '../../common/HorizontalDivider';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {PremiumAdvantages} from '../../blocks/premiums/PremiumAdvantages';
import {PremiumCost} from '../../blocks/premiums/PremiumCost';
import {PremiumStatus} from '../../blocks/premiums/PremiumStatus';
import {PremiumAllowedDisableTimes} from '../../blocks/premiums/PremiumAllowedDisableTimes';
import {UserPremiumActions} from '../../blocks/profile/UserPremiumActions';

export const UserPremium = ({item}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();

  moment.locale(t('code'));

  const isBefore = useMemo(() => moment(item.expires).isBefore(), [item.expires]);
  const expiresWhen = useMemo(() => item.expires
    ? moment(item.expires).format('D MMMM YYYY, HH:mm')
    : t('profile.myPremiums.never'), [item.expires, t]);

  const disabledWhen = useMemo(() =>
    item.disabled_when && moment(item.disabled_when).format('D MMMM YYYY, HH:mm'), [item.disabled_when]);

  return (
    <View style={[{backgroundColor: theme.listItem}, PremiumsStyles.cardContainer]}>
      <CustomText style={comp.titleText}>{item.premium[`name_${t('code')}`]}</CustomText>
      {disabledWhen
        ? <CustomText>{t('profile.myPremiums.disabled')} {disabledWhen}</CustomText>
        : <CustomText>
          {isBefore ? t('profile.myPremiums.expired') : t('profile.myPremiums.expires')} {expiresWhen}
        </CustomText>
      }
      <HorizontalDivider/>
      <PremiumAdvantages scopes={item?.scopes}/>
      <HorizontalDivider/>
      <PremiumCost cost={item?.premium?.cost} duration={item?.premium?.duration}/>
      <HorizontalDivider/>
      <PremiumStatus status={item?.status} payUrl={item?.pay_url}/>
      <HorizontalDivider/>
      <PremiumAllowedDisableTimes
        allowedDisableTimes={item?.premium?.allowed_disable_times}
        actualDisableTimes={item?.actual_disabled_times}
      />
      <UserPremiumActions item={item} isBefore={isBefore}/>
    </View>
  );
};
