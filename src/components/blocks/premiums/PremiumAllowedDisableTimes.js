import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {useAlerts} from '../../../providers/AlertsProvider';
import {Touchable} from '../Touchable';
import {comp} from '../../../Styles/Blocks';
import {CustomText} from '../../common/CustomText';
import {useThemes} from '../../../providers/ThemeProvider';
import {PremiumsStyles} from '../../../Styles/Screens';

export const PremiumAllowedDisableTimes = ({
  allowedDisableTimes,
  actualDisableTimes = null,
}) => {
  const {t} = useTranslation();
  const {theme} = useThemes();
  const {setConfirmModal} = useAlerts();

  const disabled = actualDisableTimes
    ? t('premiums.premium.actualDisabled', {
        actualDisableTimes,
        allowedDisableTimes,
      })
    : t('premiums.premium.mayBeDisabled', {count: allowedDisableTimes || 0});

  const onInfo = () =>
    setConfirmModal({content: t('premiums.disablePremiumInfoModal')});

  return (
    <View style={comp.rowContainer}>
      <CustomText style={PremiumsStyles.costText}>{disabled}</CustomText>
      <View style={comp.flex} />
      <Touchable
        action={onInfo}
        name={'help-circle-outline'}
        type={'material-community'}
        color={theme.colors.info}
      />
    </View>
  );
};
