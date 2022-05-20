import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {usePremiums} from '../../../providers/PremiumsProvider';
import {CustomText} from '../../common/CustomText';
import {comp} from '../../../Styles/Blocks';
import {useThemes} from '../../../providers/ThemeProvider';
import {HorizontalDivider} from '../../common/HorizontalDivider';
import {PremiumAdvantages} from '../../blocks/premiums/PremiumAdvantages';
import {PremiumCost} from '../../blocks/premiums/PremiumCost';
import {PremiumAllowedDisableTimes} from '../../blocks/premiums/PremiumAllowedDisableTimes';
import {CustomButton} from '../../common/CustomButton';
import {PremiumsStyles} from '../../../Styles/Screens';

export const Premium = ({item}) => {
  const {t} = useTranslation();
  const {theme} = useThemes();
  const [request, setRequest] = useState(false);
  const {createPremiumBill} = usePremiums();

  const onInclude = async () => {
    setRequest(true);
    await createPremiumBill({premium: item.id});
    setRequest(false);
  };

  return (
    <View
      style={[{backgroundColor: theme.listItem}, PremiumsStyles.cardContainer]}>
      <CustomText style={comp.titleText}>
        {item[`name_${t('code')}`]}
      </CustomText>
      <HorizontalDivider />
      <CustomText style={comp.normalText}>
        {t('premiums.premium.advantages')}
      </CustomText>
      <PremiumAdvantages scopes={item?.scopes} />
      <HorizontalDivider />
      <PremiumCost cost={item?.cost} duration={item?.duration} />
      <HorizontalDivider />
      <PremiumAllowedDisableTimes
        allowedDisableTimes={item?.allowed_disable_times}
      />
      <View style={comp.rowContainer}>
        <CustomButton
          type={'clear'}
          title={t('premiums.premium.connect')}
          color={'primary'}
          onPress={onInclude}
          loading={request}
        />
        <View style={comp.flex} />
      </View>
    </View>
  );
};
