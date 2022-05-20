import React from 'react';
import {View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {comp} from '../../../styles/Blocks';
import {RadioButton} from 'react-native-paper';
import {useThemes} from '../../../providers/ThemeProvider';
import {MonsterAvatar} from '../timers/MonsterAvatar';
import {LOCALE_IMAGES} from '../../../utils/Constants';

export const LanguageItem = ({locale, onChangeLanguage, language, label}) => {
  const {theme} = useThemes();

  return (
    <ListItem
      onPress={async () => await onChangeLanguage(language)}
      containerStyle={{backgroundColor: theme.listItem}}
    >
      <MonsterAvatar image={LOCALE_IMAGES[language]}/>
      <ListItem.Content>
        <ListItem.Title style={{color: theme.text}}>{label}</ListItem.Title>
      </ListItem.Content>
      <View style={comp.flex}/>
      <RadioButton
        status={locale === language ? 'checked' : 'unchecked'}
        color={theme.button.primary}
        uncheckedColor={theme.text}
      />
    </ListItem>
  );
};
