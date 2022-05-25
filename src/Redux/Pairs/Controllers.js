import type {UserPair} from '../../Models/UserPair';
import type {GroupUser} from '../../Models/GroupUser';

type PayloadProps = {
  readyState: boolean,
  userPairs?: UserPair[],
  groupUsers?: GroupUser[],
};

type ActionProps = {
  payload: PayloadProps | UserPair[] | GroupUser[],
};

export const setUsersPairsState = (
  state: Object,
  action: ActionProps,
  store: 'userPairs' | 'groupUsers',
) => {
  if (action.payload.readyState) {
    const userPairs = [...state[store], ...action.payload[store]].filter(
      (value, index, self) =>
        index === self.findIndex(userPair => userPair.id === value.id),
    );

    return {...state, [store]: userPairs};
  }

  return {...state, [store]: action.payload};
};
