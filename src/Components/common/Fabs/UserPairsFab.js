import React, {useState} from 'react';
import {FAB} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {useThemes} from '../../../Providers/ThemeProvider';
import {navigate} from '../../Navigation/RootNavigation';
import {comp} from '../../../Styles/Blocks';

export const UserPairsFab = () => {
  const {theme} = useThemes();
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(!open);

  const onCreateUserPair = () => navigate('CreateUserPair');
  const onCreateUserPairGroup = () => navigate('CreateUserPairGroup');

  return (
    <FAB.Group
      style={[comp.fab, {paddingRight: 16}]}
      fabStyle={{backgroundColor: theme.button.primary}}
      open={open}
      icon={open ? 'close' : 'plus'}
      color={'#FFFFFF'}
      actions={[
        {
          icon: () => <Icon name={'import-export'} type={'material'} />,
          onPress: onCreateUserPairGroup,
          label: 'Выбрать из груп',
        },
        {
          icon: () => <Icon name={'import-export'} type={'material'} />,
          onPress: onCreateUserPair,
          label: 'Добавить по почте',
        },
      ]}
      onStateChange={state => setOpen(state.open)}
      onPress={onOpen}
    />
  );
};
