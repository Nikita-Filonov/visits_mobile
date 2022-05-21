import React, {useMemo} from 'react';
import {ThemeStyles} from '../../../Providers/ThemeProvider';
import {VISIT_STATES} from '../../../utils/Constants';
import {CustomText} from '../../common/CustomText';
import {useTranslation} from 'react-i18next';

export const VISIT_STATES_COLORS = {
  [ThemeStyles.default.mode]: {
    [VISIT_STATES.wasOnPair]: ThemeStyles.default.button.primary,
    [VISIT_STATES.missedPair]: ThemeStyles.default.button.error,
    [VISIT_STATES.onSickLeave]: ThemeStyles.default.button.primary,
  },
  [ThemeStyles.dark.mode]: {
    [VISIT_STATES.wasOnPair]: ThemeStyles.dark.button.primary,
    [VISIT_STATES.missedPair]: ThemeStyles.dark.button.error,
    [VISIT_STATES.onSickLeave]: ThemeStyles.dark.button.primary,
  },
};

export const VisitState = ({visit}) => {
  const {t} = useTranslation();

  const state = useMemo(
    () => (visit ? t(`pairs.visits.state_${visit}`) : 'Не был отмечен'),
    [visit],
  );

  return (
    <CustomText style={visit ? {color: VISIT_STATES_COLORS[visit]} : null}>
      {state}
    </CustomText>
  );
};
