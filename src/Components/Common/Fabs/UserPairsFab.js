import React, {useState} from 'react';
import {FAB} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {useThemes} from '../../../Providers/ThemeProvider';
import {navigate} from '../../Navigation/RootNavigation';
import {UserPairsFabStyles} from '../../../Styles/Blocks';

export const UserPairsFab = () => {
  const {theme} = useThemes();
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(!open);

  const onCreateUserPair = () => navigate('CreateUserPair');
  const onCreateUserPairGroup = () => navigate('CreateUserPairGroups');

  return (
    <FAB.Group
      style={UserPairsFabStyles.container}
      fabStyle={{backgroundColor: theme.button.primary}}
      open={open}
      icon={open ? 'close' : 'plus'}
      color={'#FFFFFF'}
      actions={[
        {
          icon: () => <Icon name={'people-outline'} type={'material'} />,
          onPress: onCreateUserPairGroup,
          label: 'Выбрать из груп',
        },
        {
          icon: () => (
            <Icon name={'email-outline'} type={'material-community'} />
          ),
          onPress: onCreateUserPair,
          label: 'Добавить по почте или по ФИО',
        },
      ]}
      onStateChange={state => setOpen(state.open)}
      onPress={onOpen}
    />
  );
};
