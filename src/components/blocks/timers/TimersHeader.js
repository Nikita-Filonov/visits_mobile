import React from 'react';
import {Appbar} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {AppBar} from '../../common/AppBar';
import TimersHeaderMenu from '../../other/menus/timers/TimersHeaderMenu';

export const TimersHeader = ({navigation, sortRef}) => {
  const {t} = useTranslation();

  return (
    <AppBar>
      <Appbar.Action
        onPress={() => navigation.openDrawer()}
        animated={false}
        icon={() => <Icon name={'menu'} type={'feather'} color={'white'}/>}
      />
      <Appbar.Content title={t('components.drawer.timers')}/>
      <TimersHeaderMenu sortRef={sortRef}/>
    </AppBar>
  );
};
