import React from 'react';
import {useTranslation} from 'react-i18next';


export const NotificationFormattersColumns = () => {
  const {t} = useTranslation();

  const NOTIFICATION_FORMATTERS_COLUMNS = [
    {
      field: 'directive',
      headerName: t('groups.settings.notificationFormatters.grid.directive'),
      flex: 1,
    },
    {
      field: 'meaning',
      headerName: t('groups.settings.notificationTemplates.grid.meaning'),
      flex: 1,
    },
    {
      field: 'example',
      headerName: t('groups.settings.notificationFormatters.grid.example'),
      flex: 1,
    },
  ];
  return {NOTIFICATION_FORMATTERS_COLUMNS};
};
