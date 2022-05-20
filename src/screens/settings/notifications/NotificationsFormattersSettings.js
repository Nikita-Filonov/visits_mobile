import React, {useEffect, useMemo, useState} from 'react';
import {useSettings} from '../../../providers/SettingsProvider';
import {NotificationFormattersCommon} from '../../../components/blocks/groups/settings/NotificationFormattersCommon';


export const NotificationsFormattersSettings = () => {
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
    <NotificationFormattersCommon
      disabled={disabled}
      onSave={onSave}
      request={request}
      spanTemplate={spanTemplate}
      setSpanTemplate={setSpanTemplate}
      beforeTemplate={beforeTemplate}
      setBeforeTemplate={setBeforeTemplate}
    />
  );
};
