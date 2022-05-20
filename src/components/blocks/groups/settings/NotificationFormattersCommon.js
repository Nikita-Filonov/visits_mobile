import React from 'react';
import {Linking, ScrollView} from 'react-native';
import {comp} from '../../../../styles/Blocks';
import {CustomText} from '../../../common/CustomText';
import {ConfirmLayout} from '../../../layouts/ConfirmLayout';
import {DATETIME_FORMATTERS_DOC} from '../../../../utils/Constants';
import {useTranslation} from 'react-i18next';
import {TextField} from '../../../common/inputs/TextField';
import {Appbar} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {NotificationFormattersColumns} from '../../../../utils/grids/NotificationFormattersColumns';
import {DataGrid} from '../../../common/DataGrid/DataGrid';

export const NotificationFormattersCommon = (props) => {
  const {disabled, request, onSave, spanTemplate, setSpanTemplate, beforeTemplate, setBeforeTemplate} = props;
  const {t} = useTranslation();
  const {NOTIFICATION_FORMATTERS_COLUMNS} = NotificationFormattersColumns();

  const onDoc = async () => await Linking.openURL(DATETIME_FORMATTERS_DOC);

  return (
    <ConfirmLayout
      loading={request}
      onConfirm={onSave}
      title={t('settings.sidebar.formatters')}
      disabled={disabled}
      actions={[
        <Appbar.Action
          onPress={onDoc}
          animated={false}
          icon={() => <Icon name={'help-circle-outline'} type={'material-community'} color={'#FFFFFF'}/>}
        />,
      ]}
    >
      <ScrollView>
        <CustomText>{t('groups.settings.notificationFormatters.description')}</CustomText>

        <TextField
          value={spanTemplate.datetime}
          onChangeText={datetime => setSpanTemplate({...spanTemplate, datetime})}
          style={comp.input}
          label={t('groups.settings.notificationTemplates.duringSpawn')}
          placeholder={t('groups.settings.notificationFormatters.placeholder')}
        />
        <TextField
          style={comp.input}
          value={beforeTemplate.datetime}
          onChangeText={datetime => setBeforeTemplate({...beforeTemplate, datetime})}
          label={t('groups.settings.notificationTemplates.untilSpawnTime')}
          placeholder={t('groups.settings.notificationFormatters.placeholder')}
        />

        <DataGrid
          style={[comp.input, comp.bottomList]}
          rows={t('groups.settings.notificationFormatters.datetime')}
          columns={NOTIFICATION_FORMATTERS_COLUMNS}
        />

      </ScrollView>
    </ConfirmLayout>
  );
};
