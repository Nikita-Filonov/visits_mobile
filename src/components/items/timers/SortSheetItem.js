import React from 'react';
import {Icon, ListItem} from 'react-native-elements';
import {useThemes} from '../../../providers/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {comp} from '../../../styles/Blocks';

export const SortSheetItem = ({item, sort, onSelect}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();

  const onSafeSelect = async () => await onSelect(item.value);

  return (
    <ListItem
      onPress={onSafeSelect}
      style={comp.image}
      containerStyle={[{backgroundColor: item.value === sort ? theme.listItemSelected : theme.listItem}, comp.image]}
    >
      <Icon {...item.icon} color={theme.text}/>
      <ListItem.Content>
        <ListItem.Title style={{color: theme.text}}>{t(`timers.sortSelect.${item.value}`)}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};
