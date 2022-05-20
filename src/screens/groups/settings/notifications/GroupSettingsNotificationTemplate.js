import React, {useEffect, useMemo, useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useGroupSettings} from '../../../../providers/groups/GroupSettingsProvider';
import {useGroupPermissions} from '../../../../providers/groups/GroupPermissionsProvider';
import {GROUP_SETTINGS} from '../../../../utils/permissions/Groups';
import {ScrollView} from 'react-native';
import {CustomText} from '../../../../components/common/CustomText';
import {ConfirmLayout} from '../../../../components/layouts/ConfirmLayout';
import {NotificationsTemplateSpan} from '../../../../components/blocks/groups/settings/NotificationsTemplateSpan';
import {HorizontalDivider} from '../../../../components/common/HorizontalDivider';
import {NotificationsTemplateBefore} from '../../../../components/blocks/groups/settings/NotificationsTemplateBefore';
import {comp} from '../../../../styles/Blocks';

const GroupSettingsNotificationTemplate = ({group, groupSettings}) => {
  const {t} = useTranslation();
  const {request, updateGroupSettings} = useGroupSettings();
  const {isAllowed} = useGroupPermissions();
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
    <ConfirmLayout
      loading={request}
      onConfirm={onSave}
      title={t('settings.sidebar.templates')}
      disabled={disabled || !isAllowed([GROUP_SETTINGS.update])}
    >
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

const getState = (state) => ({
  group: state.groups.group,
  groupSettings: state.groups.groupSettings,
});


export default connect(
  getState,
  null,
)(GroupSettingsNotificationTemplate);
