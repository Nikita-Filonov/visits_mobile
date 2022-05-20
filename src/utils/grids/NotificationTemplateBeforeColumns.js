import React from 'react';
import {useTranslation} from 'react-i18next';


export const NotificationTemplateBeforeColumns = () => {
  const {t} = useTranslation();

  const NOTIFICATION_TEMPLATE_BEFORE_COLUMNS = [
    {
      field: 'name',
      headerName: t('groups.settings.notificationTemplates.grid.name'),
      width: 100,
    },
    {
      field: 'meaning',
      headerName: t('groups.settings.notificationTemplates.grid.meaning'),
      flex: 1,
    },
  ];
  return {NOTIFICATION_TEMPLATE_BEFORE_COLUMNS};
};
