import React, {useState} from 'react';
import {FAB} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {useThemes} from '../../../../providers/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {navigate} from '../../../navigation/RootNavigation';

export const GroupTimersFab = () => {
  const {theme} = useThemes();
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(!open);

  const onImport = () => navigate('ImportTimers');
  const onNewTimer = () => navigate('CreateGroupTimer');

  return (
    <FAB.Group
      fabStyle={{backgroundColor: theme.button.primary}}
      open={open}
      icon={open ? 'close' : 'plus'}
      color={'#FFFFFF'}
      actions={[
        {
          icon: () => <Icon name={'import-export'} type={'material'}/>,
          onPress: onImport,
          label: t('groups.timers.importTimerFab'),
        },
        {
          icon: 'plus',
          onPress: onNewTimer,
          label: t('groups.timers.newTimerFab'),
        },
      ]}
      onStateChange={state => setOpen(state.open)}
      onPress={onOpen}
    />
  );
};
