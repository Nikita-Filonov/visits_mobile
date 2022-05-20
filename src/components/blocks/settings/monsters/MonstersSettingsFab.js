import React, {useState} from 'react';
import {FAB} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {useThemes} from '../../../../providers/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {navigate} from '../../../navigation/RootNavigation';

export const MonstersSettingsFab = () => {
  const {theme} = useThemes();
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(!open);

  const onChoose = () => navigate('ChooseMonsters');
  const onNewMonster = () => navigate('CreateMonster');

  return (
    <FAB.Group
      fabStyle={{backgroundColor: theme.button.primary}}
      open={open}
      icon={open ? 'close' : 'plus'}
      color={'#FFFFFF'}
      actions={[
        {
          icon: () => <Icon name={'import-export'} type={'material'}/>,
          onPress: onChoose,
          label: t('settings.monsters.chooseFromReady'),
        },
        {
          icon: 'plus',
          onPress: onNewMonster,
          label: t('settings.monsters.createNewMonster'),
        },
      ]}
      onStateChange={state => setOpen(state.open)}
      onPress={onOpen}
    />
  );
};
