import React, {useMemo} from 'react';
import {ListItem} from 'react-native-elements';
import moment from 'moment';
import 'moment-timezone';
import {MonsterAvatar} from '../../blocks/timers/MonsterAvatar';
import {Checkbox} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useThemes} from '../../../providers/ThemeProvider';
import {comp} from '../../../styles/Blocks';

export const ImportTimer = ({item, timerIds, selectTimer}) => {
  const {t} = useTranslation();
  const {theme} = useThemes();

  const selected = useMemo(() => timerIds.includes(item.id), [timerIds]);
  const onSelect = () => selectTimer(item.id, selected);

  return (
    <ListItem onPress={onSelect} style={comp.image} containerStyle={[{backgroundColor: theme.listItem}, comp.image]}>
      <MonsterAvatar image={item.monster.image}/>
      <ListItem.Content>
        <ListItem.Title style={{color: theme.text}}>
          {item.monster.name}
        </ListItem.Title>
        <ListItem.Subtitle style={{color: theme.text}}>
          {item.killed
            ? `${t('groups.timers.importTimerModal.killedIn')} ${moment(item.killed).format('HH:mm:ss')}`
            : t('timers.noTime')
          }
        </ListItem.Subtitle>
      </ListItem.Content>
      <Checkbox
        status={selected ? 'checked' : 'unchecked'}
        onPress={onSelect}
        color={theme.button.primary}
        uncheckedColor={theme.text}
      />
    </ListItem>
  );
};
