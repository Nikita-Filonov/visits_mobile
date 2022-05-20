import React, {useMemo} from 'react';
import {ListItem} from 'react-native-elements';
import {MonsterStyles} from '../../../../styles/Items';
import {useThemes} from '../../../../providers/ThemeProvider';
import RoleMenu from '../../../other/menus/groups/settings/RoleMenu';

export const Role = ({item, menu = false, role, onRole}) => {
  const {theme} = useThemes();
  const isSelected = useMemo(() => role?.id === item?.id, [role?.id]);

  const onSafeRole = () => onRole && onRole(item);

  return (
    <ListItem
      onPress={onSafeRole}
      containerStyle={[{backgroundColor: isSelected ? theme.listItemSelected : theme.listItem}, MonsterStyles.container]}
    >
      <ListItem.Content style={{marginLeft: 10}}>
        <ListItem.Title style={{color: theme.text}}>
          {item?.name}
        </ListItem.Title>
        {Boolean(item?.description) && <ListItem.Subtitle style={{color: theme.text}}>
          {item?.description}
        </ListItem.Subtitle>}
      </ListItem.Content>
      {menu && <RoleMenu role={item}/>}
    </ListItem>
  );
};
