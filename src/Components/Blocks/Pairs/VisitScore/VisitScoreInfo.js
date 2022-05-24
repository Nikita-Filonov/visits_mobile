import React from 'react';
import {View} from 'react-native';
import {VisitScoreItem} from './VisitScoreItem';
import {useThemes} from '../../../../Providers/ThemeProvider';
import {HorizontalDivider} from '../../../Common/HorizontalDivider';
import {VISIT_STATES_COLORS} from '../VisitState';
import {VISIT_STATES} from '../../../../Utils/Constants';

export const VisitScoreInfo = () => {
  const {theme} = useThemes();

  return (
    <View
      style={{backgroundColor: theme.listItem, padding: 12, borderRadius: 4}}>
      <VisitScoreItem
        stateColor={VISIT_STATES_COLORS[theme?.mode][VISIT_STATES.wasOnPair]}
      />
      <HorizontalDivider />
      <VisitScoreItem
        stateColor={VISIT_STATES_COLORS[theme?.mode][VISIT_STATES.missedPair]}
      />
      <HorizontalDivider />
      <VisitScoreItem
        stateColor={VISIT_STATES_COLORS[theme?.mode][VISIT_STATES.onSickLeave]}
      />
    </View>
  );
};
