import type {Pair} from './Pairs';

export type ReduxStore = {
  pairs: {
    pair: Pair,
    pairs: Pair[],
  },
};
