import React, {useMemo} from 'react';
import {ThemeStyles, useThemes} from '../../../Providers/ThemeProvider';
import {VISIT_STATES} from '../../../utils/Constants';
import {CustomText} from '../../Common/CustomText';
import {useTranslation} from 'react-i18next';
import type {Visit} from '../../../Models/Visits';

export const VISIT_STATES_COLORS = {
  [ThemeStyles.default.mode]: {
    [VISIT_STATES.wasOnPair]: ThemeStyles.default.button.primary,
    [VISIT_STATES.missedPair]: ThemeStyles.default.button.error,
    [VISIT_STATES.onSickLeave]: ThemeStyles.default.button.warning,
  },
  [ThemeStyles.dark.mode]: {
    [VISIT_STATES.wasOnPair]: ThemeStyles.dark.button.primary,
    [VISIT_STATES.missedPair]: ThemeStyles.dark.button.error,
    [VISIT_STATES.onSickLeave]: ThemeStyles.dark.button.warning,
  },
};

type Props = {
  visit?: Visit,
};

export const VisitState = (props: Props) => {
  const {theme} = useThemes();
  const {t} = useTranslation();

  const state = useMemo(
    () =>
      props?.visit?.state
        ? t(`pairs.visits.state_${props.visit.state}`)
        : 'Не был отмечен',
    [props?.visit?.state],
  );

  return (
    <CustomText
      style={
        props?.visit?.state
          ? {color: VISIT_STATES_COLORS[theme?.mode][props.visit.state]}
          : null
      }>
      {state}
    </CustomText>
  );
};
