import React, {memo} from 'react';
import {Avatar, ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import GroupMenu from '../../other/menus/groups/GroupMenu';
import {connect} from 'react-redux';
import {navigate} from '../../navigation/RootNavigation';
import {useThemes} from '../../../providers/ThemeProvider';
import {useTranslation} from 'react-i18next';
import {setGroup} from '../../../redux/Groups/groupsActions';

const Group = ({item, setGroup}) => {
  const {theme} = useThemes();
  const {t} = useTranslation();

  const viewTimers = async () => {
    setGroup(item);
    navigate('GroupTimers');
  };

  return (
    <ListItem containerStyle={[{backgroundColor: theme.listItem, borderRadius: 5}]}>
      <Avatar rounded source={{uri: item.image, cache: 'force-cache'}}/>
      <ListItem.Content>
        <TouchableOpacity onPress={viewTimers}>
          <ListItem.Title style={{color: theme.text}}>{item.title}</ListItem.Title>
          <ListItem.Subtitle style={{color: theme.text}}>
            {t('components.drawer.timers')} {item.timers_count}
          </ListItem.Subtitle>
        </TouchableOpacity>
      </ListItem.Content>
      <GroupMenu group={item}/>
    </ListItem>
  );
};

export default connect(
  null,
  {
    setGroup,
  },
)(memo(Group));
