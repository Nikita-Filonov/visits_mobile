import React, {useMemo} from 'react';
import {USER_PREMIUM_STATUS_ICONS, USER_PREMIUM_STATUSES} from '../../../utils/Constants';
import {useTranslation} from 'react-i18next';
import {CustomText} from '../../common/CustomText';
import {Icon} from 'react-native-elements';
import {useThemes} from '../../../providers/ThemeProvider';
import {Linking, View} from 'react-native';
import {comp} from '../../../styles/Blocks';
import {Touchable} from '../Touchable';


export const PremiumStatus = ({status, payUrl}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();

  const icon = USER_PREMIUM_STATUS_ICONS[status];
  const onPayUrl = async () => payUrl && await Linking.openURL(payUrl);

  const isPayUrlShown = useMemo(() =>
    status === USER_PREMIUM_STATUSES.WAITING ||
    status === USER_PREMIUM_STATUSES.WAITING_FOR_EXTEND, [status]);

  return (
    <View style={comp.rowContainer}>
      <CustomText>{t('profile.myPremiums.premiumStatus')}: {t(`profile.myPremiums.statuses.${status}`)}</CustomText>
      <Icon {...USER_PREMIUM_STATUS_ICONS[status]} color={theme.colors[icon.color]} style={{marginLeft: 15}}/>
      <View style={comp.flex}/>
      {isPayUrlShown && <Touchable name={'link'} type={'material-community'} action={onPayUrl}/>}
    </View>
  );
};
