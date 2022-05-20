import {DEFAULT_USER_SETTINGS, INSTANCES} from '../../utils/Constants';

export const GROUPS_INITIAL_STATE = {
  group: {title: '', members: [], roles: []},
  groups: [],
  groupMonsters: [],
  groupSettings: {
    discord_webhook: '',
    telegram_channel: '',
    telegram_group_notify: '',
    discord_group_notify: '',
    notification_template_span: DEFAULT_USER_SETTINGS.notification_template_span,
    notification_template_before: DEFAULT_USER_SETTINGS.notification_template_before,
  },
  role: {
    scope: INSTANCES.map(inst => `${inst}.View`),
    name: '',
    description: '',
  },
  member: {
    username: '',
    role: {},
    editMode: false,
  },
  createMemberModal: false,
  createRoleModal: false,
  defaultGroupModal: false,
  groupTimer: {},
};
