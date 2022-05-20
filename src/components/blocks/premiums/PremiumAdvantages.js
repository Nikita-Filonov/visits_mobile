import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {useThemes} from '../../../providers/ThemeProvider';
import {Icon} from 'react-native-elements';
import {CustomText} from '../../common/CustomText';
import {comp} from '../../../Styles/Blocks';
import {PremiumsStyles} from '../../../Styles/Screens';

export const PremiumAdvantages = ({scopes}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();

  const sortScopes = (a, b) =>
    a[`name_${t('code')}`] > b[`name_${t('code')}`] ? 1 : -1;

  return (
    <React.Fragment>
      {scopes?.sort(sortScopes).map((scope, index) => (
        <View
          key={index}
          style={[comp.rowContainer, PremiumsStyles.advantageWrapper]}>
          <Icon
            name={'check'}
            type={'material-community'}
            color={theme.colors.success}
          />
          <CustomText style={PremiumsStyles.advantageText}>
            {scope[`name_${t('code')}`]}
          </CustomText>
        </View>
      ))}
    </React.Fragment>
  );
};
