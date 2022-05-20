import React from 'react';
import {ListItem} from 'react-native-elements';
import CommentMenu from '../../other/menus/settings/CommentMenu';
import {useThemes} from '../../../providers/ThemeProvider';
import {comp} from '../../../styles/Blocks';

export const Comment = ({item}) => {
  const {theme} = useThemes();

  return (
    <ListItem containerStyle={[{backgroundColor: theme.listItem}, comp.image]}>
      <ListItem.Content>
        <ListItem.Title style={{color: theme.text}}>{item.text}</ListItem.Title>
      </ListItem.Content>
      <CommentMenu comment={item}/>
    </ListItem>
  );
};
