import React, {useEffect, useMemo, useState} from 'react';
import {ConfirmLayout} from '../../components/layouts/ConfirmLayout';
import {useTranslation} from 'react-i18next';
import {useSettings} from '../../providers/SettingsProvider';
import {AlertMessage} from '../../components/common/AlertMessage';
import {comp} from '../../styles/Blocks';
import {CheckboxFormControl} from '../../components/common/inputs/CheckboxFormControl';


export const TimersSettings = () => {
  const {t} = useTranslation();
  const {request, settings, updateSettings} = useSettings();
  const [dropMissed, setDropMissed] = useState(settings?.drop_missed);

  useEffect(() => {
    setDropMissed(settings?.drop_missed);
  }, [settings]);

  const disabled = useMemo(() => dropMissed === settings?.drop_missed, [dropMissed, settings]);
  const onSave = async () => await updateSettings({drop_missed: dropMissed});

  return (
    <ConfirmLayout
      loading={request}
      disabled={disabled}
      title={t('components.drawer.timers')}
      onConfirm={onSave}
    >
      <AlertMessage message={t('settings.timers.alert')} level={'info'} style={comp.input}/>
      <CheckboxFormControl
        style={comp.input}
        label={t('settings.timers.dropCheckboxLabel')}
        checked={dropMissed}
        onPress={() => setDropMissed(!dropMissed)}
      />
    </ConfirmLayout>
  );
};
