import React, {useMemo} from 'react';
import {View} from 'react-native';
import {VisitScoreItem} from './VisitScoreItem';
import {useThemes} from '../../../../Providers/ThemeProvider';
import {HorizontalDivider} from '../../../Common/HorizontalDivider';
import {VISIT_STATES_COLORS} from '../VisitState';
import {VISIT_STATES} from '../../../../Utils/Constants';
import {connect} from 'react-redux';
import type {Pair} from '../../../../Models/Pairs';
import type {Visit} from '../../../../Models/Visits';
import {getVisitsScore} from '../../../../Utils/Helpers/Pair';
import {CustomText} from '../../../Common/CustomText';
import {VisitScoreInfoStyles} from '../../../../Styles/Blocks';

type Props = {
  pair: Pair,
  visits: Visit[],
};

const VisitScoreInfo = (props: Props) => {
  const {pair, visits} = props;
  const {theme} = useThemes();

  const missedPair = useMemo(
    () => getVisitsScore(visits, VISIT_STATES.missedPair, pair.missedScore),
    [pair.missedScore, visits],
  );
  const wasOnPair = useMemo(
    () => getVisitsScore(visits, VISIT_STATES.wasOnPair, pair.visitScore),
    [pair.visitScore, visits],
  );
  const onSickLeave = useMemo(
    () => getVisitsScore(visits, VISIT_STATES.onSickLeave, pair.sickScore),
    [pair.sickScore, visits],
  );
  const sumOfScores = useMemo(
    () => missedPair.score + wasOnPair.score + onSickLeave.score,
    [missedPair.score, onSickLeave.score, wasOnPair.score],
  );

  const isShown = useMemo(
    () => pair.visitScore || pair.missedScore || pair.sickScore,
    [pair],
  );

  return !isShown ? null : (
    <View
      style={[
        {backgroundColor: theme.listItem},
        VisitScoreInfoStyles.container,
      ]}>
      {pair.visitScore && (
        <VisitScoreItem
          title={`Баллы за посещения: ${wasOnPair.score}`}
          subtitle={`Всего посещений: ${wasOnPair.numberOfVisits}`}
          stateColor={VISIT_STATES_COLORS[theme?.mode][VISIT_STATES.wasOnPair]}
        />
      )}
      {pair.visitScore && <HorizontalDivider />}
      {pair.missedScore && (
        <VisitScoreItem
          title={`Баллы за пропуски: ${missedPair.score}`}
          subtitle={`Всего пропусков: ${missedPair.numberOfVisits}`}
          stateColor={VISIT_STATES_COLORS[theme?.mode][VISIT_STATES.missedPair]}
        />
      )}
      {pair.missedScore && <HorizontalDivider />}
      {pair.sickScore && (
        <VisitScoreItem
          title={`Баллы за больничный: ${onSickLeave.score}`}
          subtitle={`Всего на больничном: ${onSickLeave.numberOfVisits}`}
          stateColor={
            VISIT_STATES_COLORS[theme?.mode][VISIT_STATES.onSickLeave]
          }
        />
      )}
      <HorizontalDivider />
      <CustomText style={VisitScoreInfoStyles.resultTitle}>
        Всего баллов: {sumOfScores}
      </CustomText>
    </View>
  );
};

const getState = state => ({
  pair: state.pairs.pair,
  visits: state.pairs.visits,
});
export default connect(getState, null)(VisitScoreInfo);
