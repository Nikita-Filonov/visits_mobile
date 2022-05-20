import React from 'react';
import {useTranslation} from 'react-i18next';
import {CustomText} from '../../../common/CustomText';
import {comp} from '../../../../styles/Blocks';
import {TextField} from '../../../common/inputs/TextField';
import {NotificationTemplateBeforeColumns} from '../../../../utils/grids/NotificationTemplateBeforeColumns';
import {DataGrid} from '../../../common/DataGrid/DataGrid';


export const NotificationsTemplateBefore = ({beforeTemplate, setBeforeTemplate}) => {
  const {t} = useTranslation();
  const {NOTIFICATION_TEMPLATE_BEFORE_COLUMNS} = NotificationTemplateBeforeColumns();

  return (
    <React.Fragment>
      <CustomText style={comp.titleText}>{t('groups.settings.notificationTemplates.untilSpawnTime')}</CustomText>
      <TextField
        style={comp.input}
        value={beforeTemplate?.title}
        onChangeText={title => setBeforeTemplate({...beforeTemplate, title})}
        label={t('groups.settings.notificationTemplates.inputTitleLabel')}
        placeholder={t('groups.settings.notificationTemplates.inputTitlePlaceholder')}
      />
      <TextField
        style={comp.input}
        multiline
        value={beforeTemplate?.content}
        onChangeText={content => setBeforeTemplate({...beforeTemplate, content})}
        label={t('groups.settings.notificationTemplates.inputBodyLabel')}
        placeholder={t('groups.settings.notificationTemplates.inputBodyPlaceholder')}
      />
      <DataGrid
        style={[comp.input, comp.bottomList]}
        rows={t('groups.settings.notificationTemplates.beforeVariables')}
        columns={NOTIFICATION_TEMPLATE_BEFORE_COLUMNS}
      />
    </React.Fragment>
  );
};
