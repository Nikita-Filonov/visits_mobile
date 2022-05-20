import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useThemes} from '../../../providers/ThemeProvider';
import {CustomText} from '../../common/CustomText';
import {comp} from '../../../Styles/Blocks';
import {PremiumsStyles} from '../../../Styles/Screens';

export const PremiumCost = ({cost, duration}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();

  const safeDuration = useMemo(
    () =>
      duration ? (
        t('common.dates.intervals.days', {count: duration})
      ) : (
        <Icon
          name={'all-inclusive'}
          type={'material-community'}
          color={theme.text}
        />
      ),
    [duration],
  );

  return (
    <View style={comp.rowContainer}>
      <CustomText style={PremiumsStyles.costText}>
        {t('premiums.premium.price')} {cost}p/{safeDuration}
      </CustomText>
    </View>
  );
};
