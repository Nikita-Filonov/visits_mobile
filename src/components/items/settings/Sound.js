import React, {memo} from 'react';
import {ListItem} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import {baseUrl} from '../../../utils/Links';
import {SetAudio} from '../../../utils/Utils';
import {Touchable} from '../../blocks/Touchable';
import {useThemes} from '../../../providers/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {comp} from '../../../styles/Blocks';

export const Sound = (props) => {
  const {item, selectedAudio, setSelectedAudio, volume, index} = props;
  const {theme} = useThemes();
  const {t} = useTranslation();
  const [playing, toggle] = SetAudio(baseUrl + item.uri, volume / 100);

  const onSelect = () => setSelectedAudio(item.uri);

  return (
    <ListItem onPress={onSelect} style={comp.image} containerStyle={[{backgroundColor: theme.listItem}, comp.image]}>
      <RadioButton
        value={item.uri}
        status={selectedAudio === item.uri ? 'checked' : 'unchecked'}
        color={theme.button.primary}
        onPress={onSelect}
        uncheckedColor={theme.text}
      />
      <ListItem.Content>
        <ListItem.Title style={{color: theme.text}}>{t('settings.sidebar.sound') + ` ${index + 1}`}</ListItem.Title>
      </ListItem.Content>
      <Touchable name={playing ? 'pause' : 'play'} type={'feather'} action={toggle}/>
    </ListItem>
  );
};
export default memo(Sound);
