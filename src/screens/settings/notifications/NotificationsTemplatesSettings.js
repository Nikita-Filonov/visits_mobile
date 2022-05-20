import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSettings} from '../../../providers/SettingsProvider';
import {ConfirmLayout} from '../../../components/layouts/ConfirmLayout';
import {CustomText} from '../../../components/common/CustomText';
import {comp} from '../../../styles/Blocks';
import {ScrollView} from 'react-native';
import {HorizontalDivider} from '../../../components/common/HorizontalDivider';
import {NotificationsTemplateSpan} from '../../../components/blocks/groups/settings/NotificationsTemplateSpan';
import {NotificationsTemplateBefore} from '../../../components/blocks/groups/settings/NotificationsTemplateBefore';

export const NotificationsTemplatesSettings = () => {
  const {t} = useTranslation();
  const {request, settings, updateSettings} = useSettings();
  const [spanTemplate, setSpanTemplate] = useState(settings.notification_template_span);
  const [beforeTemplate, setBeforeTemplate] = useState(settings.notification_template_before);

  useEffect(() => {
    setSpanTemplate(settings.notification_template_span);
    setBeforeTemplate(settings.notification_template_before);
  }, [settings]);

  const disabled = useMemo(() => {
    if (JSON.stringify(spanTemplate) !== JSON.stringify(settings.notification_template_span)) {
      return false;
    }

    return JSON.stringify(beforeTemplate) === JSON.stringify(settings.notification_template_before);
  }, [spanTemplate, beforeTemplate, settings]);


  const onSave = async () => await updateSettings({
    notification_template_span: spanTemplate,
    notification_template_before: beforeTemplate,
  });

  return (
    <ConfirmLayout loading={request} title={t('settings.sidebar.templates')} disabled={disabled} onConfirm={onSave}>
      <ScrollView>
        <CustomText style={comp.smallText}>{t('groups.settings.notificationTemplates.description')}</CustomText>

        <HorizontalDivider/>

        <NotificationsTemplateSpan spanTemplate={spanTemplate} setSpanTemplate={setSpanTemplate}/>

        <HorizontalDivider/>

        <NotificationsTemplateBefore beforeTemplate={beforeTemplate} setBeforeTemplate={setBeforeTemplate}/>
      </ScrollView>
    </ConfirmLayout>
  );
};
