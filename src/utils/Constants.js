import {CardStyleInterpolators} from '@react-navigation/stack';
import {
  EVENT,
  EVENT_HISTORY,
  GROUP,
  GROUP_SETTINGS,
  MEMBER,
  ROLE,
} from './permissions/Groups';
import {
  EVENT_NOTIFICATIONS_SCOPES,
  EVENT_SCOPES,
  GROUP_EVENT_SCOPES,
  GROUP_MEMBER_SCOPES,
  GROUP_NOTIFICATIONS_SCOPES,
  GROUP_ROLES_SCOPES,
  GROUPS_SCOPES,
  MONSTER_SCOPES,
  TIMER_HISTORY_SCOPES,
} from './permissions/Premium';
import {baseUrl} from './Links';

export const itemsPerPage = 10;

export const MAX_FILE_SIZE = 3 * 1024 * 1024;

export const GROUP_SETTING_INTERVAL = 15000; // 15s

export const NOTIFICATIONS_SETTINGS_BACKUP = 'notificationsSettings';
export const LOCALE_BACKUP = 'locale';
export const THEME_BACKUP = 'theme';
export const TOKEN_BACKUP = 'token';
export const GROUP_BACKUP = 'group';
export const LANGUAGE_BACKUP = 'language';
export const TIMERS_SORT_BACKUP = 'sortTimers';
export const GROUP_TIMERS_SORT_BACKUP = 'sortGroupTimers';
export const DEFAULT_GROUP_BACKUP = 'defaultGroup';
export const TIMERS_COMMENT_SHOWN_BACKUP = 'timersCommentShown';
export const GROUP_TIMERS_COMMENT_SHOWN_BACKUP = 'groupTimersCommentShown';

export const SUPPORTED_LOCALES = {
  ru: 'ru-RU',
  en: 'en-US',
};
export const LOCALE_IMAGES = {
  [SUPPORTED_LOCALES.ru]: baseUrl + 'static/images/Flag_of_Russia.png',
  [SUPPORTED_LOCALES.en]:
    baseUrl + 'static/images/Flag_of_the_United_Kingdom.png',
};

export const STACK_OPTIONS = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const DATETIME_TIMER_FORMAT = 'DD.MM в HH:mm:ss';
export const PICKER_TIME_FORMAT = 'HH:mm:ss';
export const PICKER_DATE_FORMAT = 'DD/MM/YYYY';
export const PICKER_DATETIME_FORMAT = 'DD/MM/YYYY HH:mm:ss';

export const DEFAULT_USER_SETTINGS = {
  monsters: [],
  audio: 'static/sounds/bell_1.mp3',
  volume: 0.5,
  comments: [],
  muted_groups: [],
  telegram_notify: '',
  vk_notify: '',
  mobile_notify: '',
  app_notify: '',
  drop_missed: true,
  notification_template_span: {
    title: '',
    content: '',
    datetime: '',
  },
  notification_template_before: {
    title: '',
    content: '',
    datetime: '',
  },
};

export const DEFAULT_USER = {
  username: '',
  email: '',
  discord_webhook: '',
  telegram_username: '',
};

export const INSTANCES = [
  'Group',
  'Event',
  'Member',
  'Role',
  'GroupSettings',
  'TimerHistory',
];

export const DISABLE_SWIPE = {
  timers: ['CreateTimer'],
  groups: [
    'GroupSettings',
    'CreateGroup',
    'GroupTimers',
    'ImportTimers',
    'TimerHistory',
    'GroupHistory',
    'CreateGroupTimer',
    'GroupSettingsGeneral',
    'GroupSettingsMembers',
    'GroupSettingsRoles',
    'GroupSettingsNotifications',
    'GroupSettingsNotificationTemplate',
    'GroupSettingsNotificationFormatters',
  ],
  premiums: ['PremiumsInfo'],
  profile: [
    'MyPremiums',
    'PremiumAccesses',
    'Profile',
    'TelegramProfile',
    'VkProfile',
    'ChangePassword',
  ],
  setting: [
    'CommentsSettings',
    'MonstersSettings',
    'LanguageSettings',
    'NotificationsSettings',
    'SoundsSettings',
    'NotificationsFormattersSettings',
    'NotificationsTemplatesSettings',
  ],
};

