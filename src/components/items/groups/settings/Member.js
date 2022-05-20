import React, {useMemo} from 'react';
import {ListItem} from 'react-native-elements';
import {MonsterStyles} from '../../../../styles/Items';
import {OnlineBadge} from '../../../common/badges/OnlineBadge';
import {useThemes} from '../../../../providers/ThemeProvider';
import MemberMenu from '../../../other/menus/groups/settings/MemberMenu';

export const Member = ({item, menu = false, creator, onCreator}) => {
  const {theme} = useThemes();
  const isSelected = useMemo(() => creator?.id === item?.user?.id, [creator?.id]);

  const onSafeCreator = () => onCreator && onCreator(item?.user);

  return (
    <ListItem
      onPress={onSafeCreator}
      containerStyle={[{backgroundColor: isSelected ? theme.listItemSelected : theme.listItem}, MonsterStyles.container]}
    >
      <OnlineBadge online={item?.user?.online}/>
      <ListItem.Content>
        <ListItem.Title style={{color: theme.text}}>
          {item?.user?.username}
        </ListItem.Title>
        <ListItem.Subtitle style={{color: theme.text}}>
          {item?.role?.name}
        </ListItem.Subtitle>
      </ListItem.Content>
      {menu && <MemberMenu member={item}/>}
    </ListItem>
  );
};
