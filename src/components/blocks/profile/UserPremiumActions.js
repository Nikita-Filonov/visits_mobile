import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {USER_PREMIUM_STATUSES} from '../../../utils/Constants';
import {usePremiums} from '../../../providers/PremiumsProvider';
import {View} from 'react-native';
import {comp} from '../../../Styles/Blocks';
import {PremiumIsActive} from '../premiums/PremiumIsActive';
import {CustomButton} from '../../common/CustomButton';
import {useAlerts} from '../../../providers/AlertsProvider';

export const UserPremiumActions = ({item, isBefore}) => {
  const {t} = useTranslation();
  const {setConfirmModal} = useAlerts();
  const {
    extendUserPremium,
    disableUserPremiumTemporarily,
    enableUserPremiumTemporarily,
  } = usePremiums();

  const status = useMemo(() => item?.status, [item?.status]);
  const allowDisableTemporarily =
    !(status === USER_PREMIUM_STATUSES.ACTIVE) ||
    !item?.premium?.allowed_disable_times ||
    item?.premium?.allowed_disable_times === item?.actual_disabled_times;
  const allowExtend =
    !(
      status === USER_PREMIUM_STATUSES.ACTIVE ||
      status === USER_PREMIUM_STATUSES.DISABLED
    ) || item.premium.cost <= 0;

  const onExtend = async () => await extendUserPremium(item.id);
  const onEnable = async () => await enableUserPremiumTemporarily(item.id);
  const onDisable = async () =>
    setConfirmModal({
      content: t('profile.myPremiums.disablePremiumModal'),
      action: async () => await disableUserPremiumTemporarily(item.id),
    });

  return (
    <View style={comp.rowContainer}>
      <CustomButton
        type={'clear'}
        color={'primary'}
        disabled={allowExtend}
        title={t('profile.myPremiums.extend')}
        onPress={onExtend}
      />
      {status === USER_PREMIUM_STATUSES.DISABLED_TEMPORARILY ? (
        <CustomButton
          type={'clear'}
          disabled={!item.expires}
          color={'primary'}
          onPress={onEnable}
          title={t('profile.myPremiums.resume')}
        />
      ) : (
        <CustomButton
          type={'clear'}
          disabled={allowDisableTemporarily}
          color={'error'}
          onPress={onDisable}
          title={t('profile.myPremiums.finishOnTime')}
        />
      )}
      <View style={comp.flex} />
      <PremiumIsActive status={status} isBefore={isBefore} />
    </View>
  );
};
