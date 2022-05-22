import React from 'react';
import {comp} from '../../../Styles/Blocks';
import {Touchable} from '../../Blocks/Touchable';
import {Menu} from 'react-native-paper';
import {useThemes} from '../../../Providers/ThemeProvider';

export const CustomMenu = ({
  children,
  menu,
  setMenu,
  anchor,
  color = '#FFFFFF',
}) => {
  const {theme} = useThemes();

  const onOpen = () => setMenu(true);
  const onDismiss = () => setMenu(false);

  return (
    <Menu
      visible={menu}
      onDismiss={onDismiss}
      contentStyle={[{backgroundColor: theme.listItem}, comp.image]}
      anchor={
        anchor || (
          <Touchable
            action={onOpen}
            name={'dots-vertical'}
            type={'material-community'}
            color={color}
          />
        )
      }>
      {children}
    </Menu>
  );
};
