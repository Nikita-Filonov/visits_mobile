import {CardStyleInterpolators} from '@react-navigation/stack';

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

export const STACK_OPTIONS = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export const DATETIME_TIMER_FORMAT = 'DD.MM в HH:mm:ss';
export const PICKER_TIME_FORMAT = 'HH:mm:ss';
export const PICKER_DATE_FORMAT = 'DD/MM/YYYY';
export const PICKER_DATETIME_FORMAT = 'DD/MM/YYYY HH:mm:ss';

export const DEFAULT_USER = {
  username: '',
  email: '',
  discord_webhook: '',
  telegram_username: '',
};

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

export const DEFAULT_THEME_SETTINGS = {
  themeMode: 'dark',
  snackbar: {
    show: true,
  },
};

export const VISIT_STATES = {
  wasOnPair: 1,
  missedPair: 2,
  onSickLeave: 3,
};
