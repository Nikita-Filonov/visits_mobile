import React, {memo, useMemo} from 'react';
import {Icon, ListItem} from 'react-native-elements';
import {Touchable} from '../../blocks/Touchable';
import {validateEmail} from '../../../utils/Utils';
import {useTranslation} from 'react-i18next';
import {useThemes} from '../../../providers/ThemeProvider';
import {comp} from '../../../styles/Blocks';

const Mail = ({item, removeEmail}) => {
  const {t} = useTranslation();
  const {theme} = useThemes();
  const error = useMemo(() => !validateEmail(item), [item]);

  return (
    <ListItem containerStyle={[{backgroundColor: theme.listItem}, comp.image]}>
      <Icon name={'mail'} type={'feather'} color={error ? 'red' : theme.text}/>
      <ListItem.Content>
        <ListItem.Title style={{color: theme.text}}>{item}</ListItem.Title>
        {error && <ListItem.Subtitle style={{color: 'red'}}>
          {t('groups.settings.members.mailInviteModal.error')}
        </ListItem.Subtitle>}
      </ListItem.Content>
      <Touchable name={'close'} type={'antdesign'} action={() => removeEmail(item)}/>
    </ListItem>
  );
};

export default memo(Mail);
