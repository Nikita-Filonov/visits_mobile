import type {User} from './User';
import type {Group} from './Group';

export type CreateGroupUser = {
  userId: number,
  groupId: number,
};

export type GroupUser = {
  id: number,
  user: User,
  group: Group,
};
