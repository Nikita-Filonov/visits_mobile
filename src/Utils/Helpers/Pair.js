import type {Visit} from '../../Models/Visits';

type GetScoreProps = {
  numberOfVisits: number,
  score: number,
};

export const getVisitsScore = (
  visits: Visit[],
  state: number,
  multiplyBy: number = null,
): GetScoreProps => {
  const numberOfVisits = visits.filter(visit => visit.state === state).length;
  const score = (multiplyBy || 0) * numberOfVisits;

  return {numberOfVisits, score};
};
