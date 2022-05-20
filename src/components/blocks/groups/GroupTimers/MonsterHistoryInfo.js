import React from 'react';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {DATETIME_TIMER_FORMAT} from '../../../../utils/Constants';
import {CustomText} from '../../../common/CustomText';
import {Icon} from 'react-native-elements';
import {useThemes} from '../../../../providers/ThemeProvider';
import {View} from 'react-native';
import {comp} from '../../../../styles/Blocks';
import {history} from '../../../../styles/Items';


export const MonsterHistoryInfo = ({template}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();

  const l = (key) => t(`groups.timers.history.fields.${key}`);
  const lNull = (key) => t(`groups.timers.history.fields.${key}Null`);
  const resolveFromTo = (key, value) => (key === 'killed' && value) ? moment(value).format(DATETIME_TIMER_FORMAT) : value;
  const from = (field) => resolveFromTo(field?.key, field?.from) || lNull(field?.key);
  const to = (field) => resolveFromTo(field?.key, field?.to) || lNull(field?.key);

  return (
    <React.Fragment>
      {template?.fields?.length > 0
        ? <React.Fragment>
          {template?.fields.map((field, index) =>
            <View key={index} style={history.monsterHistoryInfoContainer}>
              <CustomText style={comp.captionText}>{l(field?.key)}: {from(field)}</CustomText>
              <Icon size={18} name={'arrow-right-alt'} type={'material'} color={theme.text} style={history.arrowIcon}/>
              <CustomText style={comp.captionText}>{to(field)}</CustomText>
            </View>,
          )}
        </React.Fragment>
        : <React.Fragment>
          <CustomText>
            {l('killed')}: {resolveFromTo('killed', template?.origin?.killed) || lNull('killed')}
          </CustomText>
        </React.Fragment>
      }
    </React.Fragment>
  );
};