export const GROUP_SCOPES = [
  {
    section: {
      label: 'Group',
      icon: {name: 'card-text-outline', type: 'material-community'},
    },
    data: [
      {label: 'View', scope: GROUP.view},
      {label: 'Create', scope: GROUP.create},
      {label: 'Update', scope: GROUP.update},
      {label: 'Delete', scope: GROUP.delete},
    ],
  },
  {
    section: {label: 'Event', icon: {name: 'people-outline', type: 'material'}},
    data: [
      {label: 'View', scope: EVENT.view},
      {label: 'Create', scope: EVENT.create},
      {label: 'Update', scope: EVENT.update},
      {label: 'Delete', scope: EVENT.delete},
    ],
  },
  {
    section: {
      label: 'Member',
      icon: {name: 'account-supervisor-outline', type: 'material-community'},
    },
    data: [
      {label: 'View', scope: MEMBER.view},
      {label: 'Create', scope: MEMBER.create},
      {label: 'Update', scope: MEMBER.update},
      {label: 'Delete', scope: MEMBER.delete},
    ],
  },
  {
    section: {
      label: 'Role',
      icon: {name: 'table-column', type: 'material-community'},
    },
    data: [
      {label: 'View', scope: ROLE.view},
      {label: 'Create', scope: ROLE.create},
      {label: 'Update', scope: ROLE.update},
      {label: 'Delete', scope: ROLE.delete},
    ],
  },
  {
    section: {
      label: 'GroupSettings',
      icon: {name: 'view-dashboard-outline', type: 'material-community'},
    },
    data: [
      {label: 'View', scope: GROUP_SETTINGS.view},
      {label: 'Create', scope: GROUP_SETTINGS.create},
      {label: 'Update', scope: GROUP_SETTINGS.update},
      {label: 'Delete', scope: GROUP_SETTINGS.delete},
    ],
  },
  {
    section: {
      label: 'TimerHistory',
      icon: {name: 'comment-multiple-outline', type: 'material-community'},
    },
    data: [
      {label: 'View', scope: EVENT_HISTORY.view},
      {label: 'Create', scope: EVENT_HISTORY.create},
      {label: 'Update', scope: EVENT_HISTORY.update},
      {label: 'Delete', scope: EVENT_HISTORY.delete},
    ],
  },
];

export const CLIENTS = {
  TELEGRAM: 'Telegram',
  DISCORD: 'Discord',
  MOBILE: 'Mobile',
  VK: 'Vkontakte',
};

export const TELEGRAM_BOT = 'https://t.me/rq_timer_bot';
export const VK_GROUP_DIALOG = 'https://vk.com/im?sel=-205253159';
export const DATETIME_FORMATTERS_DOC =
  'https://docs.google.com/document/d/1B1DeRSR8bQs4Y7DFPW3hLp2rZdhhvSHgmfMPMamMclU/edit?usp=sharing';

export const TIMERS_SORT = [
  {
    value: 'killed',
    icon: {name: 'calendar-times-o', type: 'font-awesome'},
  },
  {
    value: 'span',
    icon: {name: 'timer-outline', type: 'material-community'},
  },
  {
    value: 'missed',
    icon: {name: 'phone-missed', type: 'feather'},
  },
  {
    value: 'monster__name',
    icon: {name: 'pets', type: 'material'},
  },
];

export const PREMIUMS_SCOPES = [
  {action: MONSTER_SCOPES.create, limit: true},
  {action: GROUPS_SCOPES.create, limit: true},
  {action: GROUPS_SCOPES.imageChange, limit: null},
  {action: GROUP_NOTIFICATIONS_SCOPES.telegramNotifications, limit: null},
  {action: GROUP_NOTIFICATIONS_SCOPES.discordNotifications, limit: null},
  {action: EVENT_SCOPES.create, limit: true},
  {action: GROUP_EVENT_SCOPES.create, limit: true},
  {action: GROUP_MEMBER_SCOPES.create, limit: true},
  {action: TIMER_HISTORY_SCOPES.view, limit: null},
  {action: TIMER_HISTORY_SCOPES.restore, limit: null},
  {action: GROUP_ROLES_SCOPES.change, limit: null},
  {action: EVENT_NOTIFICATIONS_SCOPES.telegramNotifications, limit: null},
  {action: EVENT_NOTIFICATIONS_SCOPES.vkNotifications, limit: null},
  {action: EVENT_NOTIFICATIONS_SCOPES.mobileNotifications, limit: null},
];

export const USER_PREMIUM_STATUSES = {
  WAITING: 'WAITING',
  PAID: 'PAID',
  ACTIVE: 'ACTIVE',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
  DISABLED: 'DISABLED',
  DISABLED_TEMPORARILY: 'DISABLED_TEMPORARILY',
  WAITING_FOR_EXTEND: 'WAITING_FOR_EXTEND',
};

export const USER_PREMIUM_STATUS_ICONS = {
  [USER_PREMIUM_STATUSES.WAITING]: {
    name: 'sync',
    type: 'material',
    color: 'info',
  },
  [USER_PREMIUM_STATUSES.PAID]: {
    name: 'check',
    type: 'material-community',
    color: 'success',
  },
  [USER_PREMIUM_STATUSES.ACTIVE]: {
    name: 'check',
    type: 'material-community',
    color: 'success',
  },
  [USER_PREMIUM_STATUSES.REJECTED]: {
    name: 'close',
    type: 'material-community',
    color: 'error',
  },
  [USER_PREMIUM_STATUSES.EXPIRED]: {
    name: 'close',
    type: 'material-community',
    color: 'warning',
  },
  [USER_PREMIUM_STATUSES.DISABLED]: {
    name: 'close',
    type: 'material-community',
    color: 'error',
  },
  [USER_PREMIUM_STATUSES.DISABLED_TEMPORARILY]: {
    name: 'do-not-disturb',
    type: 'material',
    color: 'inherit',
  },
  [USER_PREMIUM_STATUSES.WAITING_FOR_EXTEND]: {
    name: 'sync',
    type: 'material',
    color: 'info',
  },
};

export const GAME_PROVIDERS = [{code: 'royal_quest', name: 'Royal Quest'}];

export const DEFAULT_THEME_SETTINGS = {
  themeMode: 'dark',
  snackbar: {
    show: true,
  },
};
