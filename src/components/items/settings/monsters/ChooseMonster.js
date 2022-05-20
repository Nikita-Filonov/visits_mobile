import React, {useMemo} from 'react';
import {ListItem} from 'react-native-elements';
import {convertTime} from '../../../../utils/Utils';
import {useThemes} from '../../../../providers/ThemeProvider';
import {MonsterAvatar} from '../../../blocks/timers/MonsterAvatar';
import {useTranslation} from 'react-i18next';
import {comp} from '../../../../styles/Blocks';
import {Checkbox} from 'react-native-paper';

export const ChooseMonster = ({item, selected, onSelect}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();

  const isSelected = useMemo(() => selected.indexOf(item.id) !== -1, [selected]);
  const onSafeSelect = () => onSelect(item.id, isSelected);

  return (
    <ListItem
      onPress={onSafeSelect}
      style={comp.image}
      containerStyle={[{backgroundColor: theme.listItem}, comp.image]}
    >
      <MonsterAvatar image={item.image}/>
      <ListItem.Content>
        <ListItem.Title style={{color: theme.text}}>{item.name}</ListItem.Title>
        <ListItem.Subtitle style={{color: theme.text}}>
          {t('settings.monsters.interval', {interval: convertTime(item.delta)})}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Checkbox
        status={isSelected ? 'checked' : 'unchecked'}
        onPress={onSafeSelect}
        color={theme.button.primary}
        uncheckedColor={theme.text}
      />
    </ListItem>
  );
};
