import React from 'react';
import {ListItem} from 'react-native-elements';
import {convertTime} from '../../../../utils/Utils';
import {useThemes} from '../../../../providers/ThemeProvider';
import {MonsterAvatar} from '../../../blocks/timers/MonsterAvatar';
import {useTranslation} from 'react-i18next';
import MonsterMenu from '../../../other/menus/settings/MonsterMenu';
import {comp} from '../../../../styles/Blocks';

export const Monster = ({item}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();

  return (
    <ListItem containerStyle={[{backgroundColor: theme.listItem}, comp.image]}>
      <MonsterAvatar image={item.image}/>
      <ListItem.Content>
        <ListItem.Title style={{color: theme.text}}>{item.name}</ListItem.Title>
        <ListItem.Subtitle style={{color: theme.text}}>
          {t('settings.monsters.interval', {interval: convertTime(item.delta)})}
        </ListItem.Subtitle>
      </ListItem.Content>
      <MonsterMenu monster={item}/>
    </ListItem>
  );
};
