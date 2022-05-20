import React, {useEffect, useMemo, useState} from 'react';
import {connect} from 'react-redux';
import {useGroupSettings} from '../../../../providers/groups/GroupSettingsProvider';
import {useGroupPermissions} from '../../../../providers/groups/GroupPermissionsProvider';
import {GROUP_SETTINGS} from '../../../../utils/permissions/Groups';
import {NotificationFormattersCommon} from '../../../../components/blocks/groups/settings/NotificationFormattersCommon';

const GroupSettingsNotificationFormatters = ({group, groupSettings}) => {
  const {isAllowed} = useGroupPermissions();
  const {request, updateGroupSettings} = useGroupSettings();
  const [spanTemplate, setSpanTemplate] = useState(groupSettings.notification_template_span);
  const [beforeTemplate, setBeforeTemplate] = useState(groupSettings.notification_template_before);

  useEffect(() => {
    setSpanTemplate(groupSettings.notification_template_span);
    setBeforeTemplate(groupSettings.notification_template_before);
  }, [groupSettings]);

  const disabled = useMemo(() => {
    if (JSON.stringify(spanTemplate) !== JSON.stringify(groupSettings.notification_template_span)) {
      return false;
    }

    return JSON.stringify(beforeTemplate) === JSON.stringify(groupSettings.notification_template_before);
  }, [spanTemplate, beforeTemplate, groupSettings]);


  const onSave = async () => await updateGroupSettings(group.id, {
    notification_template_span: spanTemplate,
    notification_template_before: beforeTemplate,
  });

  return (
    <NotificationFormattersCommon
      disabled={disabled || !isAllowed([GROUP_SETTINGS.update])}
      onSave={onSave}
      request={request}
      spanTemplate={spanTemplate}
      setSpanTemplate={setSpanTemplate}
      beforeTemplate={beforeTemplate}
      setBeforeTemplate={setBeforeTemplate}
    />
  );
};

const getState = (state) => ({
  group: state.groups.group,
  groupSettings: state.groups.groupSettings,
});


export default connect(
  getState,
  null,
)(GroupSettingsNotificationFormatters);
