import React from 'react';
import {List} from 'react-native-paper';
import {help} from '../../../styles/Items';
import {useTranslation} from 'react-i18next';
import {useThemes} from '../../../providers/ThemeProvider';
import {CustomText} from '../../common/CustomText';
import {Icon} from 'react-native-elements';

export const Help = ({item}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();

  return (
    <List.Accordion
      id={item.id}
      title={item[`${t('code')}_title`]}
      titleStyle={{color: theme.text}}
      titleNumberOfLines={4}
      style={{backgroundColor: theme.listItem}}
      right={({isExpanded}) =>
        <Icon name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} type={'material'} color={theme.text}/>
      }
    >
      <CustomText style={help.text}>{item[`${t('code')}_content`]}</CustomText>
    </List.Accordion>
  );
};
