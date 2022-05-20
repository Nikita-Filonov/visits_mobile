import React from 'react';
import {Avatar, Icon, ListItem} from 'react-native-elements';
import {useThemes} from '../../../providers/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {RadioButton} from 'react-native-paper';

export const DefaultGroupItem = ({item, defaultGroup, onSelect}) => {
    const {theme} = useThemes();
    const {t} = useTranslation();

    const onSafeSelect = async () => await onSelect(item);

    return (
      <ListItem containerStyle={[{backgroundColor: theme.listItem, borderRadius: 5}]} onPress={onSafeSelect}>
        {item?.image
          ? <Avatar rounded source={{uri: item?.image, cache: 'force-cache'}}/>
          : <Icon name={'close'} type={'material-community'} color={theme.colors.error}/>
        }
        <ListItem.Content>
          <ListItem.Title style={{color: theme.text}}>{item?.title}</ListItem.Title>
        </ListItem.Content>
        <RadioButton
          status={defaultGroup?.id === item?.id ? 'checked' : 'unchecked'}
          onPress={onSafeSelect}
          color={theme.button.primary}
          uncheckedColor={theme.text}
        />
      </ListItem>
    );
  }
;
