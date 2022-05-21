import type {User} from './User';
import type {Pair} from './Pairs';
import type {Visit} from './Visits';

export type UserPair = {
  id: number,
  user: User,
  pair: Pair,
  visit: Visit,
};
